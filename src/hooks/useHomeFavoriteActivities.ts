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
        // 1. Check if user has exactly 3 favorite activities with pain areas
        const { data: favActivities, error: favError } = await supabase
          .from('favorite_activities')
          .select('*')
          .eq('user_id', user.id)
          .not('pain_area', 'is', null);

        if (favError) throw favError;

        // 2. Check if user has completed PSFS assessment
        const { data: psfsData, error: psfsError } = await supabase
          .from('psfs_assessment')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1);

        if (psfsError) throw psfsError;

        // 3. Check if user has active program tracking
        const { data: programData, error: programError } = await supabase
          .from('user_program_tracking')
          .select('*')
          .eq('user_id', user.id)
          .eq('program_status', 'active')
          .order('created_at', { ascending: false })
          .limit(1);

        if (programError) throw programError;

        // User is eligible if:
        // - Has exactly 3 favorite activities with pain areas
        // - Has completed PSFS assessment
        // - Has active program tracking
        const isEligible = 
          favActivities && favActivities.length === 3 &&
          psfsData && psfsData.length > 0 &&
          programData && programData.length > 0;

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