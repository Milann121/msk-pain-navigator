import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { FavoriteActivity } from '@/hooks/useFavoriteActivities';
import { BodyAreaAnalysis } from '@/utils/psfs-helpers';
import { Activity, ChevronRight, Target } from 'lucide-react';

interface PsfsAssessmentLauncherProps {
  favoriteActivities: FavoriteActivity[];
  bodyAreaAnalysis: BodyAreaAnalysis;
  onLaunchAssessment: () => void;
  onGoBack: () => void;
  isLoading?: boolean;
}

export const PsfsAssessmentLauncher: React.FC<PsfsAssessmentLauncherProps> = ({
  favoriteActivities,
  bodyAreaAnalysis,
  onLaunchAssessment,
  onGoBack,
  isLoading = false
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Target className="h-6 w-6 text-primary" />
          <h3 className="text-xl font-semibold">
            {t('myExercises.favoriteActivities.step3.title')}
          </h3>
        </div>
        <p className="text-muted-foreground">
          {t('myExercises.favoriteActivities.step3.description')}
        </p>
      </div>

      {/* Analysis Summary */}
      <Card>
        <CardContent className="p-6">
          <h4 className="font-medium mb-4 flex items-center gap-2">
            <Activity className="h-4 w-4" />
            {t('myExercises.favoriteActivities.step3.analysisTitle')}
          </h4>
          
          {/* Selected Activities */}
          <div className="space-y-3 mb-6">
            <p className="text-sm font-medium text-muted-foreground">
              {t('myExercises.favoriteActivities.step3.selectedActivities')}:
            </p>
            <div className="flex flex-wrap gap-2">
              {favoriteActivities.map((activity) => (
                <Badge key={activity.id} variant="secondary" className="flex items-center gap-1">
                  {t(`myExercises.favoriteActivities.activities.${activity.activity}`)}
                  <ChevronRight className="h-3 w-3" />
                  {t(`bodyParts.${activity.pain_area}`)}
                </Badge>
              ))}
            </div>
          </div>

          {/* Body Area Analysis */}
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                {t('myExercises.favoriteActivities.step3.targetArea')}:
              </span>
              <Badge variant="default">
                {bodyAreaAnalysis.selectedBodyArea === 'spine' 
                  ? t('bodyParts.spine')
                  : t(`bodyParts.${bodyAreaAnalysis.selectedBodyArea}`)
                }
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {bodyAreaAnalysis.reasoning}
            </p>
          </div>

          {/* Questionnaire Info */}
          <div className="mt-4 p-3 bg-primary/5 rounded-lg border-l-4 border-primary">
            <p className="text-sm">
              <span className="font-medium">
                {t('myExercises.favoriteActivities.step3.questionnaire')}:
              </span>{' '}
              {t(`myExercises.favoriteActivities.step3.${bodyAreaAnalysis.questionnaire}Questionnaire`)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <Button 
          variant="outline" 
          onClick={onGoBack}
          disabled={isLoading}
        >
          {t('myExercises.favoriteActivities.previous')}
        </Button>
        <Button 
          onClick={onLaunchAssessment}
          disabled={isLoading}
          className="px-8"
        >
          {isLoading 
            ? t('myExercises.favoriteActivities.step3.launching')
            : t('myExercises.favoriteActivities.step3.startAssessment')
          }
        </Button>
      </div>
    </div>
  );
};