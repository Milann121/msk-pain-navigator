
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';

interface UserAssessment {
  id: string;
  primary_mechanism: string;
  sin_group: string;
  primary_differential: string;
  pain_area: string;
  timestamp: string;
  completed_exercises_count: number;
  last_completed_at?: string;
  initial_pain_level?: number;
  latest_pain_level?: number;
}

interface FollowUpQuestionnaireProps {
  assessment: UserAssessment;
  onComplete: () => void;
}

interface FollowUpQuestion {
  id: string;
  text: string;
  type: 'single' | 'multiple' | 'scale';
  options?: Array<{
    id: string;
    text: string;
  }>;
  scale?: {
    min: number;
    max: number;
    minLabel: string;
    maxLabel: string;
  };
}

const FollowUpQuestionnaire = ({ assessment, onComplete }: FollowUpQuestionnaireProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Placeholder questions based on mechanism - these will be replaced later
  const placeholderQuestions: Record<string, FollowUpQuestion[]> = {
    nociceptive: [
      {
        id: 'pain-level-change',
        text: 'Ako by ste hodnotili vašu bolesť v porovnaní s posledným hodnotením?',
        type: 'scale',
        scale: {
          min: 0,
          max: 10,
          minLabel: 'Žiadna bolesť',
          maxLabel: 'Najhoršia predstaviteľná bolesť'
        }
      },
      {
        id: 'exercise-effectiveness',
        text: 'Ako účinné sú cvičenia na zmiernenie vašej bolesti?',
        type: 'single',
        options: [
          { id: 'very-effective', text: 'Veľmi účinné' },
          { id: 'somewhat-effective', text: 'Čiastočne účinné' },
          { id: 'not-effective', text: 'Neúčinné' }
        ]
      }
    ],
    neuropathic: [
      {
        id: 'pain-level-change',
        text: 'Ako by ste hodnotili vašu bolesť v porovnaní s posledným hodnotením?',
        type: 'scale',
        scale: {
          min: 0,
          max: 10,
          minLabel: 'Žiadna bolesť',
          maxLabel: 'Najhoršia predstaviteľná bolesť'
        }
      },
      {
        id: 'nerve-symptoms',
        text: 'Zmenili sa vaše príznaky mravčenia alebo necitlivosti?',
        type: 'single',
        options: [
          { id: 'improved', text: 'Zlepšili sa' },
          { id: 'unchanged', text: 'Bez zmeny' },
          { id: 'worse', text: 'Zhoršili sa' }
        ]
      }
    ],
    central: [
      {
        id: 'pain-level-change',
        text: 'Ako by ste hodnotili vašu bolesť v porovnaní s posledným hodnotením?',
        type: 'scale',
        scale: {
          min: 0,
          max: 10,
          minLabel: 'Žiadna bolesť',
          maxLabel: 'Najhoršia predstaviteľná bolesť'
        }
      },
      {
        id: 'sensitivity-change',
        text: 'Zmenila sa vaša citlivosť na dotyky, svetlo alebo zvuky?',
        type: 'single',
        options: [
          { id: 'less-sensitive', text: 'Menej citlivý/á' },
          { id: 'same', text: 'Rovnako' },
          { id: 'more-sensitive', text: 'Viac citlivý/á' }
        ]
      }
    ]
  };
  
  // Default to nociceptive if mechanism not found
  const questions = placeholderQuestions[assessment.primary_mechanism] || placeholderQuestions.nociceptive;
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  // Handle different answer types
  const handleSingleOptionChange = (questionId: string, optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleMultipleOptionChange = (questionId: string, optionId: string, checked: boolean) => {
    const prevSelected = answers[questionId] || [];
    const newSelected = checked 
      ? [...prevSelected, optionId] 
      : prevSelected.filter((id: string) => id !== optionId);
    
    setAnswers(prev => ({
      ...prev,
      [questionId]: newSelected
    }));
  };

  const handleSliderChange = (questionId: string, value: number[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value[0]
    }));
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };
  
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const handleSubmit = async () => {
    if (!user) return;
    
    try {
      setIsSubmitting(true);
      
      // Save the follow-up responses to the database
      const { error } = await supabase
        .from('follow_up_responses')
        .insert({
          user_id: user.id,
          assessment_id: assessment.id,
          pain_level: answers['pain-level-change'],
          responses: answers
        });
        
      if (error) throw error;
      
      toast({
        title: "Pokrok zaznamenaný",
        description: "Ďakujeme za vyplnenie dotazníka o vašom pokroku.",
      });
      
      onComplete();
    } catch (error) {
      console.error('Error saving follow-up questionnaire:', error);
      toast({
        title: "Chyba",
        description: "Nepodarilo sa uložiť vaše odpovede.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const renderQuestion = () => {
    if (!currentQuestion) return null;
    
    switch (currentQuestion.type) {
      case 'single':
        return (
          <RadioGroup 
            value={answers[currentQuestion.id]}
            onValueChange={(value) => handleSingleOptionChange(currentQuestion.id, value)}
          >
            <div className="space-y-3">
              {currentQuestion.options?.map(option => (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id} className="cursor-pointer">{option.text}</Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        );
        
      case 'multiple':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map(option => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={option.id}
                  checked={(answers[currentQuestion.id] || []).includes(option.id)}
                  onCheckedChange={(checked) => 
                    handleMultipleOptionChange(currentQuestion.id, option.id, checked as boolean)
                  }
                />
                <Label htmlFor={option.id} className="cursor-pointer">{option.text}</Label>
              </div>
            ))}
          </div>
        );
        
      case 'scale':
        if (!currentQuestion.scale) return null;
        
        return (
          <div className="space-y-4">
            <Slider
              defaultValue={[5]}
              max={currentQuestion.scale.max}
              min={currentQuestion.scale.min}
              step={1}
              value={answers[currentQuestion.id] !== undefined ? [answers[currentQuestion.id]] : [5]}
              onValueChange={(value) => handleSliderChange(currentQuestion.id, value)}
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{currentQuestion.scale.minLabel} ({currentQuestion.scale.min})</span>
              <span>
                Vybrané: <span className="font-medium text-blue-600">
                  {answers[currentQuestion.id] !== undefined ? answers[currentQuestion.id] : 5}
                </span>
              </span>
              <span>{currentQuestion.scale.maxLabel} ({currentQuestion.scale.max})</span>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  const canProceed = answers[currentQuestion?.id] !== undefined;
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-6">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-gray-500 mt-1">
            Otázka {currentQuestionIndex + 1} z {questions.length}
          </p>
        </div>
        
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-blue-700">{currentQuestion?.text}</h3>
          {renderQuestion()}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handleBack}
          disabled={currentQuestionIndex === 0 || isSubmitting}
        >
          Späť
        </Button>
        <Button 
          onClick={handleNext}
          disabled={!canProceed || isSubmitting}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {currentQuestionIndex < questions.length - 1 ? 'Ďalej' : 'Dokončiť'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FollowUpQuestionnaire;
