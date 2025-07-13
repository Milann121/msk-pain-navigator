import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, ArrowLeft, Play, RotateCcw } from "lucide-react";
import { StretchingProgram } from "@/types/stretchingProgram";
import { StretchingExercisesList } from "./StretchingExercisesList";
import { useProgramProgress } from "@/hooks/useProgramProgress";

interface StretchingProgramIntroProps {
  program: StretchingProgram;
}

export const StretchingProgramIntro: React.FC<StretchingProgramIntroProps> = ({ program }) => {
  const { t } = useTranslation();
  const { programId } = useParams<{ programId: string }>();
  const [showExercises, setShowExercises] = useState(false);
  const [isContinuing, setIsContinuing] = useState(false);
  
  const { progress, isLoading } = useProgramProgress({
    programId: programId || '',
    programType: 'stretching'
  });

  const handleStartProgram = () => {
    setIsContinuing(false);
    setShowExercises(true);
  };

  const handleContinueProgram = () => {
    setIsContinuing(true);
    setShowExercises(true);
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

                {/* Progress info */}
                {progress.hasProgress && progress.completionPercentage < 100 && (
                  <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Progress: {progress.completionPercentage}% complete
                      {progress.fullCompletions > 0 && (
                        <span className="ml-2 text-primary font-medium">
                          ({progress.fullCompletions}x completed)
                        </span>
                      )}
                    </p>
                  </div>
                )}

                {/* Buttons */}
                {progress.hasProgress && progress.completionPercentage < 100 ? (
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