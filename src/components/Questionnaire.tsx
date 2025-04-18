
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import QuestionRenderer from '@/components/QuestionRenderer';
import { Questionnaire as QuestionnaireType, Question, PainMechanism, SINGroup, Differential, ScoreTracker } from '@/utils/types';

interface QuestionnaireProps {
  questionnaire: QuestionnaireType;
  onComplete: (answers: Record<string, any>) => void;
  onBack?: () => void;
}

const Questionnaire = ({ questionnaire, onComplete, onBack }: QuestionnaireProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [progress, setProgress] = useState(0);

  const questions = questionnaire.questions;
  const currentQuestion = questions[currentQuestionIndex];
  
  // Update progress when current question changes
  useEffect(() => {
    setProgress(((currentQuestionIndex + 1) / questions.length) * 100);
  }, [currentQuestionIndex, questions.length]);

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    // Check if current question is answered
    if (!answers[currentQuestion.id]) {
      return;
    }
    
    if (currentQuestionIndex < questions.length - 1) {
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
            Question {currentQuestionIndex + 1} of {questions.length}
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
          Back
        </Button>
        <Button 
          onClick={handleNext}
          disabled={!canProceed}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Complete'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Questionnaire;
