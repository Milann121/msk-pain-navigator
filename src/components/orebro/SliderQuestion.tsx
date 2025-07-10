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
        <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
          <div className="flex-1 text-left">
            <span className="font-medium">0</span> = {t(minLabel)}
          </div>
          <div className="mx-4 px-3 py-1 bg-primary/10 rounded-md">
            <span className="text-primary font-bold text-base">{value || 0}</span>
          </div>
          <div className="flex-1 text-right">
            <span className="font-medium">10</span> = {t(maxLabel)}
          </div>
        </div>
      </div>
    </div>
  );
};