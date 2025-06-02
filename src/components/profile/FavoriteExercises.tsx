
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user } = useAuth();

  const exercisesPerPage = 4;

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

  const visibleExercises = favoriteExercises.slice(currentIndex, currentIndex + exercisesPerPage);

  if (loading) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Obľúbené cviky</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Načítava sa...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Obľúbené cviky</CardTitle>
      </CardHeader>
      <CardContent>
        {favoriteExercises.length > 0 ? (
          <div className="relative">
            {/* Navigation arrows */}
            {favoriteExercises.length > exercisesPerPage && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 ${
                    !canScrollLeft ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={scrollLeft}
                  disabled={!canScrollLeft}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="outline"
                  size="icon"
                  className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 ${
                    !canScrollRight ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={scrollRight}
                  disabled={!canScrollRight}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
            
            {/* Exercises grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-8">
              {visibleExercises.map((exercise) => (
                <div key={exercise.id} className="border rounded-md p-4 space-y-2">
                  {/* Thumbnail */}
                  <div className="aspect-video w-full bg-gray-100 rounded overflow-hidden">
                    <img
                      src={`https://img.youtube.com/vi/${exercise.video_id}/mqdefault.jpg`}
                      alt={exercise.exercise_title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://img.youtube.com/vi/${exercise.video_id}/hqdefault.jpg`;
                      }}
                    />
                  </div>
                  
                  {/* Exercise title */}
                  <h4 className="font-medium text-sm text-center line-clamp-2">
                    {exercise.exercise_title}
                  </h4>
                </div>
              ))}
            </div>
            
            {/* Page indicator */}
            {favoriteExercises.length > exercisesPerPage && (
              <div className="flex justify-center mt-4 gap-1">
                {Array.from({ length: Math.ceil(favoriteExercises.length / exercisesPerPage) }).map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      Math.floor(currentIndex / exercisesPerPage) === index
                        ? 'bg-blue-600'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
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
  );
};
