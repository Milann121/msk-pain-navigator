
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import QuestionRenderer from '@/components/QuestionRenderer';
import { Questionnaire as QuestionnaireType, Question, PainMechanism, SINGroup, Differential, ScoreTracker } from '@/utils/types';
import { useAssessment } from '@/contexts/AssessmentContext';
import { upperLimbQuestionnaires } from '@/data/UpperLimb/questionnaires';

interface QuestionnaireProps {
  questionnaire: QuestionnaireType;
  onComplete: (answers: Record<string, any>) => void;
  onBack?: () => void;
  onRedirect?: (questionnaireId: string, answers: Record<string, any>) => void;
}

const Questionnaire = ({ questionnaire, onComplete, onBack, onRedirect }: QuestionnaireProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [progress, setProgress] = useState(0);
  const { userInfo } = useAssessment();

  // Filter questions based on showIf conditions
  const filteredQuestions = questionnaire.questions.filter(question => {
    if (!question.showIf) return true;
    
    // Check if the question should be shown based on pain area
    if (question.showIf.painArea) {
      return userInfo?.painArea === question.showIf.painArea;
    }
    
    return true;
  });

  const currentQuestion = filteredQuestions[currentQuestionIndex];
  
  // Update progress when current question changes
  useEffect(() => {
    setProgress(((currentQuestionIndex + 1) / filteredQuestions.length) * 100);
  }, [currentQuestionIndex, filteredQuestions.length]);

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const checkForRedirection = (answer: any) => {
    if (!currentQuestion?.options) return null;
    
    const selectedOption = currentQuestion.options.find(opt => opt.id === answer);
    return selectedOption?.redirectTo || null;
  };

  const handleNext = () => {
    // Check if current question is answered
    if (!answers[currentQuestion.id]) {
      return;
    }
    
    // Check for redirection
    const redirectTo = checkForRedirection(answers[currentQuestion.id]);
    if (redirectTo && onRedirect) {
      onRedirect(redirectTo, answers);
      return;
    }
    
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete(answers);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (onBack) {
      onBack();
    }
  };

  const canProceed = !!answers[currentQuestion?.id];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-blue-700">{questionnaire.title}</CardTitle>
        <CardDescription>{questionnaire.description}</CardDescription>
        <div className="mt-4">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-gray-500 mt-1">
            Otázka {currentQuestionIndex + 1} z {filteredQuestions.length}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        {currentQuestion && (
          <QuestionRenderer
            question={currentQuestion}
            onAnswer={handleAnswer}
          />
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handleBack}
        >
          Späť
        </Button>
        <Button 
          onClick={handleNext}
          disabled={!canProceed}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {currentQuestionIndex < filteredQuestions.length - 1 ? 'Ďalej' : 'Dokončiť'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Questionnaire;
