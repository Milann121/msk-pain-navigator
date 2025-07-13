import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, ArrowLeft, Play, RotateCcw } from "lucide-react";
import { StretchingProgram } from "@/types/stretchingProgram";
import { StretchingExercisesList } from "./StretchingExercisesList";
import { useProgramProgress } from "@/hooks/useProgramProgress";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { stretchingPrograms } from "@/data/stretchingPrograms";

interface StretchingProgramIntroProps {
  program: StretchingProgram;
}

export const StretchingProgramIntro: React.FC<StretchingProgramIntroProps> = ({ program }) => {
  const { t } = useTranslation();
  const { programId } = useParams<{ programId: string }>();
  const { user } = useAuth();
  const [showExercises, setShowExercises] = useState(false);
  const [isContinuing, setIsContinuing] = useState(false);
  
  const { progress, isLoading } = useProgramProgress({
    programId: programId || '',
    programType: 'stretching'
  });

  const handleStartProgram = async () => {
    // If user has completed full cycles, clear the current cycle's progress
    if (progress.fullCompletions > 0 && progress.completionPercentage === 0) {
      await clearCurrentCycleProgress();
    }
    setIsContinuing(false);
    setShowExercises(true);
  };

  const handleContinueProgram = () => {
    setIsContinuing(true);
    setShowExercises(true);
  };

  const clearCurrentCycleProgress = async () => {
    if (!user || !programId) return;
    
    try {
      const programTitle = progress.totalExercises > 0 ? 
        (stretchingPrograms[programId]?.title || '') : '';
      
      if (!programTitle) return;

      // Get all completions for this program
      const { data: allCompletions, error } = await supabase
        .from('secondary_programs')
        .select('*')
        .eq('user_id', user.id)
        .eq('secondary_program', 'stretching')
        .eq('program_type', programTitle)
        .order('created_at', { ascending: true });

      if (error) throw error;

      // If we have completions equal to full cycles * total exercises,
      // we don't need to clear anything (user is starting fresh)
      const expectedCompletions = progress.fullCompletions * progress.totalExercises;
      
      if (allCompletions && allCompletions.length > expectedCompletions) {
        // Remove excess completions (the partial progress from current incomplete cycle)
        const excessCompletions = allCompletions.slice(expectedCompletions);
        const idsToDelete = excessCompletions.map(c => c.id);
        
        if (idsToDelete.length > 0) {
          await supabase
            .from('secondary_programs')
            .delete()
            .in('id', idsToDelete);
        }
      }
    } catch (error) {
      console.error('Error clearing current cycle progress:', error);
    }
  };

  if (showExercises) {
    return (
      <StretchingExercisesList 
        program={program} 
        onBack={() => setShowExercises(false)}
        isContinuing={isContinuing}
        progress={progress}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
      <div className="flex-1 py-6 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Link 
              to="/stretching" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('common.back')}
            </Link>
          </div>

          {/* Program Card */}
          <Card className="overflow-hidden shadow-lg border-0">
            <CardContent className="p-0">
              {/* Image */}
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img 
                  src={program.image} 
                  alt={t(program.title)}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="p-6">
                {/* Title and Time */}
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold text-primary">
                    {t(program.title)}
                  </h1>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">{program.time}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {t(program.description)}
                </p>

                {/* List Description */}
                <div className="mb-8">
                  <h3 className="font-semibold text-foreground mb-3">
                    {t('stretchingPrograms.common.whatYouWillDo')}
                  </h3>
                  <ul className="space-y-2">
                    {program.listDescription.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">
                          {t(item)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Buttons */}
                {progress.hasProgress && progress.completionPercentage > 0 ? (
                  <div className="space-y-3">
                    <Button 
                      onClick={handleContinueProgram}
                      className="w-full h-12 text-base font-semibold"
                      size="lg"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      {t('stretchingPrograms.common.continue')}
                    </Button>
                    <Button 
                      onClick={handleStartProgram}
                      className="w-full h-12 text-base font-semibold"
                      size="lg"
                      variant="outline"
                    >
                      <RotateCcw className="w-5 h-5 mr-2" />
                      {t('stretchingPrograms.common.start')}
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={handleStartProgram}
                    className="w-full h-12 text-base font-semibold"
                    size="lg"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    {t('stretchingPrograms.common.start')}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};