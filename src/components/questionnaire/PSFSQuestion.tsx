import { Slider } from '@/components/ui/slider';
import { useTranslation } from 'react-i18next';

interface PSFSQuestionProps {
  question: {
    id: string;
    text: string;
    description?: string;
    psfs?: {
      questions: Array<{
        id: string;
        text: string;
        scale: {
          min: number;
          max: number;
          minLabel: string;
          maxLabel: string;
        };
      }>;
    };
  };
  values: Record<string, number>;
  onChange: (questionId: string, value: number) => void;
}

const PSFSQuestion = ({ question, values, onChange }: PSFSQuestionProps) => {
  const { t } = useTranslation();
  
  if (!question.psfs?.questions) return null;
  
  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">{t(question.text)}</h3>
        {question.description && (
          <p className="text-muted-foreground text-sm">{t(question.description)}</p>
        )}
      </div>
      
      <div className="space-y-8">
        {question.psfs.questions.map((subQuestion, index) => {
          const value = values[subQuestion.id] ?? 5;
          
          return (
            <div key={subQuestion.id} className="space-y-4 p-4 border rounded-lg bg-card">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium flex-shrink-0 mt-1">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-4">
                    {t(subQuestion.text)}
                  </h4>
                  
                  <div className="space-y-4">
                    <Slider
                      value={[value]}
                      onValueChange={(values) => onChange(subQuestion.id, values[0])}
                      max={subQuestion.scale.max}
                      min={subQuestion.scale.min}
                      step={1}
                      className="w-full"
                    />
                    
                    <div className="flex justify-between items-start text-sm text-muted-foreground gap-4">
                      <div className="text-left flex-1">
                        <span className="block">
                          {t(subQuestion.scale.minLabel)}
                        </span>
                        <span className="text-xs">({subQuestion.scale.min})</span>
                      </div>
                      <div className="text-center flex-shrink-0 px-3 py-1 bg-primary/10 rounded-md">
                        <span className="text-primary font-medium">
                          {value}
                        </span>
                      </div>
                      <div className="text-right flex-1">
                        <span className="block">
                          {t(subQuestion.scale.maxLabel)}
                        </span>
                        <span className="text-xs">({subQuestion.scale.max})</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PSFSQuestion;