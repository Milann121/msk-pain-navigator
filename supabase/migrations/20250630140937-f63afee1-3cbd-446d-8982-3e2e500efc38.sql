
-- Create the B2B_employees table
CREATE TABLE public.B2B_employees (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  b2b_partner_name text NOT NULL,
  employee_id text NOT NULL UNIQUE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  job_post text,
  pain_area text,
  differentials text,
  CONSTRAINT fk_b2b_partner 
    FOREIGN KEY (b2b_partner_name) 
    REFERENCES public."B2B_partners"(name)
);

-- Enable Row Level Security
ALTER TABLE public.B2B_employees ENABLE ROW LEVEL SECURITY;

-- Create policies for B2B employees
CREATE POLICY "Enable read access for all users" ON public.B2B_employees
FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON public.B2B_employees
FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users" ON public.B2B_employees
FOR UPDATE USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_B2B_employees_updated_at
BEFORE UPDATE ON public.B2B_employees
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster lookups
CREATE INDEX idx_b2b_employees_employee_id ON public.B2B_employees(employee_id);
CREATE INDEX idx_b2b_employees_partner_name ON public.B2B_employees(b2b_partner_name);
