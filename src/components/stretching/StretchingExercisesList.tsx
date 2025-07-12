import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { StretchingProgram } from "@/types/stretchingProgram";
import ExerciseVideo from "@/components/ExerciseVideo";

interface StretchingExercisesListProps {
  program: StretchingProgram;
  onBack: () => void;
}

export const StretchingExercisesList: React.FC<StretchingExercisesListProps> = ({ 
  program, 
  onBack 
}) => {
  const { t } = useTranslation();

  return (
    <div 
      className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20 animate-slide-in-right"
    >
      <div className="flex-1 py-6 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-semibold text-primary">
              {t(program.title)}
            </h1>
            <Button
              variant="ghost"
              onClick={onBack}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors p-0"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('common.back')}
            </Button>
          </div>

          {/* Exercises List */}
          <div className="space-y-6">
            {program.exercises.map((exercise, index) => (
              <Card key={index} className="overflow-hidden shadow-sm border-0">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Video Section */}
                    <div className="space-y-4">
                      <ExerciseVideo
                        videoId={exercise.video.videoId}
                        title={exercise.video.title}
                        description={exercise.video.description}
                        exerciseTitle={exercise.title}
                      />
                    </div>

                    {/* Exercise Details */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {t(exercise.title)}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {t(exercise.description)}
                        </p>
                      </div>

                      {/* Focus Body Parts */}
                      {exercise.focus_bodyPart.length > 0 && (
                        <div>
                          <h4 className="font-medium text-foreground text-sm mb-2">
                            {t('stretchingPrograms.common.focusAreas')}
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {exercise.focus_bodyPart.map((part, partIndex) => (
                              <span
                                key={partIndex}
                                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                              >
                                {t(`bodyParts.${part}`)}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Avoid Differentials */}
                      {exercise.avoid_differentials.length > 0 && (
                        <div>
                          <h4 className="font-medium text-destructive text-sm mb-2">
                            {t('stretchingPrograms.common.avoidIf')}
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {exercise.avoid_differentials.map((differential, diffIndex) => (
                              <span
                                key={diffIndex}
                                className="px-2 py-1 bg-destructive/10 text-destructive text-xs rounded-full"
                              >
                                {t(`differentials.${differential}`)}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};