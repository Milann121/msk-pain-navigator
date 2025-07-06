-- Create function to automatically update b2b_partner_id in user_profiles
CREATE OR REPLACE FUNCTION update_b2b_partner_id()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE user_profiles
    SET b2b_partner_id = (
        SELECT b2b_partner_id 
        FROM b2b_employees 
        WHERE b2b_employees.user_id = NEW.user_id
        LIMIT 1
    )
    WHERE id = NEW.id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to execute the function
CREATE TRIGGER set_b2b_partner_id
AFTER INSERT OR UPDATE OF user_id
ON user_profiles
FOR EACH ROW
EXECUTE FUNCTION update_b2b_partner_id();

-- Update existing records to sync b2b_partner_id
UPDATE user_profiles 
SET b2b_partner_id = (
    SELECT b2b_partner_id 
    FROM b2b_employees 
    WHERE b2b_employees.user_id = user_profiles.user_id
    LIMIT 1
)
WHERE user_profiles.user_id IN (
    SELECT user_id FROM b2b_employees WHERE user_id IS NOT NULL
);