
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

interface FavoriteExerciseButtonProps {
  exerciseTitle: string;
  videoId: string;
  description?: string;
}

export const FavoriteExerciseButton = ({ exerciseTitle, videoId, description }: FavoriteExerciseButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('favorite_exercises' as any)
          .select('id')
          .eq('user_id', user.id)
          .eq('exercise_title', exerciseTitle)
          .eq('video_id', videoId)
          .single();
          
        if (error && error.code !== 'PGRST116') {
          console.error('Error checking favorite status:', error);
        }
        
        setIsFavorite(!!data);
      } catch (error) {
        console.error('Error checking favorite status:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkFavoriteStatus();
  }, [user, exerciseTitle, videoId]);

  const handleToggleFavorite = async () => {
    if (!user) return;
    
    try {
      if (isFavorite) {
        // Remove from favorites
        const { error } = await supabase
          .from('favorite_exercises' as any)
          .delete()
          .eq('user_id', user.id)
          .eq('exercise_title', exerciseTitle)
          .eq('video_id', videoId);
          
        if (error) throw error;
        
        setIsFavorite(false);
        toast({
          title: "Odstránené z obľúbených",
          description: "Cvičenie bolo odstránené z vašich obľúbených.",
        });
      } else {
        // Add to favorites
        const { error } = await supabase
          .from('favorite_exercises' as any)
          .insert({
            user_id: user.id,
            exercise_title: exerciseTitle,
            video_id: videoId,
            description: description || null
          });
          
        if (error) throw error;
        
        setIsFavorite(true);
        toast({
          title: "Pridané do obľúbených",
          description: "Cvičenie bolo pridané do vašich obľúbených.",
        });
      }
    } catch (error: any) {
      console.error('Error toggling favorite:', error);
      toast({
        title: "Chyba",
        description: "Nepodarilo sa zmeniť stav obľúbených cvičení.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return <div className="h-10 w-48 animate-pulse bg-gray-200 rounded" />;
  }

  return (
    <Button 
      onClick={handleToggleFavorite}
      variant="outline"
      className="flex items-center gap-2"
    >
      <Star 
        className={`h-4 w-4 ${
          isFavorite 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-yellow-400'
        }`}
      />
      {isFavorite ? 'Odstániť z obľúbených' : 'Pridať ako obľúbené'}
    </Button>
  );
};
