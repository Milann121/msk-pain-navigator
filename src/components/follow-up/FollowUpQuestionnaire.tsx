
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { QuestionRenderer } from './QuestionRenderer';
import { PlaceholderQuestions } from './PlaceholderQuestions';
import { FollowUpQuestionType, FollowUpQuestionData, followUpQuestionTypes } from './types';

interface FollowUpQuestionnaireProps {
  assessmentId: string;
  onComplete: () => void;
}

export const FollowUpQuestionnaire = ({ assessmentId, onComplete }: FollowUpQuestionnaireProps) => {
  const [painLevel, setPainLevel] = useState<number>(5);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Using placeholder questions
  const questions = PlaceholderQuestions;
  
  const handleAnswerChange = (questionId: string, answer: any) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };
  
  const handlePainLevelChange = (value: number) => {
    setPainLevel(value);
  };
  
  const handleSubmit = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      const response = {
        user_id: user.id,
        assessment_id: assessmentId,
        pain_level: painLevel,
        responses
      };
      
      const { error } = await supabase
        .from('follow_up_responses')
        .insert(response);
      
      if (error) throw error;
      
      toast({
        title: 'Odpovede uložené',
        description: 'Vaše odpovede boli úspešne uložené.',
      });
      
      onComplete();
      
    } catch (error: any) {
      console.error('Error saving follow-up responses:', error);
      
      if (error.message.includes('relation "follow_up_responses" does not exist')) {
        // Table doesn't exist yet
        toast({
          title: 'Funkcia je v príprave',
          description: 'Táto funkcia zatiaľ nie je dostupná. Skúste to znova neskôr.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Chyba pri ukladaní odpovedí',
          description: 'Nepodarilo sa uložiť vaše odpovede. Skúste to znova neskôr.',
          variant: 'destructive',
        });
      }
    } finally {
      setLoading(false);
    }
  };
  
  const goToNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, questions.length));
  };
  
  const goToPrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };
  
  const currentQuestion = questions[currentStep];
  const isLastStep = currentStep === questions.length - 1;
  
  return (
    <Card className="p-6 mb-6">
      <h3 className="text-xl font-medium mb-6">Zaznamenať aktuálny stav</h3>
      
      {currentQuestion && (
        <QuestionRenderer 
          question={currentQuestion}
          response={responses[currentQuestion.id]}
          onAnswerChange={(answer) => handleAnswerChange(currentQuestion.id, answer)}
          onPainLevelChange={handlePainLevelChange}
          currentPainLevel={painLevel}
        />
      )}
      
      <div className="flex justify-between mt-8">
        <Button 
          variant="outline" 
          onClick={goToPrevStep} 
          disabled={currentStep === 0 || loading}
        >
          Späť
        </Button>
        
        <div>
          {isLastStep ? (
            <Button 
              onClick={handleSubmit} 
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? 'Ukladám...' : 'Dokončiť'}
            </Button>
          ) : (
            <Button 
              onClick={goToNextStep} 
              disabled={loading}
            >
              Ďalej
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
