import { useTranslation } from 'react-i18next';
import { Slider } from '@/components/ui/slider';
import { OrebroAnswers } from '@/types/orebro';

interface SliderQuestionProps {
  field: keyof OrebroAnswers;
  questionKey: string;
  minLabel: string;
  maxLabel: string;
  answers: Partial<OrebroAnswers>;
  onAnswer: (field: keyof OrebroAnswers, value: number[]) => void;
}

export const SliderQuestion = ({ field, questionKey, minLabel, maxLabel, answers, onAnswer }: SliderQuestionProps) => {
  const { t } = useTranslation();
  const value = answers[field] as number;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{t(questionKey)}</h3>
      <div className="space-y-4">
        <Slider
          value={[value || 0]}
          onValueChange={(value) => onAnswer(field, value)}
          max={10}
          min={0}
          step={1}
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>0 = {t(minLabel)}</span>
          <span className="text-primary font-medium">{value || 0}</span>
          <span>10 = {t(maxLabel)}</span>
        </div>
      </div>
    </div>
  );
};