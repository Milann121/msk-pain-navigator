
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export const useProfileCompletion = () => {
  const { user, isLoading: authLoading } = useAuth();
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [isCheckingProfile, setIsCheckingProfile] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      checkProfileCompletion();
    }
  }, [user, authLoading]);

  const checkProfileCompletion = async () => {
    if (!user) return;

    setIsCheckingProfile(true);
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      // If no profile exists or error (profile not found), show popup
      if (error && error.code === 'PGRST116') {
        setShowProfilePopup(true);
      }
    } catch (error) {
      console.error('Error checking profile completion:', error);
    } finally {
      setIsCheckingProfile(false);
    }
  };

  const handleProfileCompleted = () => {
    setShowProfilePopup(false);
  };

  return {
    showProfilePopup,
    isCheckingProfile,
    handleProfileCompleted,
    setShowProfilePopup
  };
};
