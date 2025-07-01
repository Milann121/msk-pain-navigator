
-- Drop policies from msk_profiles table that depend on b2b_partner_id
DROP POLICY IF EXISTS "HR can access own company's MSK profiles" ON public.msk_profiles;
DROP POLICY IF EXISTS "HR can insert MSK profiles for their company's employees" ON public.msk_profiles;
DROP POLICY IF EXISTS "HR can update own company's MSK profiles" ON public.msk_profiles;
DROP POLICY IF EXISTS "Employees can access their own MSK profile" ON public.msk_profiles;
DROP POLICY IF EXISTS "Employees can update their own MSK profile" ON public.msk_profiles;

-- Drop policies from b2b_employees table
DROP POLICY IF EXISTS "HR can access own company's employees" ON public.b2b_employees;
DROP POLICY IF EXISTS "HR can insert employees for their company" ON public.b2b_employees;
DROP POLICY IF EXISTS "HR can update own company's employees" ON public.b2b_employees;
DROP POLICY IF EXISTS "Employees can access their own record" ON public.b2b_employees;
DROP POLICY IF EXISTS "Employees can update their own record" ON public.b2b_employees;
DROP POLICY IF EXISTS "Allow B2B employee verification" ON public.b2b_employees;
DROP POLICY IF EXISTS "Allow B2B employee state updates" ON public.b2b_employees;

-- Drop the existing foreign key constraint
ALTER TABLE public.b2b_employees 
DROP CONSTRAINT IF EXISTS b2b_employees_b2b_partner_id_fkey;

-- Now we can safely alter the column type
ALTER TABLE public.b2b_employees 
ALTER COLUMN b2b_partner_id TYPE bigint;

-- Add the proper foreign key constraint
ALTER TABLE public.b2b_employees 
ADD CONSTRAINT b2b_employees_b2b_partner_id_fkey 
FOREIGN KEY (b2b_partner_id) REFERENCES public."B2B_partners"(id);

-- Create policies for verification process (allows anonymous access for verification)
CREATE POLICY "Allow B2B employee verification" 
ON public.b2b_employees
FOR SELECT
USING (true);

CREATE POLICY "Allow B2B employee state updates" 
ON public.b2b_employees
FOR UPDATE
USING (true)
WITH CHECK (true);

-- Recreate policies for authenticated users on b2b_employees
CREATE POLICY "Employees can access their own record" 
ON public.b2b_employees
FOR SELECT
TO authenticated
USING (id IN (
  SELECT users.b2b_employee_id
  FROM users
  WHERE users.id = auth.uid() AND users.user_type = 'employee'
));

CREATE POLICY "Employees can update their own record" 
ON public.b2b_employees
FOR UPDATE
TO authenticated
USING (id IN (
  SELECT users.b2b_employee_id
  FROM users
  WHERE users.id = auth.uid() AND users.user_type = 'employee'
));

CREATE POLICY "HR can access own company's employees" 
ON public.b2b_employees
FOR SELECT
TO authenticated
USING (
  is_hr_manager(auth.uid()) AND 
  b2b_partner_id = get_user_b2b_partner_id(auth.uid())
);

CREATE POLICY "HR can insert employees for their company" 
ON public.b2b_employees
FOR INSERT
TO authenticated
WITH CHECK (
  is_hr_manager(auth.uid()) AND 
  b2b_partner_id = get_user_b2b_partner_id(auth.uid())
);

CREATE POLICY "HR can update own company's employees" 
ON public.b2b_employees
FOR UPDATE
TO authenticated
USING (
  is_hr_manager(auth.uid()) AND 
  b2b_partner_id = get_user_b2b_partner_id(auth.uid())
);

-- Recreate policies for msk_profiles table
CREATE POLICY "Employees can access their own MSK profile" 
ON public.msk_profiles
FOR SELECT
TO authenticated
USING (b2b_eployee_id IN (
  SELECT users.b2b_employee_id
  FROM users
  WHERE users.id = auth.uid() AND users.user_type = 'employee'
));

CREATE POLICY "Employees can update their own MSK profile" 
ON public.msk_profiles
FOR UPDATE
TO authenticated
USING (b2b_eployee_id IN (
  SELECT users.b2b_employee_id
  FROM users
  WHERE users.id = auth.uid() AND users.user_type = 'employee'
));

CREATE POLICY "HR can access own company's MSK profiles" 
ON public.msk_profiles
FOR SELECT
TO authenticated
USING (
  is_hr_manager(auth.uid()) AND 
  b2b_eployee_id IN (
    SELECT b2b_employees.id
    FROM b2b_employees
    WHERE b2b_employees.b2b_partner_id = get_user_b2b_partner_id(auth.uid())
  )
);

CREATE POLICY "HR can insert MSK profiles for their company's employees" 
ON public.msk_profiles
FOR INSERT
TO authenticated
WITH CHECK (
  is_hr_manager(auth.uid()) AND 
  b2b_eployee_id IN (
    SELECT b2b_employees.id
    FROM b2b_employees
    WHERE b2b_employees.b2b_partner_id = get_user_b2b_partner_id(auth.uid())
  )
);

CREATE POLICY "HR can update own company's MSK profiles" 
ON public.msk_profiles
FOR UPDATE
TO authenticated
USING (
  is_hr_manager(auth.uid()) AND 
  b2b_eployee_id IN (
    SELECT b2b_employees.id
    FROM b2b_employees
    WHERE b2b_employees.b2b_partner_id = get_user_b2b_partner_id(auth.uid())
  )
);
