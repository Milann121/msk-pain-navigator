import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { StrengthProgram } from "@/types/strengthProgram";
import { StrengthExercisesList } from "./StrengthExercisesList";

interface StrengthProgramIntroProps {
  program: StrengthProgram;
}

export const StrengthProgramIntro: React.FC<StrengthProgramIntroProps> = ({ program }) => {
  const { t } = useTranslation();
  const [showExercises, setShowExercises] = useState(false);

  if (showExercises) {
    return (
      <StrengthExercisesList 
        program={program} 
        onBack={() => setShowExercises(false)} 
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
              to="/strength" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('common.back')}
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
                  {t('strengthPrograms.common.whatYouWillDo')}
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
                    {t('strengthPrograms.common.focusAreas')}
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
                    {t('strengthPrograms.common.avoidIf')}
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

              {/* Start Button */}
              <Button 
                onClick={() => setShowExercises(true)}
                className="w-full"
                size="lg"
              >
                {t('strengthPrograms.common.start')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};