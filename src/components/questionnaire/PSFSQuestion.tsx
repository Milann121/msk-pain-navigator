import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  
  // Get the first question to extract scale labels for the legend
  const firstQuestion = question.psfs.questions[0];
  
  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">{t(question.text)}</h3>
        {question.description && (
          <p className="text-muted-foreground text-sm">{t(question.description)}</p>
        )}
      </div>
      
      
      <div className="space-y-6">
        {question.psfs.questions.map((subQuestion, index) => {
          const value = values[subQuestion.id] ?? 5;
          
          return (
            <div key={subQuestion.id} className="space-y-4">
              {/* Add image above the first question */}
              {index === 0 && (
                <div className="w-full mb-6">
                  <img 
                    src="/lovable-uploads/psfsImages/houseHoldImage.png" 
                    alt="Household activities"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              )}
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-4">
                    {t(subQuestion.text)}
                  </h4>
                  
                  <div className="space-y-4">
                    <Select 
                      value={value.toString()} 
                      onValueChange={(val) => onChange(subQuestion.id, parseInt(val))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a value" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 11 }, (_, i) => (
                          <SelectItem key={i} value={i.toString()}>
                            <div className="flex items-center gap-2">
                              <span>{i}</span>
                              {i === 0 && (
                                <span className="text-muted-foreground text-sm">
                                  - {t(subQuestion.scale.minLabel)}
                                </span>
                              )}
                              {i === 10 && (
                                <span className="text-muted-foreground text-sm">
                                  - {t(subQuestion.scale.maxLabel)}
                                </span>
                              )}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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