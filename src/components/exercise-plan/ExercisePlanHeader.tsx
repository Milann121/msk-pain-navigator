
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PainMechanism } from '@/utils/types';
import { useTranslation } from 'react-i18next';
import { getMechanismLabel, formatDifferential, formatPainArea } from '@/utils/formatHelpers';

interface ExercisePlanHeaderProps {
  showGeneral: boolean;
  differential: string;
  painArea: string;
  mechanism: PainMechanism;
}

export const ExercisePlanHeader = ({ 
  showGeneral, 
  differential, 
  painArea, 
  mechanism 
}: ExercisePlanHeaderProps) => {
  const { t } = useTranslation();

  return (
    <CardHeader>
      <CardTitle>
        {showGeneral ? t('exercisePlanPage.generalTitle') : t('exercisePlanPage.title')}
      </CardTitle>
      <CardDescription>
        {showGeneral 
          ? t('exercisePlanPage.generalDescription')
          : t('exercisePlanPage.specificDescription', { 
              diagnosis: formatDifferential(differential, t), 
              painArea: formatPainArea(painArea, t) 
            })
        }
      </CardDescription>
      {!showGeneral && (
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {getMechanismLabel(mechanism as PainMechanism, t)}
          </span>
          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {formatDifferential(differential, t)}
          </span>
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {formatPainArea(painArea, t)}
          </span>
        </div>
      )}
    </CardHeader>
  );
};
