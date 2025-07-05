import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface ProgramTrackingStats {
  user_id: string;
  b2b_employee_id: string | null;
  active_programs: number;
  ended_programs: number;
  deleted_programs: number;
  total_programs: number;
}

interface ProgramTrackingRecord {
  id: string;
  user_id: string;
  b2b_employee_id: string | null;
  assessment_id: string;
  program_status: 'active' | 'ended' | 'deleted';
  pain_area: string;
  primary_differential: string;
  primary_mechanism: string;
  sin_group: string;
  initial_pain_level: number | null;
  program_started_at: string;
  program_ended_at: string | null;
  program_deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export const useProgramTracking = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<ProgramTrackingStats | null>(null);
  const [records, setRecords] = useState<ProgramTrackingRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get program statistics for current user
  const fetchUserStats = async (userId?: string) => {
    if (!user && !userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.rpc('get_user_program_stats', {
        target_user_id: userId || user!.id
      });

      if (error) throw error;
      
      if (data && data.length > 0) {
        setStats(data[0]);
      } else {
        setStats({
          user_id: userId || user!.id,
          b2b_employee_id: null,
          active_programs: 0,
          ended_programs: 0,
          deleted_programs: 0,
          total_programs: 0
        });
      }
    } catch (err) {
      console.error('Error fetching program stats:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch program stats');
    } finally {
      setLoading(false);
    }
  };

  // Get all program tracking records for current user
  const fetchUserRecords = async (userId?: string) => {
    if (!user && !userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('user_program_tracking')
        .select('*')
        .eq('user_id', userId || user!.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setRecords(data || []);
    } catch (err) {
      console.error('Error fetching program records:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch program records');
    } finally {
      setLoading(false);
    }
  };

  // Get all statistics (for HR managers)
  const fetchAllStats = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.rpc('get_user_program_stats');

      if (error) throw error;
      
      return data || [];
    } catch (err) {
      console.error('Error fetching all stats:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch all stats');
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Get program records by status
  const getRecordsByStatus = (status: 'active' | 'ended' | 'deleted') => {
    return records.filter(record => record.program_status === status);
  };

  // Auto-fetch user stats when user changes
  useEffect(() => {
    if (user) {
      fetchUserStats();
    }
  }, [user]);

  return {
    stats,
    records,
    loading,
    error,
    fetchUserStats,
    fetchUserRecords,
    fetchAllStats,
    getRecordsByStatus,
    activePrograms: records.filter(r => r.program_status === 'active'),
    endedPrograms: records.filter(r => r.program_status === 'ended'),
    deletedPrograms: records.filter(r => r.program_status === 'deleted'),
  };
};