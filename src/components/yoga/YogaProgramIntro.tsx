import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { YogaProgram } from "@/types/yogaProgram";
import { YogaExercisesList } from "./YogaExercisesList";
import { useProgramProgress } from "@/hooks/useProgramProgress";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { yogaPrograms } from "@/data/yogaPrograms";

interface YogaProgramIntroProps {
  program: YogaProgram;
}

export const YogaProgramIntro: React.FC<YogaProgramIntroProps> = ({ program }) => {
  const { t } = useTranslation();
  const { programId } = useParams<{ programId: string }>();
  const { user } = useAuth();
  const [showExercises, setShowExercises] = useState(false);
  const [isContinuing, setIsContinuing] = useState(false);
  
  const { progress, isLoading } = useProgramProgress({
    programId: programId || '',
    programType: 'yoga'
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
        (yogaPrograms[programId]?.title || '') : '';
      
      if (!programTitle) return;

      // Get all completions for this program
      const { data: allCompletions, error } = await supabase
        .from('secondary_programs')
        .select('*')
        .eq('user_id', user.id)
        .eq('secondary_program', 'yoga')
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
      <YogaExercisesList 
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
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-primary">
              {t(program.title)}
            </h1>
            <Link 
              to="/yoga" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('back')}
            </Link>
          </div>

          {/* Program Content */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Image */}
            <div className="space-y-6">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img 
                  src={program.image} 
                  alt={t(program.title)}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  {t('yogaPrograms.common.whatYouWillDo')}
                </h2>
                <ul className="space-y-2">
                  {program.listDescription.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{t(item)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Focus Areas */}
              {program.focus_bodyPart.length > 0 && (
                <div>
                  <h3 className="font-medium text-foreground mb-3">
                    {t('yogaPrograms.common.focusAreas')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {program.focus_bodyPart.map((part, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                      >
                        {t(`bodyParts.${part}`)}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Avoid If */}
              {program.avoid_differentials.length > 0 && (
                <div>
                  <h3 className="font-medium text-destructive mb-3">
                    {t('yogaPrograms.common.avoidIf')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {program.avoid_differentials.map((differential, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-destructive/10 text-destructive text-sm rounded-full"
                      >
                        {t(`differentials.${differential}`)}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Continue/Start Buttons */}
              {!isLoading && progress.hasProgress && progress.completionPercentage > 0 ? (
                <div className="space-y-3">
                  <Button 
                    onClick={handleContinueProgram}
                    className="w-full"
                    size="lg"
                  >
                    {t('yogaPrograms.common.continue')}
                  </Button>
                  <Button 
                    onClick={handleStartProgram}
                    variant="outline" 
                    className="w-full"
                    size="lg"
                  >
                    {t('yogaPrograms.common.start')}
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={handleStartProgram}
                  className="w-full"
                  size="lg"
                >
                  {t('yogaPrograms.common.start')}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};