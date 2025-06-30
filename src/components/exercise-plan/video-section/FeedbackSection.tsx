
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ExerciseGoodToggle } from '../ExerciseGoodToggle';

interface FeedbackSectionProps {
  feedbackValue: "good" | "neutral" | "not-good";
  onToggleChange: (value: "good" | "neutral" | "not-good") => void;
}

export const FeedbackSection = ({ feedbackValue, onToggleChange }: FeedbackSectionProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-2">
      <span className="text-base font-medium text-gray-900 block">
        {t('exercisePlan.suitableQuestion')}
      </span>
      <div className="flex justify-start">
        <ExerciseGoodToggle
          value={feedbackValue}
          onChange={onToggleChange}
        />
      </div>
    </div>
  );
};
