
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
        .select('first_name, last_name, age, job')
        .eq('user_id', user.id)
        .single();

      if (data) {
        // Profile already exists, remember completion
        localStorage.setItem(PROFILE_POPUP_SHOWN_KEY, 'true');
      }

      // If no profile exists or error (profile not found), show popup
      if (error && error.code === 'PGRST116') {
        console.log('No profile found, showing popup');
        setShowProfilePopup(true);
      } else if (data) {
        // Check if required fields are filled
        const hasRequiredFields = data.first_name && 
                                 data.last_name && 
                                 data.age && 
                                 data.job;
        
        console.log('Profile exists, required fields check:', {
          first_name: !!data.first_name,
          last_name: !!data.last_name,
          age: !!data.age,
          job: !!data.job,
          hasRequiredFields
        });

        if (!hasRequiredFields) {
          console.log('Required fields missing, showing popup');
          setShowProfilePopup(true);
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
