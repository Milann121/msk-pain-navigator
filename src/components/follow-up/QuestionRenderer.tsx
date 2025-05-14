
import { FollowUpQuestion } from './types';
import SingleChoiceQuestion from './SingleChoiceQuestion';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import ScaleQuestion from './ScaleQuestion';

interface QuestionRendererProps {
  question: FollowUpQuestion;
  answer: any;
  onAnswerChange: (questionId: string, answer: any) => void;
}

const QuestionRenderer = ({ question, answer, onAnswerChange }: QuestionRendererProps) => {
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
    onAnswerChange(question.id, value);
  };

  return (
    <div className="space-y-6 pt-4">
      <h3 className="text-lg font-medium text-blue-700">{question.text}</h3>
      
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
