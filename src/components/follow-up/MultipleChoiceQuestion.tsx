
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { FollowUpQuestion } from './types';
import { useTranslation } from 'react-i18next';

interface MultipleChoiceQuestionProps {
  question: FollowUpQuestion;
  value: string[] | undefined;
  onChange: (optionId: string, checked: boolean) => void;
}

const MultipleChoiceQuestion = ({ question, value = [], onChange }: MultipleChoiceQuestionProps) => {
  const { t } = useTranslation();
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
          <Label htmlFor={option.id} className="cursor-pointer">
            {option.text.startsWith('questionnaire.') ? t(option.text) : option.text}
          </Label>
        </div>
      ))}
    </div>
  );
};

export default MultipleChoiceQuestion;
