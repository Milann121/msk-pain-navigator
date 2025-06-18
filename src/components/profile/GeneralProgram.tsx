
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Exercise } from '@/types/exercise';
import { generateGeneralProgram, detectQuickChanges } from '@/utils/generalProgramGenerator';
import { Button } from '@/components/ui/button';
import { PlayCircle, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GeneralProgramBanner } from './GeneralProgramBanner';

export const GeneralProgram = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [generalProgram, setGeneralProgram] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [assessmentCount, setAssessmentCount] = useState(0);
  const [activeAssessmentCount, setActiveAssessmentCount] = useState(0);
  const [showQuickChangesBanner, setShowQuickChangesBanner] = useState(false);

  useEffect(() => {
    if (user) {
      loadGeneralProgram();
    }
  }, [user]);

  const loadGeneralProgram = async () => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      console.log('Loading general program for user:', user.id);
      
      // Fetch user's assessments
      const { data: assessments, error } = await supabase
        .from('user_assessments')
        .select('*')
        .eq('user_id', user.id)
        .order('timestamp', { ascending: false });

      if (error) throw error;

      console.log('Found assessments:', assessments?.length || 0, assessments);
      setAssessmentCount(assessments?.length || 0);
      
      // Filter active assessments (not ended)
      const activeAssessments = assessments?.filter(a => !a.program_ended_at) || [];
      setActiveAssessmentCount(activeAssessments.length);
      
      // Detect quick changes - check all assessments, not just active ones
      const hasQuickChanges = detectQuickChanges(assessments || []);
      console.log('Quick changes detected:', hasQuickChanges);
      setShowQuickChangesBanner(hasQuickChanges);

      if (activeAssessments.length > 1) {
        // Generate general program using the utility with active assessments only
        const program = generateGeneralProgram(
          activeAssessments[0].primary_mechanism,
          activeAssessments[0].pain_area,
          activeAssessments
        );
        console.log('Generated general program:', program);
        setGeneralProgram(program);
      } else {
        console.log('Not enough active assessments for general program:', activeAssessments.length);
        setGeneralProgram([]);
      }
    } catch (error) {
      console.error('Error loading general program:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewProgram = () => {
    // Navigate to the general program
    navigate('/exercise-plan', { 
      state: { 
        showGeneral: true,
        mechanism: 'general',
        differential: 'general',
        painArea: 'general'
      } 
    });
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-blue-600">Načítava sa...</div>
      </div>
    );
  }

  // Show banner and content based on conditions
  const shouldShowBanner = showQuickChangesBanner || (activeAssessmentCount >= 2 && generalProgram.length === 0);

  // Show debug info if no general program exists
  if (generalProgram.length === 0) {
    return (
      <div className="h-full flex flex-col justify-center items-center p-4 text-center">
        <GeneralProgramBanner showBanner={shouldShowBanner} />
        <PlayCircle className="h-8 w-8 text-gray-400 mb-2" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">Všeobecný program</h3>
        <p className="text-sm text-gray-500 mb-2">
          {activeAssessmentCount < 2 
            ? `Potrebujete aspoň 2 aktívne programy (máte ${activeAssessmentCount})`
            : 'Program sa generuje...'
          }
        </p>
        <p className="text-xs text-gray-400">
          Vyplňte viac dotazníkov bolesti pre vytvorenie personalizovaného programu
        </p>
      </div>
    );
  }

  const program = generalProgram[0];
  const exerciseCount = program.videos.length;

  return (
    <div className="h-full flex flex-col justify-between p-4">
      <GeneralProgramBanner showBanner={shouldShowBanner} />
      <div>
        <div className="flex items-center gap-2 mb-3">
          <PlayCircle className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-blue-800">Všeobecný program</h3>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          Nemáš čas na jednotlivé cvičebné programy? Tu nájdeš personalizovaný program s najdôležitejšími cvičeniami z tvojich aktívnych programov.
        </p>
        
        <div className="text-sm text-blue-600 mb-4">
          {exerciseCount} cvičení z vašich aktívnych programov
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
