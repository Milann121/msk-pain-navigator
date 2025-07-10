-- Remove existing OREBRO programs from user_assessments
DELETE FROM user_assessments 
WHERE primary_differential = 'orebro-program';

-- Update any related user_program_tracking records to mark them as deleted
UPDATE user_program_tracking 
SET program_status = 'deleted', 
    program_deleted_at = now(),
    updated_at = now()
WHERE assessment_id IN (
  SELECT id FROM user_assessments 
  WHERE primary_differential = 'orebro-program'
);