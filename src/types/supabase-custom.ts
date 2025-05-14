
// Custom types for Supabase tables that aren't in the auto-generated types
export interface FollowUpResponseData {
  id?: string;
  user_id: string;
  assessment_id: string;
  pain_level: number;
  responses: Record<string, any>;
  created_at?: string;
}

// Extend the Database types with our custom tables
export type CustomDatabase = {
  public: {
    Tables: {
      follow_up_responses: {
        Row: FollowUpResponseData;
        Insert: Omit<FollowUpResponseData, 'id' | 'created_at'>;
        Update: Partial<FollowUpResponseData>;
      };
      general_questionnaire_results: {
        Row: {
          id: string;
          user_id: string;
          assessment_id: string;
          answers: Record<string, any>;
          created_at: string;
        };
      };
    };
  };
};
