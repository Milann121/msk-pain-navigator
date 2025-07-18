import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import { MoodCalendar } from '@/components/profile/MoodCalendar';
import { OrebroEntry } from '@/components/profile/OrebroEntry';
import { PsfsEntry } from '@/components/profile/PsfsEntry';
import { ProgressContainer } from '@/components/profile/ProgressContainer';
import { FavoriteExercises } from '@/components/profile/FavoriteExercises';
import { SavedBlogs } from '@/components/profile/SavedBlogs';
import { ProfileFormPopup } from '@/components/profile/ProfileFormPopup';
import { NotificationArea } from '@/components/profile/NotificationArea';
import { useProfileCompletion } from '@/hooks/useProfileCompletion';
import { supabase } from '@/integrations/supabase/client';

const Domov = () => {
  const { user, isLoading } = useAuth();
  const { t } = useTranslation();
  const { 
    showProfilePopup, 
    isCheckingProfile, 
    handleProfileCompleted 
  } = useProfileCompletion();

  const [weeklyExerciseGoal, setWeeklyExerciseGoal] = useState<number | null>(null);
  const [weeklyBlogGoal, setWeeklyBlogGoal] = useState<number | null>(null);

  // OREBRO and PSFS state management
  const [orebroExpanded, setOrebroExpanded] = useState(false);
  const [orebroWrapped, setOrebroWrapped] = useState(false);
  const [psfsExpanded, setPsfsExpanded] = useState(false);
  const [psfsWrapped, setPsfsWrapped] = useState(false);

  // Load goals from database
  useEffect(() => {
    const loadGoals = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('user_goals')
          .select('*')
          .eq('user_id', user.id);

        if (error) throw error;

        if (data) {
          data.forEach(goal => {
            if (goal.goal_type === 'weekly_exercise') {
              setWeeklyExerciseGoal(goal.weekly_exercises_goal);
            } else if (goal.goal_type === 'weekly_blog') {
              setWeeklyBlogGoal(goal.weekly_exercises_goal);
            }
          });
        }
      } catch (error) {
        console.error('Error loading goals:', error);
      }
    };

    loadGoals();
  }, [user]);

  if (isLoading || isCheckingProfile) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
         <div className="flex-1 bg-background py-10 px-4 flex items-center justify-center">
           <div className="text-foreground">{t('loading')}</div>
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
      <div className="flex-1 bg-background py-10 px-2 md:px-4">
        <div className="container mx-auto w-full max-w-full md:max-w-4xl px-2 md:px-0">
          {/* Notification Area - Above Mood Calendar on mobile/tablet */}
          <div className="block md:hidden">
            <NotificationArea />
          </div>
          
          {/* Notification Area - Above General Program on desktop */}
          <div className="hidden md:block">
            <div className="w-full max-w-4xl mx-auto">
              <NotificationArea />
            </div>
          </div>
          
          {/* Mood Calendar */}
          <MoodCalendar />
          
          {/* OREBRO and PSFS Questionnaires */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className={`${
              (orebroExpanded && psfsExpanded) || 
              (orebroWrapped && !psfsExpanded) || 
              (!orebroExpanded && !orebroWrapped && !psfsExpanded)
                ? 'min-h-fit' 
                : orebroWrapped || (!orebroExpanded && !orebroWrapped) 
                  ? 'min-h-[80px]' 
                  : 'min-h-fit'
            }`}>
              <OrebroEntry 
                isExpanded={orebroExpanded}
                isWrapped={orebroWrapped}
                onExpand={() => setOrebroExpanded(true)}
                onCollapse={() => setOrebroExpanded(false)}
                onWrap={() => setOrebroWrapped(true)}
                onUnwrap={() => setOrebroWrapped(false)}
              />
            </div>
            <div className={`${
              (orebroExpanded && psfsExpanded) || 
              (!orebroExpanded && !orebroWrapped && !psfsExpanded && !psfsWrapped)
                ? 'min-h-fit' 
                : !psfsExpanded && !psfsWrapped
                  ? 'min-h-[80px]' 
                  : 'min-h-fit'
            }`}>
              <PsfsEntry 
                isExpanded={psfsExpanded}
                isWrapped={psfsWrapped}
                onExpand={() => setPsfsExpanded(true)}
                onCollapse={() => setPsfsWrapped(true)}
                onWrap={() => setPsfsWrapped(true)}
                onUnwrap={() => setPsfsWrapped(false)}
              />
            </div>
          </div>
          
          {/* Progress Container */}
          <ProgressContainer 
            weeklyExerciseGoal={weeklyExerciseGoal} 
            weeklyBlogGoal={weeklyBlogGoal}
          />
          
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
