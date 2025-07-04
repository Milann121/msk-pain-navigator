
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
import { useMskProfileManager } from '@/hooks/useMskProfileManager';

// Add import for icon arrows
import { ArrowUp, ArrowDown } from "lucide-react";
import { useTranslation } from 'react-i18next';

interface FollowUpQuestionnaireProps {
  assessment: UserAssessment;
  onComplete: () => void;
}

const FollowUpQuestionnaire = ({ assessment, onComplete }: FollowUpQuestionnaireProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { t } = useTranslation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { syncMskProfile } = useMskProfileManager();

  // Get questions for the mechanism, default to nociceptive
  const fullQuestions = placeholderQuestions[assessment.primary_mechanism] || placeholderQuestions.nociceptive;

  // Helper: calculate visible questions with conditional logic
  const getVisibleQuestions = () => {
    const visibleQuestions = [];
    for (const q of fullQuestions) {
      if (q.id === 'pain-nature-description' && answers['pain-nature-changed'] !== 'yes') continue;
      if (q.id === 'new-pain-area' && answers['pain-spreading'] !== 'yes') continue;
      visibleQuestions.push(q);
    }
    return visibleQuestions;
  };

  const questions = getVisibleQuestions();
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  // Handle answer
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

  // Save latest pain-level-change for assessment+user as the most recent
  const handleSubmit = async () => {
    if (!user) return;

    setIsSubmitting(true);
    try {
      // Prepare data for submission
      const responseData: FollowUpResponse = {
        user_id: user.id,
        assessment_id: assessment.id,
        pain_level:
          answers['pain-level-change'] !== undefined ? answers['pain-level-change'] : 0,
        responses: answers
      };

      // Save follow-up response
      const { error } = await safeDatabase.followUpResponses.insert(responseData);

      if (error) throw error;

      // Sync MSK profile after follow-up response
      await syncMskProfile();

      toast({
        title: t('questionnaire.followUp.progressRecorded'),
        description: t('questionnaire.followUp.responsesSaved'),
      });

      onComplete();
    } catch (error) {
      console.error('Error saving follow-up questionnaire:', error);
      toast({
        title: t('goals.errorTitle'),
        description: t('goals.error'),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = currentQuestion && answers[currentQuestion.id] !== undefined;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-6">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-gray-500 mt-1">
            {t('misc.questionNumber', { current: currentQuestionIndex + 1, total: questions.length })}
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
          {t('misc.navigation.back')}
        </Button>
        <Button
          onClick={handleNext}
          disabled={!canProceed || isSubmitting}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {currentQuestionIndex < questions.length - 1
            ? t('misc.navigation.next')
            : t('misc.navigation.finish')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FollowUpQuestionnaire;
