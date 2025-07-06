-- Remove duplicate snake_case job properties, keeping only the proper case ones
DELETE FROM public.job_properties 
WHERE property_name IN (
  'cold_environment',
  'driving', 
  'heavy_objects_lifting',
  'hot_environment',
  'prolonged_standing',
  'repetitive_movements',
  'sitting_positions',
  'specific_tools',
  'vibrations'
);