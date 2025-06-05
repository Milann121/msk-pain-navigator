
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import { ProfileInfo } from '@/components/profile/ProfileInfo';
import { ProfileFormPopup } from '@/components/profile/ProfileFormPopup';
import { GoalsContainer } from '@/components/profile/GoalsContainer';
import { ProgressContainer } from '@/components/profile/ProgressContainer';
import { useProfileCompletion } from '@/hooks/useProfileCompletion';

const Profile = () => {
  const { user, isLoading } = useAuth();
  const { 
    showProfilePopup, 
    isCheckingProfile, 
    handleProfileCompleted 
  } = useProfileCompletion();
  
  const [weeklyBlogGoal, setWeeklyBlogGoal] = useState<number | null>(null);

  if (isLoading || isCheckingProfile) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 bg-gradient-to-b from-blue-50 to-white py-10 px-4 flex items-center justify-center">
          <div className="text-blue-600">Načítava sa...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gradient-to-b from-blue-50 to-white py-10 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold text-blue-800 mb-6">Môj profil</h1>
          
          <div className="grid grid-cols-1 gap-6 mb-6">
            {/* User Profile Info */}
            <ProfileInfo />
            
            {/* Goals Container */}
            <GoalsContainer onBlogGoalChange={setWeeklyBlogGoal} />
            
            {/* Progress Container */}
            <ProgressContainer weeklyBlogGoal={weeklyBlogGoal} />
          </div>
        </div>
      </div>

      {/* Post-signup profile completion popup */}
      <ProfileFormPopup
        isOpen={showProfilePopup}
        onClose={handleProfileCompleted}
        onProfileSaved={handleProfileCompleted}
      />
    </div>
  );
};

export default Profile;
