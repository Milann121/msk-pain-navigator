
-- Table for user exercise feedback entries
CREATE TABLE public.exercise_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  exercise_title TEXT NOT NULL,
  video_id TEXT NOT NULL,
  feedback_value INTEGER NOT NULL, -- 1 = yes, -1 = changed exercise
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Allow only authenticated users to read/write their own feedback
ALTER TABLE public.exercise_feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own feedback"
  ON public.exercise_feedback
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can select their own feedback"
  ON public.exercise_feedback
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own feedback"
  ON public.exercise_feedback
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own feedback"
  ON public.exercise_feedback
  FOR DELETE
  USING (auth.uid() = user_id);
