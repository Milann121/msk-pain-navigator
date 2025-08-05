
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const PROFILE_POPUP_SHOWN_KEY = 'profilePopupShown';

export const useProfileCompletion = () => {
  const { user, isLoading: authLoading } = useAuth();
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [isCheckingProfile, setIsCheckingProfile] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      // Check if user just signed up (no profile completion shown before)
      const alreadyShown = localStorage.getItem(PROFILE_POPUP_SHOWN_KEY);
      if (!alreadyShown) {
        checkProfileCompletion();
      }
    }
  }, [user, authLoading]);

  const checkProfileCompletion = async () => {
    if (!user) return;

    console.log('Checking profile completion for user:', user.id);
    setIsCheckingProfile(true);
    
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('first_name, last_name, gender, year_birth, job_type')
        .eq('user_id', user.id)
        .single();

      // If no profile exists or error (profile not found), show popup
      if (error && error.code === 'PGRST116') {
        console.log('No profile found, showing popup');
        setShowProfilePopup(true);
      } else if (data) {
        // Check if required personal fields are filled (first_name, last_name, gender, year_birth)
        const hasRequiredPersonalFields = data.first_name && 
                                         data.last_name && 
                                         data.gender &&
                                         data.year_birth;
        
        console.log('Profile exists, required personal fields check:', {
          first_name: !!data.first_name,
          last_name: !!data.last_name,
          gender: !!data.gender,
          year_birth: !!data.year_birth,
          hasRequiredPersonalFields
        });

        if (!hasRequiredPersonalFields) {
          console.log('Required personal fields missing, showing popup');
          setShowProfilePopup(true);
        } else {
          // Profile already complete, remember completion
          localStorage.setItem(PROFILE_POPUP_SHOWN_KEY, 'true');
        }
      }
    } catch (error) {
      console.error('Error checking profile completion:', error);
    } finally {
      setIsCheckingProfile(false);
    }
  };

  const handleProfileCompleted = () => {
    localStorage.setItem(PROFILE_POPUP_SHOWN_KEY, 'true');
    console.log('Profile completion confirmed');
    setShowProfilePopup(false);
  };

  return {
    showProfilePopup,
    isCheckingProfile,
    handleProfileCompleted,
    setShowProfilePopup
  };
};
