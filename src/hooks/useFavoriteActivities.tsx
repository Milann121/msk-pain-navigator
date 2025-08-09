
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

  // Persist pain_area selected in Step 2 (robust: updates by id when available)
  const updateFavoriteActivity = async (activityKey: string, painArea: string, id?: string) => {
    if (!user) {
      console.error('❌ No user found when trying to update favorite activity');
      return;
    }

    try {
      console.log('🔄 Updating favorite activity pain_area:', { activityKey, painArea, id, userId: user.id });

      // Prefer updating by explicit row id if provided (most reliable)
      if (id) {
        const { data: updatedById, error: updateByIdError } = await supabase
          .from('favorite_activities')
          .update({ pain_area: painArea, updated_at: new Date().toISOString() })
          .eq('id', id)
          .eq('user_id', user.id)
          .select();

        if (updateByIdError) {
          console.error('❌ Error updating favorite activity by id:', updateByIdError);
          return;
        }

        if (updatedById && updatedById.length > 0) {
          setFavoriteActivities(prev =>
            prev.map(item => (item.id === id ? { ...item, pain_area: painArea, updated_at: updatedById[0].updated_at } : item))
          );
          await fetchFavoriteActivities();
          return;
        }
        // If for some reason no row matched by id, fall through to activity-based update
      }

      // 1) Try to update by user_id + activity (backward compatibility)
      const { data: updatedRows, error: updateError } = await supabase
        .from('favorite_activities')
        .update({ pain_area: painArea, updated_at: new Date().toISOString() })
        .eq('user_id', user.id)
        .eq('activity', activityKey)
        .select();

      if (updateError) {
        console.error('❌ Error updating favorite activity:', updateError);
        return;
      }

      if (updatedRows && updatedRows.length > 0) {
        setFavoriteActivities(prev =>
          prev.map(item => {
            const match = updatedRows.find(u => u.id === item.id);
            return match ? { ...item, pain_area: match.pain_area, updated_at: match.updated_at } : item;
          })
        );
        await fetchFavoriteActivities();
        return;
      }

      // 2) If no rows updated, insert a new row with the given pain area
      const { data: inserted, error: insertError } = await supabase
        .from('favorite_activities')
        .insert({ user_id: user.id, activity: activityKey, pain_area: painArea })
        .select()
        .single();

      if (insertError) {
        console.error('❌ Error inserting favorite activity (fallback):', insertError);
        return;
      }

      setFavoriteActivities(prev => [inserted, ...prev]);
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
