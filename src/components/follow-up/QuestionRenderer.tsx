
import { FollowUpQuestion } from './types';
import SingleChoiceQuestion from './SingleChoiceQuestion';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import ScaleQuestion from './ScaleQuestion';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface QuestionRendererProps {
  question: FollowUpQuestion;
  answer: any;
  onAnswerChange: (questionId: string, answer: any) => void;
  onSliderChange: (questionId: string, value: number) => void;
}

const QuestionRenderer = ({ question, answer, onAnswerChange, onSliderChange }: QuestionRendererProps) => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();

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
      <div className="flex items-start gap-3">
        <h3 className="text-lg font-medium text-blue-700 flex-1">
          {question.text.startsWith('questionnaire.') ? t(question.text) : question.text}
        </h3>
        {question.description && (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 h-auto text-gray-500 hover:text-blue-600 hover:bg-blue-50 flex-shrink-0"
                title={t('questionnaire.common.explainQuestion')}
              >
                <Info className="h-4 w-4" />
                <span className="sr-only">{t('questionnaire.common.explainQuestion')}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent 
              side={isMobile ? "bottom" : "left"} 
              className={cn(
                "bg-white border border-gray-200 shadow-lg z-50",
                isMobile ? "w-[calc(100vw-2rem)] max-w-sm mx-4" : "w-80"
              )}
              align={isMobile ? "center" : "start"}
              sideOffset={isMobile ? 8 : 4}
            >
              <div className="p-3">
                <h4 className="font-medium text-blue-700 mb-2">{t('questionnaire.common.questionExplanation')}</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {question.description.startsWith('questionnaire.') ? t(question.description) : question.description}
                </p>
              </div>
            </PopoverContent>
          </Popover>
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
