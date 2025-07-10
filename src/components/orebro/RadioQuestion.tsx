import { useTranslation } from 'react-i18next';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { OrebroAnswers } from '@/types/orebro';

interface RadioQuestionProps {
  field: keyof OrebroAnswers;
  questionKey: string;
  options: Array<{ value: string; labelKey: string }>;
  answers: Partial<OrebroAnswers>;
  onAnswer: (field: keyof OrebroAnswers, value: string) => void;
}

export const RadioQuestion = ({ field, questionKey, options, answers, onAnswer }: RadioQuestionProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{t(questionKey)}</h3>
      <RadioGroup 
        value={answers[field] as string || ""} 
        onValueChange={(value) => onAnswer(field, value)}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={option.value} />
            <Label htmlFor={option.value}>{t(option.labelKey)}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};