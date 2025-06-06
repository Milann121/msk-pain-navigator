
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Exercise } from '@/types/exercise';
import { generateGeneralProgram } from '@/utils/generalProgramGenerator';
import { Button } from '@/components/ui/button';
import { PlayCircle, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const GeneralProgram = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [generalProgram, setGeneralProgram] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadGeneralProgram();
    }
  }, [user]);

  const loadGeneralProgram = async () => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      // Fetch user's assessments
      const { data: assessments, error } = await supabase
        .from('user_assessments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (assessments && assessments.length > 1) {
        // Generate general program using the utility
        const program = generateGeneralProgram(
          assessments[0].primary_mechanism,
          assessments[0].pain_area,
          assessments
        );
        setGeneralProgram(program);
      }
    } catch (error) {
      console.error('Error loading general program:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewProgram = () => {
    navigate('/my-exercises');
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-blue-600">Načítava sa...</div>
      </div>
    );
  }

  // Don't show if no general program exists (less than 2 assessments)
  if (generalProgram.length === 0) {
    return null;
  }

  const program = generalProgram[0];
  const exerciseCount = program.videos.length;

  return (
    <div className="h-full flex flex-col justify-between p-4">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <PlayCircle className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-blue-800">Všeobecný program</h3>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {program.description}
        </p>
        
        <div className="text-sm text-blue-600 mb-4">
          {exerciseCount} cvičení z vašich programov
        </div>
      </div>
      
      <Button 
        onClick={handleViewProgram}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
      >
        Zobraziť program
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
};
