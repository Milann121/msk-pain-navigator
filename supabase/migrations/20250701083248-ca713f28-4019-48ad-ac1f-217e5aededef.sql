
-- Add email column to b2b_employees table
ALTER TABLE public.b2b_employees 
ADD COLUMN email text;

-- Add a unique constraint to ensure one email per employee record
ALTER TABLE public.b2b_employees 
ADD CONSTRAINT unique_employee_email UNIQUE (email);

-- Add an index for better query performance
CREATE INDEX idx_b2b_employees_email ON public.b2b_employees(email);
