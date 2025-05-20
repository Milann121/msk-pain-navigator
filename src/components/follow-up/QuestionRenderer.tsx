
import React from 'react';
import { SingleChoiceQuestion } from './SingleChoiceQuestion';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import { ScaleQuestion } from './ScaleQuestion';

// Define the types for the questions
interface QuestionBase {
  id: string;
  text: string;
  type: string;
}

interface ScaleQuestionType extends QuestionBase {
  type: 'scale';
  min: number;
  max: number;
  minLabel: string;
  maxLabel: string;
}

interface ChoiceQuestionType extends QuestionBase {
  type: 'single-choice' | 'multiple-choice';
  options: string[];
}

export type FollowUpQuestionType = ScaleQuestionType | ChoiceQuestionType;

interface QuestionRendererProps {
  question: FollowUpQuestionType;
  response: any;
  onAnswerChange: (answer: any) => void;
  onPainLevelChange: (value: number) => void;
  currentPainLevel: number;
}

const QuestionRenderer = ({ 
  question, 
  response, 
  onAnswerChange, 
  onPainLevelChange,
  currentPainLevel 
}: QuestionRendererProps) => {
  
  return (
    <div className="space-y-6 pt-4">
      <h3 className="text-lg font-medium text-blue-700">{question.text}</h3>
      
      {question.type === 'single-choice' && (
        <SingleChoiceQuestion 
          question={question as ChoiceQuestionType}
          value={response} 
          onChange={onAnswerChange}
        />
      )}
      
      {question.type === 'multiple-choice' && (
        <MultipleChoiceQuestion 
          question={question as ChoiceQuestionType}
          value={response} 
          onChange={onAnswerChange}
        />
      )}
      
      {question.type === 'scale' && (
        <ScaleQuestion 
          question={question as ScaleQuestionType}
          value={currentPainLevel} 
          onChange={onPainLevelChange}
        />
      )}
    </div>
  );
};

export default QuestionRenderer;
