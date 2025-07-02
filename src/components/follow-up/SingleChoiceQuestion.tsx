
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { FollowUpQuestion } from './types';
import { useTranslation } from 'react-i18next';

interface SingleChoiceQuestionProps {
  question: FollowUpQuestion;
  value: string | undefined;
  onChange: (value: string) => void;
}

const SingleChoiceQuestion = ({ question, value, onChange }: SingleChoiceQuestionProps) => {
  const { t } = useTranslation();
  
  if (!question.options) return null;

  return (
    <RadioGroup 
      value={value || ""}
      onValueChange={onChange}
    >
      <div className="space-y-3">
        {question.options.map(option => (
          <div key={option.id} className="flex items-center space-x-2">
            <RadioGroupItem value={option.id} id={option.id} />
            <Label htmlFor={option.id} className="cursor-pointer">
              {option.text.startsWith('questionnaire.') ? t(option.text) : option.text}
            </Label>
          </div>
        ))}
      </div>
    </RadioGroup>
  );
};

export default SingleChoiceQuestion;
