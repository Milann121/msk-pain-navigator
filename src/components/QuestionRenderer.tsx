
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Question } from '@/utils/types';
import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTranslation } from 'react-i18next';

interface QuestionRendererProps {
  question: Question;
  onAnswer: (questionId: string, answer: any) => void;
}

const QuestionRenderer = ({ question, onAnswer }: QuestionRendererProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [followUpVisible, setFollowUpVisible] = useState<string | null>(null);
  const [sliderValue, setSliderValue] = useState<number[]>([0]);
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  const handleSingleOptionChange = (optionId: string) => {
    setSelectedOptions([optionId]);
    onAnswer(question.id, optionId);
    
    // Check if this option has follow-up questions
    const selectedOption = question.options?.find(opt => opt.id === optionId);
    if (selectedOption?.followUp?.length) {
      setFollowUpVisible(optionId);
    } else {
      setFollowUpVisible(null);
    }
  };

  const handleMultipleOptionChange = (optionId: string, checked: boolean) => {
    const newSelectedOptions = checked
      ? [...selectedOptions, optionId]
      : selectedOptions.filter(id => id !== optionId);
    
    setSelectedOptions(newSelectedOptions);
    onAnswer(question.id, newSelectedOptions);
  };

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    onAnswer(question.id, value[0]);
  };

  return (
    <div className="space-y-6 py-4">
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
      
      {question.type === 'radio' && question.options && (
        <RadioGroup 
          value={selectedOptions[0]}
          onValueChange={handleSingleOptionChange}
        >
          <div className="space-y-3">
            {question.options.map(option => (
              <div key={option.id} className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id} className="cursor-pointer">
                    {option.text.startsWith('questionnaire.') ? t(option.text) : option.text}
                  </Label>
                </div>
                
                {/* Render follow-up questions if this option is selected */}
                {followUpVisible === option.id && option.followUp && (
                  <div className="ml-6 mt-3 p-3 border-l-2 border-blue-200 bg-blue-50 rounded-r-md">
                    {option.followUp.map(followUpQuestion => (
                      <QuestionRenderer
                        key={followUpQuestion.id}
                        question={followUpQuestion}
                        onAnswer={onAnswer}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </RadioGroup>
      )}
      
      {question.type === 'multiple' && question.options && (
        <div className="space-y-3">
          {question.options.map(option => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={option.id}
                checked={selectedOptions.includes(option.id)}
                onCheckedChange={(checked) => 
                  handleMultipleOptionChange(option.id, checked as boolean)
                }
              />
              <Label htmlFor={option.id} className="cursor-pointer">
                {option.text.startsWith('questionnaire.') ? t(option.text) : option.text}
              </Label>
            </div>
          ))}
        </div>
      )}
      
      {question.type === 'scale' && question.scale && (
        <div className="space-y-4">
          <Slider
            defaultValue={[0]}
            max={question.scale.max}
            min={question.scale.min}
            step={1}
            value={sliderValue}
            onValueChange={handleSliderChange}
          />
          <div className="flex justify-between items-start text-sm text-gray-500 gap-4">
            <div className="text-left flex-1">
              <span className="block">
                {question.scale.minLabel.startsWith('questionnaire.')
                  ? t(question.scale.minLabel)
                  : question.scale.minLabel}
              </span>
              <span className="text-xs">({question.scale.min})</span>
            </div>
            <div className="text-center flex-shrink-0 px-3 py-1 bg-blue-50 rounded-md">
              <span className="text-blue-600 font-medium">
                {sliderValue[0]}
              </span>
            </div>
            <div className="text-right flex-1">
              <span className="block">
                {question.scale.maxLabel.startsWith('questionnaire.')
                  ? t(question.scale.maxLabel)
                  : question.scale.maxLabel}
              </span>
              <span className="text-xs">({question.scale.max})</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionRenderer;
