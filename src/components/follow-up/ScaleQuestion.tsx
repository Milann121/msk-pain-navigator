
import React from 'react';
import { Slider } from '@/components/ui/slider';

interface ScaleQuestionProps {
  question: {
    min: number;
    max: number;
    minLabel: string;
    maxLabel: string;
  };
  value: number;
  onChange: (value: number) => void;
}

const ScaleQuestion = ({ question, value, onChange }: ScaleQuestionProps) => {
  return (
    <div className="space-y-4">
      <Slider
        value={[value]}
        min={question.min}
        max={question.max}
        step={1}
        onValueChange={(values) => onChange(values[0])}
      />
      <div className="flex justify-between text-sm text-gray-500">
        <span>{question.minLabel} ({question.min})</span>
        <span>
          Vybratá hodnota: <span className="font-medium text-blue-600">{value}</span>
        </span>
        <span>{question.maxLabel} ({question.max})</span>
      </div>
    </div>
  );
};

export { ScaleQuestion };
