
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FavoriteExerciseButtonProps {
  exerciseTitle: string;
  videoId: string;
  description?: string;
}

export const FavoriteExerciseButton = ({ exerciseTitle, videoId, description }: FavoriteExerciseButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        console.log('Checking favorite status for:', { exerciseTitle, videoId, userId: user.id });
        
        const { data, error } = await supabase
          .from('favorite_exercises')
          .select('id')
          .eq('user_id', user.id)
          .eq('exercise_title', exerciseTitle)
          .eq('video_id', videoId)
          .maybeSingle();
          
        if (error) {
          console.error('Error checking favorite status:', error);
        }
        
        setIsFavorite(!!data);
        console.log('Favorite status checked:', !!data);
      } catch (error) {
        console.error('Error checking favorite status:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkFavoriteStatus();
  }, [user, exerciseTitle, videoId]);

  const handleToggleFavorite = async () => {
    console.log('Button clicked, user:', user);
    
    if (!user) {
      toast({
        title: "Chyba",
        description: "Musíte sa prihlásiť, aby ste mohli pridávať obľúbené cvičenia.",
        variant: "destructive"
      });
      return;
    }

    if (isProcessing) {
      console.log('Already processing, ignoring click');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      console.log('Processing favorite toggle:', { isFavorite, exerciseTitle, videoId });
      
      if (isFavorite) {
        // Remove from favorites
        console.log('Removing from favorites...');
        const { error } = await supabase
          .from('favorite_exercises')
          .delete()
          .eq('user_id', user.id)
          .eq('exercise_title', exerciseTitle)
          .eq('video_id', videoId);
          
        if (error) {
          console.error('Error removing favorite:', error);
          throw error;
        }
        
        setIsFavorite(false);
        toast({
          title: "Odstránené z obľúbených",
          description: "Cvičenie bolo odstránené z vašich obľúbených.",
        });
        console.log('Successfully removed from favorites');
      } else {
        // Add to favorites
        console.log('Adding to favorites...');
        const { error } = await supabase
          .from('favorite_exercises')
          .insert({
            user_id: user.id,
            exercise_title: exerciseTitle,
            video_id: videoId,
            description: description || null
          });
          
        if (error) {
          console.error('Error adding favorite:', error);
          throw error;
        }
        
        setIsFavorite(true);
        toast({
          title: "Pridané do obľúbených",
          description: "Cvičenie bolo pridané do vašich obľúbených.",
        });
        console.log('Successfully added to favorites');
      }
    } catch (error: any) {
      console.error('Error toggling favorite:', error);
      toast({
        title: "Chyba",
        description: "Nepodarilo sa zmeniť stav obľúbených cvičení.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return <div className="h-10 w-48 animate-pulse bg-gray-200 rounded" />;
  }

  return (
    <Button 
      onClick={handleToggleFavorite}
      disabled={isProcessing}
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
      {isProcessing 
        ? t('favorite.processing') 
        : (isFavorite ? t('favorite.favorited') : t('favorite.addToFavorites'))
      }
    </Button>
  );
};
