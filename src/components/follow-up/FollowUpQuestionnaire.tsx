
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import QuestionRenderer from './QuestionRenderer';
import { placeholderQuestions } from './PlaceholderQuestions';
import { UserAssessment } from './types';
import { safeDatabase, FollowUpResponse } from '@/utils/database-helpers';

interface FollowUpQuestionnaireProps {
  assessment: UserAssessment;
  onComplete: () => void;
}

const FollowUpQuestionnaire = ({ assessment, onComplete }: FollowUpQuestionnaireProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Default to nociceptive if mechanism not found
  const questions = placeholderQuestions[assessment.primary_mechanism] || placeholderQuestions.nociceptive;
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };
  
  const handleSliderChange = (questionId: string, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
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
      
      // Prepare data for submission
      const responseData: FollowUpResponse = {
        user_id: user.id,
        assessment_id: assessment.id,
        pain_level: answers['pain-level-change'] || 0,
        responses: answers
      };

      // Save the follow-up responses to the database
      // First try using RPC function if available
      try {
        const { error } = await supabase.rpc('insert_follow_up_response', {
          user_id_param: user.id,
          assessment_id_param: assessment.id,
          pain_level_param: answers['pain-level-change'] || 0,
          responses_param: answers
        });
        
        if (error) throw error;
      } catch (rpcError) {
        console.log('RPC function not available, falling back to direct insert:', rpcError);
        
        // Try direct insert as fallback using our safe helper
        const { error } = await safeDatabase.followUpResponses.insert(responseData);
          
        if (error) throw error;
      }
      
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
          <QuestionRenderer 
            question={currentQuestion}
            answer={answers[currentQuestion?.id]}
            onAnswerChange={handleAnswerChange}
            onSliderChange={handleSliderChange}
          />
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
