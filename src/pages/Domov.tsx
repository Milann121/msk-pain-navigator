
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import { MoodCalendar } from '@/components/profile/MoodCalendar';
import { GoalsContainer } from '@/components/profile/GoalsContainer';
import { ProgressContainer } from '@/components/profile/ProgressContainer';
import { FavoriteExercises } from '@/components/profile/FavoriteExercises';
import { SavedBlogs } from '@/components/profile/SavedBlogs';
import { ProfileFormPopup } from '@/components/profile/ProfileFormPopup';
import { useProfileCompletion } from '@/hooks/useProfileCompletion';

const Domov = () => {
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
      <div className="flex-1 bg-gradient-to-b from-blue-50 to-white py-10 px-2 md:px-4">
        <div className="container mx-auto w-full max-w-full md:max-w-4xl px-2 md:px-0">
          <h1 className="text-3xl font-bold text-blue-800 mb-6 px-2 md:px-0">Domov</h1>
          
          {/* Mood Calendar */}
          <MoodCalendar />
          
          {/* Goals Container */}
          <GoalsContainer onBlogGoalChange={setWeeklyBlogGoal} />
          
          {/* Progress Container */}
          <ProgressContainer weeklyBlogGoal={weeklyBlogGoal} />
          
          {/* Favorite Exercises */}
          <FavoriteExercises />
          
          {/* Saved Blogs */}
          <SavedBlogs />
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

export default Domov;
