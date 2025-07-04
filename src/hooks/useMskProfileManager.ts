import { useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { UserAssessment } from '@/components/follow-up/types';
import { safeDatabase } from '@/utils/database-helpers';

interface MskProfileData {
  pain_areas: string[];
  pain_level_initial: number;
  pain_level_improvement: number;
  resolved_bodyarea: string[];
}

export const useMskProfileManager = () => {
  const { user } = useAuth();

  // Get B2B employee ID for the current user
  const getEmployeeId = useCallback(async (): Promise<string | null> => {
    if (!user?.email) return null;

    // Try b2b_employees first
    const { data: b2bEmployee } = await supabase
      .from('b2b_employees')
      .select('id')
      .eq('email', user.email)
      .maybeSingle();

    if (b2bEmployee) return b2bEmployee.id;

    // Fall back to test_2_employees
    const { data: testEmployee } = await supabase
      .from('test_2_employees')
      .select('id')
      .eq('email', user.email)
      .maybeSingle();

    return testEmployee?.id || null;
  }, [user?.email]);

  // Calculate average initial pain level from all assessments
  const calculateAverageInitialPain = useCallback(async (assessments: UserAssessment[]): Promise<number> => {
    if (!user || assessments.length === 0) return 0;

    let totalPain = 0;
    let count = 0;

    for (const assessment of assessments) {
      // Try to get initial pain from assessment directly
      let initialPain = assessment.initial_pain_level;
      
      // If not available, get from database helper
      if (initialPain === undefined) {
        initialPain = await safeDatabase.getInitialPainLevel(assessment.id, user.id);
      }

      if (initialPain !== undefined && initialPain > 0) {
        totalPain += initialPain;
        count++;
      }
    }

    return count > 0 ? Math.round(totalPain / count) : 0;
  }, [user]);

  // Get latest pain level for an assessment
  const getLatestPainLevel = useCallback(async (assessmentId: string): Promise<number | null> => {
    if (!user) return null;

    try {
      const { data: latestResponse } = await safeDatabase.followUpResponses.select({
        assessment_id: assessmentId,
        user_id: user.id,
        limit: 1,
        orderBy: { column: 'created_at', ascending: false }
      });

      if (latestResponse && Array.isArray(latestResponse) && latestResponse.length > 0) {
        return latestResponse[0].pain_level;
      }
    } catch (error) {
      console.error('Error getting latest pain level:', error);
    }

    return null;
  }, [user]);

  // Calculate average pain improvement percentage
  const calculatePainImprovement = useCallback(async (assessments: UserAssessment[]): Promise<number> => {
    if (!user || assessments.length === 0) return 0;

    let totalImprovement = 0;
    let count = 0;

    for (const assessment of assessments) {
      // Get initial pain level
      let initialPain = assessment.initial_pain_level;
      if (initialPain === undefined) {
        initialPain = await safeDatabase.getInitialPainLevel(assessment.id, user.id);
      }

      // Get latest pain level
      const latestPain = await getLatestPainLevel(assessment.id);

      if (initialPain !== undefined && latestPain !== null && initialPain > 0) {
        const improvement = ((initialPain - latestPain) / initialPain) * 100;
        totalImprovement += improvement;
        count++;
      }
    }

    return count > 0 ? Math.round(totalImprovement / count) : 0;
  }, [user, getLatestPainLevel]);

  // Get all pain areas from active assessments
  const getActivePainAreas = useCallback((assessments: UserAssessment[]): string[] => {
    return assessments
      .filter(assessment => !assessment.program_ended_at)
      .map(assessment => assessment.pain_area)
      .filter((area, index, array) => array.indexOf(area) === index); // Remove duplicates
  }, []);

  // Get all pain areas from ended assessments
  const getResolvedPainAreas = useCallback((assessments: UserAssessment[]): string[] => {
    return assessments
      .filter(assessment => assessment.program_ended_at)
      .map(assessment => assessment.pain_area)
      .filter((area, index, array) => array.indexOf(area) === index); // Remove duplicates
  }, []);

  // Update MSK profile with current data
  const updateMskProfile = useCallback(async (assessments: UserAssessment[]) => {
    if (!user || assessments.length === 0) return;

    console.log('🔄 Updating MSK profile for user:', user.id);

    try {
      const employeeId = await getEmployeeId();
      if (!employeeId) {
        console.log('ℹ️ No B2B employee ID found, skipping MSK profile update');
        return;
      }

      // Calculate all required data
      const activePainAreas = getActivePainAreas(assessments);
      const resolvedPainAreas = getResolvedPainAreas(assessments);
      const averageInitialPain = await calculateAverageInitialPain(assessments);
      const painImprovement = await calculatePainImprovement(assessments);

      console.log('📊 MSK Profile Data:', {
        employeeId,
        activePainAreas,
        resolvedPainAreas,
        averageInitialPain,
        painImprovement
      });

      // Upsert MSK profile
      const { error } = await supabase
        .from('msk_profiles')
        .upsert({
          b2b_employee_id: employeeId,
          pain_areas: activePainAreas,
          pain_level_initial: averageInitialPain,
          pain_level_improvement: painImprovement,
          resolved_bodyarea: resolvedPainAreas
        }, { 
          onConflict: 'b2b_employee_id' 
        });

      if (error) {
        console.error('❌ Error updating MSK profile:', error);
      } else {
        console.log('✅ MSK profile updated successfully');
      }

    } catch (error) {
      console.error('❌ Error in updateMskProfile:', error);
    }
  }, [user, getEmployeeId, getActivePainAreas, getResolvedPainAreas, calculateAverageInitialPain, calculatePainImprovement]);

  // Sync MSK profile when assessments change
  const syncMskProfile = useCallback(async () => {
    if (!user) return;

    try {
      // Get all assessments for the user
      const { data: assessments, error } = await supabase
        .from('user_assessments')
        .select('*')
        .eq('user_id', user.id)
        .order('timestamp', { ascending: false });

      if (error) {
        console.error('❌ Error fetching assessments for MSK sync:', error);
        return;
      }

      if (assessments && assessments.length > 0) {
        // Convert to UserAssessment format
        const userAssessments: UserAssessment[] = assessments.map(assessment => ({
          id: assessment.id,
          user_id: assessment.user_id,
          pain_area: assessment.pain_area,
          primary_differential: assessment.primary_differential,
          primary_mechanism: assessment.primary_mechanism,
          sin_group: assessment.sin_group,
          timestamp: assessment.timestamp,
          initial_pain_level: assessment.intial_pain_intensity,
          program_ended_at: assessment.program_ended_at,
          completed_exercises_count: 0,
          last_completed_at: undefined
        }));

        await updateMskProfile(userAssessments);
      }
    } catch (error) {
      console.error('❌ Error syncing MSK profile:', error);
    }
  }, [user, updateMskProfile]);

  // Set up real-time listeners for data changes
  useEffect(() => {
    if (!user) return;

    console.log('🔔 Setting up MSK profile listeners for user:', user.id);

    // Listen for assessment changes
    const assessmentChannel = supabase
      .channel('msk-assessment-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_assessments',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          console.log('📢 Assessment change detected, syncing MSK profile');
          syncMskProfile();
        }
      )
      .subscribe();

    // Listen for follow-up response changes
    const followUpChannel = supabase
      .channel('msk-followup-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'follow_up_responses',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          console.log('📢 Follow-up response change detected, syncing MSK profile');
          syncMskProfile();
        }
      )
      .subscribe();

    // Initial sync
    syncMskProfile();

    return () => {
      supabase.removeChannel(assessmentChannel);
      supabase.removeChannel(followUpChannel);
    };
  }, [user, syncMskProfile]);

  return {
    updateMskProfile,
    syncMskProfile,
    calculateAverageInitialPain,
    calculatePainImprovement,
    getActivePainAreas,
    getResolvedPainAreas
  };
};