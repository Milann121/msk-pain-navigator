
import { Slider } from '@/components/ui/slider';
import { FollowUpQuestion } from './types';

interface ScaleQuestionProps {
  question: FollowUpQuestion;
  value: number | undefined;
  onChange: (value: number) => void;
}

const ScaleQuestion = ({ question, value = 5, onChange }: ScaleQuestionProps) => {
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
      <div className="flex justify-between text-sm text-gray-500">
        <span>{question.scale.minLabel} ({question.scale.min})</span>
        <span>
          Vybrané: <span className="font-medium text-blue-600">{value}</span>
        </span>
        <span>{question.scale.maxLabel} ({question.scale.max})</span>
      </div>
    </div>
  );
};

export default ScaleQuestion;
