
import { supabase } from "@/integrations/supabase/client";
import { UserAssessment } from "@/components/follow-up/types";
import { FollowUpResponseData } from "@/types/supabase-custom";

// Export the FollowUpResponse type for use elsewhere
export type FollowUpResponse = FollowUpResponseData;

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

// Safe wrapper for querying tables that might not be in the TypeScript definitions
export const safeDatabase = {
  followUpResponses: {
    insert: async (data: FollowUpResponse) => {
      // Use a type assertion to bypass TypeScript's strict checking
      return await supabase
        .from('follow_up_responses' as any)
        .insert(data as any);
    },
    select: async (query: {
      assessment_id?: string;
      user_id?: string;
      limit?: number;
      orderBy?: { column: string; ascending: boolean };
    }) => {
      // Build the query with type assertions
      let builder = supabase
        .from('follow_up_responses' as any)
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
  },
  // Helper to get the initial pain level from a questionnaire
  getInitialPainLevel: async (assessmentId: string, userId: string): Promise<number | undefined> => {
    try {
      // Try to get the general questionnaire result which includes the initial pain level
      const { data: generalQuestionnaire, error } = await supabase
        .from('general_questionnaire_results' as any)
        .select('answers')
        .eq('assessment_id', assessmentId)
        .eq('user_id', userId)
        .single();
      
      if (error || !generalQuestionnaire) {
        console.log('Could not find general questionnaire results, trying alternative approach');
        // Fallback solution: try to get it from follow up responses sorted by timestamp
        const { data: firstFollowUp } = await safeDatabase.followUpResponses.select({
          assessment_id: assessmentId,
          user_id: userId,
          limit: 1,
          orderBy: { column: 'created_at', ascending: true }
        });

        if (firstFollowUp && Array.isArray(firstFollowUp) && firstFollowUp.length > 0) {
          return firstFollowUp[0].pain_level;
        }
        
        return undefined;
      }
      
      // Extract pain intensity from answers if available
      const answers = generalQuestionnaire.answers;
      if (answers && answers['pain-intensity']) {
        return Number(answers['pain-intensity']);
      }
      
      return undefined;
    } catch (error) {
      console.error('Error getting initial pain level:', error);
      return undefined;
    }
  }
};
