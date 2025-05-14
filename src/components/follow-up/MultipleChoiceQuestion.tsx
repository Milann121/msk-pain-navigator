
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { FollowUpQuestion } from './types';

interface MultipleChoiceQuestionProps {
  question: FollowUpQuestion;
  value: string[] | undefined;
  onChange: (optionId: string, checked: boolean) => void;
}

const MultipleChoiceQuestion = ({ question, value = [], onChange }: MultipleChoiceQuestionProps) => {
  if (!question.options) return null;

  return (
    <div className="space-y-3">
      {question.options.map(option => (
        <div key={option.id} className="flex items-center space-x-2">
          <Checkbox 
            id={option.id}
            checked={value.includes(option.id)}
            onCheckedChange={(checked) => 
              onChange(option.id, checked as boolean)
            }
          />
          <Label htmlFor={option.id} className="cursor-pointer">{option.text}</Label>
        </div>
      ))}
    </div>
  );
};

export default MultipleChoiceQuestion;
