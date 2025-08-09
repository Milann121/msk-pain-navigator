
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

  // Refactored to robustly persist pain_area selected in Step 2
  const updateFavoriteActivity = async (activityKey: string, painArea: string) => {
    if (!user) {
      console.error('❌ No user found when trying to update favorite activity');
      return;
    }

    try {
      console.log('🔄 Updating favorite activity pain_area:', { activityKey, painArea, userId: user.id });

      // 1) Try to update by user_id + activity (no pre-fetch)
      const { data: updatedRows, error: updateError } = await supabase
        .from('favorite_activities')
        .update({ 
          pain_area: painArea, 
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .eq('activity', activityKey)
        .select();

      if (updateError) {
        console.error('❌ Error updating favorite activity:', updateError);
        return;
      }

      if (updatedRows && updatedRows.length > 0) {
        console.log('✅ Updated existing favorite activity rows:', updatedRows.map(r => r.id));

        // Update local state for any matching ids
        setFavoriteActivities(prev => 
          prev.map(item => {
            const match = updatedRows.find(u => u.id === item.id);
            return match 
              ? { ...item, pain_area: match.pain_area, updated_at: match.updated_at }
              : item;
          })
        );

        // Refresh from DB to ensure consistency
        await fetchFavoriteActivities();
        return;
      }

      console.log('ℹ️ No existing rows updated; inserting a new favorite activity with pain_area');

      // 2) If no rows updated, insert a new row with the given pain area
      const { data: inserted, error: insertError } = await supabase
        .from('favorite_activities')
        .insert({
          user_id: user.id,
          activity: activityKey,
          pain_area: painArea
        })
        .select()
        .single();

      if (insertError) {
        console.error('❌ Error inserting favorite activity (fallback):', insertError);
        return;
      }

      console.log('✅ Inserted new favorite activity with pain_area:', inserted);
      setFavoriteActivities(prev => [inserted, ...prev]);

      // Final sync
      await fetchFavoriteActivities();
    } catch (error) {
      console.error('❌ Error in updateFavoriteActivity:', error);
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
