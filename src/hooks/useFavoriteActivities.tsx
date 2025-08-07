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

  const addFavoriteActivity = async (activityKey: string, painArea?: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('favorite_activities')
        .insert([
          {
            user_id: user.id,
            activity: activityKey,
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

  const removeFavoriteActivity = async (activityKey: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('favorite_activities')
        .delete()
        .eq('user_id', user.id)
        .eq('activity', activityKey);

      if (error) {
        console.error('Error removing favorite activity:', error);
        return;
      }

      setFavoriteActivities(prev => prev.filter(item => item.activity !== activityKey));
    } catch (error) {
      console.error('Error removing favorite activity:', error);
    }
  };

  const updateFavoriteActivity = async (activityKey: string, painArea: string) => {
    if (!user) {
      console.error('❌ No user found when trying to update favorite activity');
      return;
    }

    try {
      console.log('🔄 Updating favorite activity:', { activityKey, painArea, userId: user.id });
      
      // First, let's check what activities exist in the database
      const { data: existingActivities, error: fetchError } = await supabase
        .from('favorite_activities')
        .select('*')
        .eq('user_id', user.id);
        
      if (fetchError) {
        console.error('❌ Error fetching existing activities:', fetchError);
        return;
      }
      
      console.log('📋 Existing activities:', existingActivities);
      
      // Find the matching activity (try both activity key and any existing name)
      const matchingActivity = existingActivities?.find(activity => 
        activity.activity === activityKey
      );
      
      if (!matchingActivity) {
        console.error('❌ No matching activity found for key:', activityKey);
        console.log('Available activities:', existingActivities?.map(a => a.activity));
        return;
      }
      
      console.log('🎯 Found matching activity:', matchingActivity);
      
      // Update the specific activity by ID for precision
      const { data, error } = await supabase
        .from('favorite_activities')
        .update({ 
          pain_area: painArea, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', matchingActivity.id)
        .select();

      if (error) {
        console.error('❌ Error updating favorite activity:', error);
        return;
      }

      console.log('✅ Successfully updated favorite activity:', data);

      // Update local state
      setFavoriteActivities(prev => 
        prev.map(item => 
          item.id === matchingActivity.id 
            ? { ...item, pain_area: painArea, updated_at: new Date().toISOString() }
            : item
        )
      );
      
      // Refresh from database to ensure consistency
      await fetchFavoriteActivities();
    } catch (error) {
      console.error('❌ Error updating favorite activity:', error);
    }
  };

  const isActivityFavorite = (activityKey: string) => {
    return favoriteActivities.some(item => item.activity === activityKey);
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
    updateFavoriteActivity,
    isActivityFavorite,
    refreshFavoriteActivities: fetchFavoriteActivities,
  };
};