
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import { ProfileInfo } from '@/components/profile/ProfileInfo';
import { ProfileFormPopup } from '@/components/profile/ProfileFormPopup';
import { GoalsContainer } from '@/components/profile/GoalsContainer';
import { useProfileCompletion } from '@/hooks/useProfileCompletion';

const Profile = () => {
  const { t } = useTranslation();
  const { user, isLoading } = useAuth();
  const { 
    showProfilePopup, 
    isCheckingProfile, 
    handleProfileCompleted 
  } = useProfileCompletion();

  const [popupGoals, setPopupGoals] = useState<{
    weeklyExerciseGoal: number | null;
    weeklyBlogGoal: number | null;
  }>({
    weeklyExerciseGoal: null,
    weeklyBlogGoal: null
  });

  if (isLoading || isCheckingProfile) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 bg-gradient-to-b from-blue-50 to-white py-10 px-4 flex items-center justify-center">
          <div className="text-blue-600">{t('loading')}</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const handleGoalsChangeFromPopup = (goals: { weeklyExerciseGoal: number | null; weeklyBlogGoal: number | null }) => {
    setPopupGoals(goals);
  };

  const handleProfileSaved = () => {
    // Reset popup goals after saving
    setPopupGoals({
      weeklyExerciseGoal: null,
      weeklyBlogGoal: null
    });
    handleProfileCompleted();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gradient-to-b from-blue-50 to-white py-10 px-2 md:px-4">
        <div className="container mx-auto w-full max-w-full md:max-w-4xl px-2 md:px-0">
          <h1 className="text-3xl font-bold text-blue-800 mb-6">{t('profile.title')}</h1>
          
          <div className="grid grid-cols-1 gap-6 mb-6">
            {/* User Profile Info */}
            <ProfileInfo />
            
            {/* Goals Container */}
            <GoalsContainer 
              externalGoals={showProfilePopup ? popupGoals : undefined}
            />
          </div>
        </div>
      </div>

      {/* Post-signup profile completion popup */}
      <ProfileFormPopup
        isOpen={showProfilePopup}
        onClose={handleProfileCompleted}
        onProfileSaved={handleProfileSaved}
        onGoalsChange={handleGoalsChangeFromPopup}
      />
    </div>
  );
};

export default Profile;
