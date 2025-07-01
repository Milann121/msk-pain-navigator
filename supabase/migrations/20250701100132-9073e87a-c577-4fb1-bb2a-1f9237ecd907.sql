
-- Add employer_name column to user_profiles table
ALTER TABLE public.user_profiles 
ADD COLUMN employer_name TEXT;

-- Add state column to b2b_employees table with default value 'inactive'
ALTER TABLE public.b2b_employees 
ADD COLUMN state TEXT NOT NULL DEFAULT 'inactive';

-- Add a check constraint to ensure state can only be 'active' or 'inactive'
ALTER TABLE public.b2b_employees 
ADD CONSTRAINT check_state_valid CHECK (state IN ('active', 'inactive'));

-- Create an index on the state column for better query performance
CREATE INDEX idx_b2b_employees_state ON public.b2b_employees(state);
