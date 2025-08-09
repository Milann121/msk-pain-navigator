
-- 1) Ensure RLS UPDATE is allowed for favorite_activities
-- If RLS is already enabled on the table (it is), just add the UPDATE policy.

CREATE POLICY "Users can update their own favorite activities"
  ON public.favorite_activities
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 2) Keep updated_at in sync automatically on updates (good hygiene)
DROP TRIGGER IF EXISTS set_timestamp_on_favorite_activities ON public.favorite_activities;

CREATE TRIGGER set_timestamp_on_favorite_activities
BEFORE UPDATE ON public.favorite_activities
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
