-- Add PSFS-specific fields to user_assessments table
ALTER TABLE public.user_assessments 
ADD COLUMN IF NOT EXISTS psfs_source boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS favorite_activities jsonb,
ADD COLUMN IF NOT EXISTS body_area_analysis jsonb;