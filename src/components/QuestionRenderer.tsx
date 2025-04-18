
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Question } from '@/utils/types';
import { cn } from '@/lib/utils';

interface QuestionRendererProps {
  question: Question;
  onAnswer: (questionId: string, answer: any) => void;
}

const QuestionRenderer = ({ question, onAnswer }: QuestionRendererProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [followUpVisible, setFollowUpVisible] = useState<string | null>(null);
  const [sliderValue, setSliderValue] = useState<number[]>([0]);

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
      <h3 className="text-lg font-medium text-blue-700">{question.text}</h3>
      
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
                  <Label htmlFor={option.id} className="cursor-pointer">{option.text}</Label>
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
              <Label htmlFor={option.id} className="cursor-pointer">{option.text}</Label>
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
          <div className="flex justify-between text-sm text-gray-500">
            <span>{question.scale.minLabel} ({question.scale.min})</span>
            <span>
              Selected: <span className="font-medium text-blue-600">{sliderValue[0]}</span>
            </span>
            <span>{question.scale.maxLabel} ({question.scale.max})</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionRenderer;
