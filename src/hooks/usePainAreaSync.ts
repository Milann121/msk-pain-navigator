
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export const usePainAreaSync = () => {
  const { user } = useAuth();

  const syncPainAreas = async () => {
    if (!user) return;

    console.log('🔄 Starting pain area sync for user:', user.id);

    try {
      // Get all active assessments for the user
      const { data: assessments, error: assessmentsError } = await supabase
        .from('user_assessments')
        .select('id, pain_area, program_ended_at')
        .eq('user_id', user.id)
        .is('program_ended_at', null); // Only active programs

      if (assessmentsError) {
        console.error('❌ Error fetching assessments for pain area sync:', assessmentsError);
        return;
      }

      console.log('📋 Found assessments:', assessments);

      // Extract unique pain areas from active assessments
      let painAreas: string[] = [];
      if (assessments && assessments.length > 0) {
        painAreas = [...new Set(assessments.map(a => a.pain_area))];
      }

      console.log('🎯 Extracted pain areas:', painAreas);

      // Update user profile with current pain areas
      const { error: updateError } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          email: user.email,
          pain_area: painAreas.join(', ') || null
        }, { onConflict: 'user_id' });

      if (updateError) {
        console.error('❌ Error updating pain areas in profile:', updateError);
      } else {
        console.log('✅ Pain areas synced in profile:', painAreas);
      }

      // Also create/update MSK profile record
      if (painAreas.length > 0) {
        // Get B2B employee data if exists
        const { data: b2bEmployee } = await supabase
          .from('b2b_employees')
          .select('id')
          .eq('email', user.email)
          .maybeSingle();

        const { data: testEmployee } = !b2bEmployee
          ? await supabase
              .from('test_2_employees' as any)
              .select('id')
              .eq('email', user.email)
              .maybeSingle()
          : { data: null };

        console.log('👤 B2B employee data:', b2bEmployee || testEmployee);

        const { error: mskError } = await supabase
          .from('msk_profiles')
          .upsert({
            b2b_eployee_id: b2bEmployee?.id || testEmployee?.id || null,
            pain_areas: painAreas,
          }, { onConflict: 'b2b_eployee_id' });

        if (mskError) {
          console.error('❌ Error updating MSK profile:', mskError);
        } else {
          console.log('✅ MSK profile updated with pain areas:', painAreas);
        }
      } else {
        console.log('ℹ️ No pain areas found, skipping MSK profile update');
      }

    } catch (error) {
      console.error('❌ Error syncing pain areas:', error);
    }
  };

  useEffect(() => {
    if (user) {
      syncPainAreas();
    }
  }, [user]);

  return { syncPainAreas };
};
