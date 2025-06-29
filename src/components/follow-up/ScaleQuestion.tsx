
import { Slider } from '@/components/ui/slider';
import { FollowUpQuestion } from './types';
import { useTranslation } from 'react-i18next';

interface ScaleQuestionProps {
  question: FollowUpQuestion;
  value: number | undefined;
  onChange: (value: number) => void;
}

const ScaleQuestion = ({ question, value = 5, onChange }: ScaleQuestionProps) => {
  const { t } = useTranslation();
  
  if (!question.scale) return null;
  
  return (
    <div className="space-y-4">
      <Slider
        defaultValue={[5]}
        max={question.scale.max}
        min={question.scale.min}
        step={1}
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
      />
      <div className="flex justify-between items-start text-sm text-gray-500 gap-4">
        <div className="text-left flex-1">
          <span className="block">
            {question.scale.minLabel.startsWith('questionnaire.')
              ? t(question.scale.minLabel)
              : question.scale.minLabel}
          </span>
          <span className="text-xs">({question.scale.min})</span>
        </div>
        <div className="text-center flex-shrink-0 px-3 py-1 bg-blue-50 rounded-md">
          <span className="text-blue-600 font-medium">{value}</span>
        </div>
        <div className="text-right flex-1">
          <span className="block">
            {question.scale.maxLabel.startsWith('questionnaire.')
              ? t(question.scale.maxLabel)
              : question.scale.maxLabel}
          </span>
          <span className="text-xs">({question.scale.max})</span>
        </div>
      </div>
    </div>
  );
};

export default ScaleQuestion;
