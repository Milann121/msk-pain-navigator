
import { supabase } from "@/integrations/supabase/client";

// Type definitions for tables that aren't in the auto-generated types
export interface FollowUpResponse {
  id?: string;
  user_id: string;
  assessment_id: string;
  pain_level: number;
  responses: Record<string, any>;
  created_at?: string;
}

// Helper functions for working with tables not in the TypeScript definitions
export const safeDatabase = {
  followUpResponses: {
    insert: async (data: FollowUpResponse) => {
      return await supabase
        .from('follow_up_responses')
        .insert(data as any);
    },
    select: async (query: {
      assessment_id?: string;
      user_id?: string;
      limit?: number;
      orderBy?: { column: string; ascending: boolean };
    }) => {
      let builder = supabase
        .from('follow_up_responses')
        .select('*') as any;
      
      if (query.assessment_id) {
        builder = builder.eq('assessment_id', query.assessment_id);
      }
      
      if (query.user_id) {
        builder = builder.eq('user_id', query.user_id);
      }
      
      if (query.limit) {
        builder = builder.limit(query.limit);
      }
      
      if (query.orderBy) {
        builder = builder.order(query.orderBy.column, { 
          ascending: query.orderBy.ascending 
        });
      }
      
      return builder;
    }
  }
};

// Extended types for user_assessments table fields that are not in the database but used in our code
export interface ExtendedUserAssessment {
  id: string;
  user_id: string;
  pain_area: string;
  primary_differential: string;
  primary_mechanism: string;
  sin_group: string;
  timestamp: string;
  
  // Extended properties (not directly from the database)
  initial_pain_level?: number;
  latest_pain_level?: number;
  completed_exercises_count: number;
  last_completed_at?: string;
}
