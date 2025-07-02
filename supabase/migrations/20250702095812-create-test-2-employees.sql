-- Create test_2_employees table mirroring b2b_employees
CREATE TABLE public.test_2_employees (LIKE public.b2b_employees INCLUDING ALL);

-- Enable row level security
ALTER TABLE public.test_2_employees ENABLE ROW LEVEL SECURITY;

-- Allow anonymous verification and state updates
CREATE POLICY "Allow test_2 employee verification"
ON public.test_2_employees
FOR SELECT
USING (true);

CREATE POLICY "Allow test_2 employee state updates"
ON public.test_2_employees
FOR UPDATE
USING (true)
WITH CHECK (true);

-- Policies for authenticated users
CREATE POLICY "Employees can access their own test_2 record"
ON public.test_2_employees
FOR SELECT
TO authenticated
USING (id IN (
  SELECT users.b2b_employee_id
  FROM users
  WHERE users.id = auth.uid() AND users.user_type = 'employee'
));

CREATE POLICY "Employees can update their own test_2 record"
ON public.test_2_employees
FOR UPDATE
TO authenticated
USING (id IN (
  SELECT users.b2b_employee_id
  FROM users
  WHERE users.id = auth.uid() AND users.user_type = 'employee'
));

CREATE POLICY "HR can access own company's test_2 employees"
ON public.test_2_employees
FOR SELECT
TO authenticated
USING (
  is_hr_manager(auth.uid()) AND
  b2b_partner_id = get_user_b2b_partner_id(auth.uid())
);

CREATE POLICY "HR can insert test_2 employees for their company"
ON public.test_2_employees
FOR INSERT
TO authenticated
WITH CHECK (
  is_hr_manager(auth.uid()) AND
  b2b_partner_id = get_user_b2b_partner_id(auth.uid())
);

CREATE POLICY "HR can update own company's test_2 employees"
ON public.test_2_employees
FOR UPDATE
TO authenticated
USING (
  is_hr_manager(auth.uid()) AND
  b2b_partner_id = get_user_b2b_partner_id(auth.uid())
);

