
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExerciseCalendar } from '@/components/exercise-dashboard/ExerciseCalendar';
import { ProfileInfo } from '@/components/profile/ProfileInfo';
import { BodyModel } from '@/components/profile/BodyModel';
import { MoodCalendar } from '@/components/profile/MoodCalendar';
import { FavoriteExercises } from '@/components/profile/FavoriteExercises';
import { SavedBlogs } from '@/components/profile/SavedBlogs';

const Profile = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* User Profile Info */}
            <ProfileInfo />
            
            {/* Body Model */}
            <BodyModel />
          </div>
          
          {/* Mood Calendar */}
          <MoodCalendar />
          
          {/* Favorite Exercises */}
          <FavoriteExercises />
          
          {/* Saved Blogs */}
          <SavedBlogs />
        </div>
      </div>
    </div>
  );
};

export default Profile;
