
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface MultipleChoiceQuestionProps {
  question: {
    options: string[];
  };
  value: string[];
  onChange: (option: string, checked: boolean) => void;
}

const MultipleChoiceQuestion = ({ question, value = [], onChange }: MultipleChoiceQuestionProps) => {
  return (
    <div className="space-y-3">
      {question.options.map((option, index) => {
        const isChecked = value?.includes(option);
        
        return (
          <div key={index} className="flex items-center space-x-2">
            <Checkbox 
              id={`option-${index}`} 
              checked={isChecked}
              onCheckedChange={(checked) => onChange(option, checked as boolean)}
            />
            <Label htmlFor={`option-${index}`}>{option}</Label>
          </div>
        );
      })}
    </div>
  );
};

export { MultipleChoiceQuestion };
