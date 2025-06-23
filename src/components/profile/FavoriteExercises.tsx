import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { ExerciseVideoDialog } from './ExerciseVideoDialog';
import { FavoriteExerciseCard } from './FavoriteExerciseCard';
import { ExerciseNavigation } from './ExerciseNavigation';
import { ExercisePaginationIndicator } from './ExercisePaginationIndicator';

interface FavoriteExercise {
  id: string;
  exercise_title: string;
  video_id: string;
  description?: string;
  created_at: string;
}

export const FavoriteExercises = () => {
  const [favoriteExercises, setFavoriteExercises] = useState<FavoriteExercise[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedExercise, setSelectedExercise] = useState<FavoriteExercise | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useAuth();

  const exercisesPerPage = 3;

  useEffect(() => {
    const fetchFavoriteExercises = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        console.log('Fetching favorite exercises for user:', user.id);
        
        const { data, error } = await supabase
          .from('favorite_exercises')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (error) {
          console.error('Error fetching favorite exercises:', error);
          return;
        }
        
        console.log('Fetched favorite exercises:', data);
        setFavoriteExercises(data || []);
      } catch (error) {
        console.error('Error fetching favorite exercises:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFavoriteExercises();

    // Listen for real-time updates
    const channel = supabase
      .channel('favorite-exercises-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'favorite_exercises',
          filter: `user_id=eq.${user?.id}`
        },
        (payload) => {
          console.log('Real-time update received:', payload);
          fetchFavoriteExercises();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex + exercisesPerPage < favoriteExercises.length;

  const scrollLeft = () => {
    if (canScrollLeft) {
      setCurrentIndex(Math.max(0, currentIndex - exercisesPerPage));
    }
  };

  const scrollRight = () => {
    if (canScrollRight) {
      setCurrentIndex(Math.min(favoriteExercises.length - exercisesPerPage, currentIndex + exercisesPerPage));
    }
  };

  const handleExerciseClick = (exercise: FavoriteExercise) => {
    setSelectedExercise(exercise);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedExercise(null);
  };

  const visibleExercises = favoriteExercises.slice(currentIndex, currentIndex + exercisesPerPage);
  const totalPages = Math.ceil(favoriteExercises.length / exercisesPerPage);
  const currentPage = Math.floor(currentIndex / exercisesPerPage);

  if (loading) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Obľúbené cviky</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">{t('loading')}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Obľúbené cviky</CardTitle>
        </CardHeader>
        <CardContent>
          {favoriteExercises.length > 0 ? (
            <div className="relative">
              {/* Navigation arrows */}
              {favoriteExercises.length > exercisesPerPage && (
                <ExerciseNavigation
                  canScrollLeft={canScrollLeft}
                  canScrollRight={canScrollRight}
                  onScrollLeft={scrollLeft}
                  onScrollRight={scrollRight}
                />
              )}
              
              {/* Exercises grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-8">
                {visibleExercises.map((exercise) => (
                  <FavoriteExerciseCard 
                    key={exercise.id} 
                    exercise={exercise}
                    onClick={handleExerciseClick}
                  />
                ))}
              </div>
              
              {/* Page indicator */}
              {favoriteExercises.length > exercisesPerPage && (
                <ExercisePaginationIndicator
                  totalPages={totalPages}
                  currentPage={currentPage}
                />
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Zatiaľ nemáte žiadne obľúbené cviky. 
                Môžete si ich pridať označením hviezdy pri cvikoch v pláne cvičení.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Exercise Video Dialog */}
      <ExerciseVideoDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        exercise={selectedExercise}
      />
    </>
  );
};
