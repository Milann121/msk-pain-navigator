-- Insert job properties if they don't exist
INSERT INTO public.job_properties (property_name) VALUES
  ('Cold Environment'),
  ('Hot Environment'),
  ('Sitting Positions'),
  ('Driving'),
  ('Prolonged Standing'),
  ('Specific Tools'),
  ('Heavy Objects Lifting'),
  ('Repetitive Movements'),
  ('Vibrations')
ON CONFLICT (property_name) DO NOTHING;