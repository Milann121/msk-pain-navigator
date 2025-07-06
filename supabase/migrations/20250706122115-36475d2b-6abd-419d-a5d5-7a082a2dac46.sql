-- Add user_department column to store the selected department
ALTER TABLE user_profiles 
ADD COLUMN user_department uuid REFERENCES company_departments(id);