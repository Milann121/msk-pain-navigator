-- Create reactions table for community posts
CREATE TABLE IF NOT EXISTS public.community_post_reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.community_posts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  reaction_type text NOT NULL CHECK (reaction_type IN ('like','feel','angry')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (post_id, user_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_cpr_post_id ON public.community_post_reactions(post_id);
CREATE INDEX IF NOT EXISTS idx_cpr_user_id ON public.community_post_reactions(user_id);

-- Enable RLS
ALTER TABLE public.community_post_reactions ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone authenticated can read reactions"
ON public.community_post_reactions
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can insert their own reactions"
ON public.community_post_reactions
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reactions"
ON public.community_post_reactions
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reactions"
ON public.community_post_reactions
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Trigger to maintain updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public';

DROP TRIGGER IF EXISTS trg_cpr_updated_at ON public.community_post_reactions;
CREATE TRIGGER trg_cpr_updated_at
BEFORE UPDATE ON public.community_post_reactions
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();