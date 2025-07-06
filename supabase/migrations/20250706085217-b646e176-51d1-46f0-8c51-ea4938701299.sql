-- Add missing job properties if they don't exist
INSERT INTO public.job_properties (property_name) VALUES
  ('Specific Tools'),
  ('Vibrations')
ON CONFLICT (property_name) DO NOTHING;