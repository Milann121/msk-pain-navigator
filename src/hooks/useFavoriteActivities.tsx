import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export interface FavoriteActivity {
  id: string;
  user_id: string;
  activity: string;
  pain_area: string | null;
  created_at: string;
  updated_at: string;
}

export const useFavoriteActivities = () => {
  const [favoriteActivities, setFavoriteActivities] = useState<FavoriteActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchFavoriteActivities = async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('favorite_activities')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error('Error fetching favorite activities:', error);
        return;
      }
      
      setFavoriteActivities(data || []);
    } catch (error) {
      console.error('Error fetching favorite activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const addFavoriteActivity = async (activity: string, painArea?: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('favorite_activities')
        .insert([
          {
            user_id: user.id,
            activity,
            pain_area: painArea || null,
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Error adding favorite activity:', error);
        return null;
      }

      setFavoriteActivities(prev => [data, ...prev]);
      return data;
    } catch (error) {
      console.error('Error adding favorite activity:', error);
      return null;
    }
  };

  const removeFavoriteActivity = async (activityName: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('favorite_activities')
        .delete()
        .eq('user_id', user.id)
        .eq('activity', activityName);

      if (error) {
        console.error('Error removing favorite activity:', error);
        return;
      }

      setFavoriteActivities(prev => prev.filter(item => item.activity !== activityName));
    } catch (error) {
      console.error('Error removing favorite activity:', error);
    }
  };

  const isActivityFavorite = (activityName: string) => {
    return favoriteActivities.some(item => item.activity === activityName);
  };

  useEffect(() => {
    fetchFavoriteActivities();

    // Listen for real-time updates
    const channel = supabase
      .channel('favorite-activities-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'favorite_activities',
          filter: `user_id=eq.${user?.id}`
        },
        () => {
          fetchFavoriteActivities();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return {
    favoriteActivities,
    loading,
    addFavoriteActivity,
    removeFavoriteActivity,
    isActivityFavorite,
    refreshFavoriteActivities: fetchFavoriteActivities,
  };
};