import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { FavoriteActivity } from '@/hooks/useFavoriteActivities';

interface FavoriteActivityWithImage extends FavoriteActivity {
  image: string;
}

interface HomeFavoriteActivitiesState {
  favoriteActivities: FavoriteActivityWithImage[];
  isEligible: boolean;
  loading: boolean;
  hasActiveProgram: boolean;
  assessmentId: string | null;
}

// Activities data with images - matching FavoriteActivitiesSection
const ACTIVITIES = [
  { key: "careOfFamily", image: "/lovable-uploads/psfsImages/psfsCareFamilyImage.png" },
  { key: "carryItems", image: "/lovable-uploads/psfsImages/psfsHeavyLoadsImage.png" },
  { key: "householdWorks", image: "/lovable-uploads/psfsImages/psfsHouseHoldImage.png" },
  { key: "hiking", image: "/lovable-uploads/psfsImages/psfsManHikingImage.png" },
  { key: "jogging", image: "/lovable-uploads/psfsImages/psfsManJoggingImage.png" },
  { key: "walking", image: "/lovable-uploads/psfsImages/psfsPairStrollImage.png" },
  { key: "walkingStairs", image: "/lovable-uploads/psfsImages/psfsWalkingStairsImage.png" },
  { key: "cycling", image: "/lovable-uploads/psfsImages/psfsWomanCyclingImage.png" },
  { key: "weightlifting", image: "/lovable-uploads/psfsImages/psfsWomanDeadLiftImage.png" },
  { key: "swimming", image: "/lovable-uploads/psfsImages/psfsWomanSwimImage.png" }
];

export const useHomeFavoriteActivities = () => {
  const { user } = useAuth();
  const [state, setState] = useState<HomeFavoriteActivitiesState>({
    favoriteActivities: [],
    isEligible: false,
    loading: true,
    hasActiveProgram: false,
    assessmentId: null
  });

  useEffect(() => {
    const checkPsfsCompletion = async () => {
      if (!user) {
        setState(prev => ({ ...prev, loading: false }));
        return;
      }

      try {
        // 1. Check if user has active program tracking
        const { data: programData, error: programError } = await supabase
          .from('user_program_tracking')
          .select('assessment_id')
          .eq('user_id', user.id)
          .eq('program_status', 'active')
          .order('created_at', { ascending: false })
          .limit(1);

        if (programError) throw programError;

        if (!programData || programData.length === 0) {
          setState(prev => ({ ...prev, loading: false, isEligible: false }));
          return;
        }

        const assessmentId = programData[0].assessment_id;

        // 2. Check if the active program was created from PSFS assessment (psfs_source: true)
        const { data: assessmentData, error: assessmentError } = await supabase
          .from('user_assessments')
          .select('psfs_source')
          .eq('id', assessmentId)
          .single();

        if (assessmentError) throw assessmentError;

        // Only proceed if this program came from PSFS assessment
        if (!assessmentData?.psfs_source) {
          setState(prev => ({ ...prev, loading: false, isEligible: false }));
          return;
        }

        // 3. Get favorite activities (can be with or without pain areas for PSFS-sourced programs)
        const { data: favActivities, error: favError } = await supabase
          .from('favorite_activities')
          .select('*')
          .eq('user_id', user.id)
          .limit(3);

        if (favError) throw favError;

        // 4. Check if user has completed PSFS assessment
        const { data: psfsData, error: psfsError } = await supabase
          .from('psfs_assessment')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1);

        if (psfsError) throw psfsError;

        // User is eligible if:
        // - Has active program from PSFS assessment (psfs_source: true)
        // - Has at least 1 favorite activity
        // - Has completed PSFS assessment
        const isEligible = 
          favActivities && favActivities.length > 0 &&
          psfsData && psfsData.length > 0;

        // Prepare activities with images for display
        const activitiesWithImages = favActivities?.slice(0, 3).map(activity => {
          const activityData = ACTIVITIES.find(a => 
            a.key === activity.activity || 
            a.key === activity.activity.toLowerCase().replace(/\s+/g, '')
          );
          
          return {
            ...activity,
            image: activityData?.image || ACTIVITIES[0].image
          };
        }) || [];

        setState({
          favoriteActivities: activitiesWithImages,
          isEligible,
          loading: false,
          hasActiveProgram: programData && programData.length > 0,
          assessmentId: programData?.[0]?.assessment_id || null
        });

      } catch (error) {
        console.error('Error checking PSFS completion:', error);
        setState(prev => ({ ...prev, loading: false }));
      }
    };

    checkPsfsCompletion();
  }, [user]);

  const openProgram = () => {
    // Navigate to PSFS program - for now redirect to my-exercises
    // This could be enhanced to navigate to a specific program page
    window.location.href = '/my-exercises';
  };

  return {
    ...state,
    openProgram
  };
};