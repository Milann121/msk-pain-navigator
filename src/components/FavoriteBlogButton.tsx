
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

interface FavoriteBlogButtonProps {
  blogId: string;
  blogTitle: string;
  blogDescription: string;
  blogImageUrl: string;
  blogLink: string;
  isExternal: boolean;
}

export const FavoriteBlogButton = ({ 
  blogId, 
  blogTitle, 
  blogDescription, 
  blogImageUrl, 
  blogLink, 
  isExternal 
}: FavoriteBlogButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        console.log('Checking favorite blog status for:', { blogId, blogTitle, userId: user.id });
        
        const { data, error } = await supabase
          .from('favorite_blogs')
          .select('id')
          .eq('user_id', user.id)
          .eq('blog_id', blogId)
          .maybeSingle();
          
        if (error) {
          console.error('Error checking favorite blog status:', error);
        }
        
        setIsFavorite(!!data);
        console.log('Favorite blog status checked:', !!data);
      } catch (error) {
        console.error('Error checking favorite blog status:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkFavoriteStatus();
  }, [user, blogId, blogTitle]);

  const handleToggleFavorite = async () => {
    console.log('Blog button clicked, user:', user);
    
    if (!user) {
      toast({
        title: "Chyba",
        description: "Musíte sa prihlásiť, aby ste mohli pridávať obľúbené články.",
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
      console.log('Processing favorite blog toggle:', { isFavorite, blogId, blogTitle });
      
      if (isFavorite) {
        // Remove from favorites
        console.log('Removing blog from favorites...');
        const { error } = await supabase
          .from('favorite_blogs')
          .delete()
          .eq('user_id', user.id)
          .eq('blog_id', blogId);
          
        if (error) {
          console.error('Error removing favorite blog:', error);
          throw error;
        }
        
        setIsFavorite(false);
        toast({
          title: "Odstránené z obľúbených",
          description: "Článok bol odstránený z vašich obľúbených.",
        });
        console.log('Successfully removed blog from favorites');
      } else {
        // Add to favorites
        console.log('Adding blog to favorites...');
        const { error } = await supabase
          .from('favorite_blogs')
          .insert({
            user_id: user.id,
            blog_id: blogId,
            blog_title: blogTitle,
            blog_description: blogDescription,
            blog_image_url: blogImageUrl,
            blog_link: blogLink,
            is_external: isExternal
          });
          
        if (error) {
          console.error('Error adding favorite blog:', error);
          throw error;
        }
        
        setIsFavorite(true);
        toast({
          title: "Pridané do obľúbených",
          description: "Článok bol pridaný do vašich obľúbených.",
        });
        console.log('Successfully added blog to favorites');
      }
    } catch (error: any) {
      console.error('Error toggling favorite blog:', error);
      toast({
        title: "Chyba",
        description: "Nepodarilo sa zmeniť stav obľúbených článkov.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return <div className="h-10 w-full animate-pulse bg-gray-200 rounded" />;
  }

  return (
    <Button 
      onClick={handleToggleFavorite}
      disabled={isProcessing}
      variant="outline"
      className="flex items-center justify-center gap-1 w-full text-xs sm:text-sm"
    >
      <Star 
        className={`h-4 w-4 ${
          isFavorite 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-yellow-400'
        }`}
      />
      {isProcessing 
        ? 'Spracováva sa...' 
        : 'Obľúbené'
      }
    </Button>
  );
};
