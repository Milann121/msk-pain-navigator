
-- Add program start/finish fields to user_assessments table
ALTER TABLE public.user_assessments
ADD COLUMN program_start_date date NULL,
ADD COLUMN program_ended_at timestamp with time zone NULL;
