
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface SingleChoiceQuestionProps {
  question: {
    options: string[];
  };
  value: string;
  onChange: (value: string) => void;
}

const SingleChoiceQuestion = ({ question, value, onChange }: SingleChoiceQuestionProps) => {
  return (
    <RadioGroup value={value} onValueChange={onChange}>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={option} id={`option-${index}`} />
            <Label htmlFor={`option-${index}`}>{option}</Label>
          </div>
        ))}
      </div>
    </RadioGroup>
  );
};

export { SingleChoiceQuestion };
