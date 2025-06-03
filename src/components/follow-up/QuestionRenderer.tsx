
import { FollowUpQuestion } from './types';
import SingleChoiceQuestion from './SingleChoiceQuestion';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import ScaleQuestion from './ScaleQuestion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

interface QuestionRendererProps {
  question: FollowUpQuestion;
  answer: any;
  onAnswerChange: (questionId: string, answer: any) => void;
  onSliderChange: (questionId: string, value: number) => void;
}

const QuestionRenderer = ({ question, answer, onAnswerChange, onSliderChange }: QuestionRendererProps) => {
  const handleSingleOptionChange = (value: string) => {
    onAnswerChange(question.id, value);
  };

  const handleMultipleOptionChange = (optionId: string, checked: boolean) => {
    const prevSelected = answer || [];
    const newSelected = checked 
      ? [...prevSelected, optionId] 
      : prevSelected.filter((id: string) => id !== optionId);
    
    onAnswerChange(question.id, newSelected);
  };

  const handleSliderChange = (value: number) => {
    onSliderChange(question.id, value);
  };

  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-start gap-2">
        <h3 className="text-lg font-medium text-blue-700 flex-1">{question.text}</h3>
        {question.description && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-auto text-gray-500 hover:text-blue-600"
                >
                  <Info className="h-4 w-4" />
                  <span className="sr-only">Vysvetliť otázku</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent 
                side="left" 
                className="max-w-xs bg-white border border-gray-200 shadow-lg z-50"
              >
                <div className="p-3">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {question.description}
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      
      {question.type === 'single' && (
        <SingleChoiceQuestion 
          question={question} 
          value={answer} 
          onChange={handleSingleOptionChange}
        />
      )}
      
      {question.type === 'multiple' && (
        <MultipleChoiceQuestion 
          question={question} 
          value={answer} 
          onChange={handleMultipleOptionChange}
        />
      )}
      
      {question.type === 'scale' && (
        <ScaleQuestion 
          question={question} 
          value={answer} 
          onChange={handleSliderChange}
        />
      )}
    </div>
  );
};

export default QuestionRenderer;
