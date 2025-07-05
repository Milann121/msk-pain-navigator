-- Add pain level tracking columns to user_program_tracking table
ALTER TABLE public.user_program_tracking 
ADD COLUMN pain_level_ended NUMERIC,
ADD COLUMN pain_level_followup NUMERIC;