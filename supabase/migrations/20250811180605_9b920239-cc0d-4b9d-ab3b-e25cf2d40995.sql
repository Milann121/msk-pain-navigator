-- Create community_posts table for weekly posts
create table public.community_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  content text not null check (char_length(content) <= 280),
  week_start_date date not null default date_trunc('week', current_date)::date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint community_posts_user_id_fkey foreign key (user_id) references auth.users(id) on delete cascade
);

-- Ensure only one post per user per week
create unique index community_posts_user_week_unique
  on public.community_posts (user_id, week_start_date);

-- Enable RLS
alter table public.community_posts enable row level security;

-- RLS policies
create policy "Anyone authenticated can read community posts"
  on public.community_posts
  for select
  to authenticated
  using (true);

create policy "Users can insert their own community post"
  on public.community_posts
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own community post"
  on public.community_posts
  for update
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can delete their own community post"
  on public.community_posts
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- Trigger to auto-update updated_at
drop trigger if exists trg_community_posts_updated on public.community_posts;
create trigger trg_community_posts_updated
before update on public.community_posts
for each row execute function public.update_updated_at_column();

-- Leaderboard function aggregating across all companies
create or replace function public.get_community_leaderboard(limit_param int default 100, offset_param int default 0)
returns table (
  user_id uuid,
  first_name text,
  company_name text,
  job_type text,
  exercises_completed_count bigint,
  programs_completed_count bigint,
  rank bigint
)
language plpgsql
stable
security definer
set search_path = 'public'
as $$
begin
  return query
  with activity as (
    select 
      up.user_id,
      coalesce(up.first_name, '') as first_name,
      coalesce(up.b2b_partner_name, '') as company_name,
      coalesce(up.job_type, '') as job_type,
      coalesce((select count(*) from public.completed_exercises ce where ce.user_id = up.user_id), 0) as exercises_completed_count,
      coalesce((select count(*) from public.user_program_tracking upt where upt.user_id = up.user_id and upt.program_status = 'ended'), 0) as programs_completed_count
    from public.user_profiles up
    where up.user_id is not null
  )
  select 
    a.user_id,
    a.first_name,
    a.company_name,
    a.job_type,
    a.exercises_completed_count,
    a.programs_completed_count,
    dense_rank() over (order by a.exercises_completed_count desc, a.programs_completed_count desc, a.first_name asc) as rank
  from activity a
  order by 7 asc
  limit limit_param offset offset_param;
end;
$$;

-- Allow authenticated users to call the function
revoke all on function public.get_community_leaderboard(int, int) from public;
grant execute on function public.get_community_leaderboard(int, int) to authenticated;
