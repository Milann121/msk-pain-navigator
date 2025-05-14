
import { supabase } from "@/integrations/supabase/client";
import { UserAssessment } from "@/components/follow-up/types";
import { Database } from "@/integrations/supabase/types";

// Export the FollowUpResponse type for use elsewhere
export interface FollowUpResponseData {
  id?: string;
  user_id: string;
  assessment_id: string;
  pain_level: number;
  responses: Record<string, any>;
  created_at?: string;
}

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
  intial_pain_intensity?: number; // Added the column from the database
  
  // Extended properties (not directly from the database)
  initial_pain_level?: number;
  latest_pain_level?: number;
  completed_exercises_count: number;
  last_completed_at?: string;
}

// Interface for general questionnaire results
export interface GeneralQuestionnaireResult {
  id?: string;
  user_id: string;
  assessment_id: string;
  answers: Record<string, any>;
  created_at?: string;
}

// Safe wrapper for querying tables that might not be in the TypeScript definitions
export const safeDatabase = {
  followUpResponses: {
    insert: async (data: FollowUpResponse) => {
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
  generalQuestionnaire: {
    insert: async (data: GeneralQuestionnaireResult) => {
      return await supabase
        .from('general_questionnaire_results' as any)
        .insert(data as any);
    },
    select: async (query: {
      assessment_id?: string;
      user_id?: string;
      limit?: number;
    }) => {
      let builder = supabase
        .from('general_questionnaire_results' as any)
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
      
      return builder;
    }
  },
  // Helper to get the initial pain level from a questionnaire
  getInitialPainLevel: async (assessmentId: string, userId: string): Promise<number | undefined> => {
    try {
      // First, check if the assessment has the initial pain level stored directly
      const { data: assessment, error: assessmentError } = await supabase
        .from('user_assessments')
        .select('intial_pain_intensity')
        .eq('id', assessmentId)
        .eq('user_id', userId)
        .single();
      
      if (!assessmentError && assessment && assessment.intial_pain_intensity !== null) {
        return assessment.intial_pain_intensity;
      }
      
      // If not available directly, try to get it from general questionnaire
      const { data: generalQuestionnaire, error } = await supabase
        .from('general_questionnaire_results' as any)
        .select('answers')
        .eq('assessment_id', assessmentId)
        .eq('user_id', userId)
        .single() as any;
      
      if (error || !generalQuestionnaire) {
        console.log('Could not find general questionnaire results, trying alternative approach');
        // Fallback solution: try to get it from follow up responses sorted by timestamp
        const { data: firstFollowUp, error: followUpError } = await safeDatabase.followUpResponses.select({
          assessment_id: assessmentId,
          user_id: userId,
          limit: 1,
          orderBy: { column: 'created_at', ascending: true }
        });

        if (!followUpError && firstFollowUp && Array.isArray(firstFollowUp) && firstFollowUp.length > 0) {
          return firstFollowUp[0].pain_level;
        }
        
        return undefined;
      }
      
      // Extract pain intensity from answers if available
      if (generalQuestionnaire && typeof generalQuestionnaire.answers === 'object') {
        const answers = generalQuestionnaire.answers as Record<string, any>;
        if (answers && answers['pain-intensity'] !== undefined) {
          return Number(answers['pain-intensity']);
        }
      }
      
      return undefined;
    } catch (error) {
      console.error('Error getting initial pain level:', error);
      return undefined;
    }
  }
};
