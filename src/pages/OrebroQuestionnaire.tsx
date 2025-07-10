import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import { OrebroAnswers } from '@/types/orebro';
import { calculateOrebroScore } from '@/utils/orebro-scoring';
import { isCurrentQuestionAnswered } from '@/utils/orebro-validation';
import { OrebroQuestionRenderer } from '@/components/orebro/OrebroQuestionRenderer';

const OrebroQuestionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Partial<OrebroAnswers>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const totalQuestions = 21;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleSliderChange = (field: keyof OrebroAnswers, value: number[]) => {
    setAnswers(prev => ({ ...prev, [field]: value[0] }));
  };

  const handleRadioChange = (field: keyof OrebroAnswers, value: string) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: keyof OrebroAnswers, option: string, checked: boolean) => {
    setAnswers(prev => {
      const currentArray = (prev[field] as string[]) || [];
      if (checked) {
        return { ...prev, [field]: [...currentArray, option] };
      } else {
        return { ...prev, [field]: currentArray.filter(item => item !== option) };
      }
    });
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: t('orebro.error'),
          description: t('orebro.notAuthenticated'),
          variant: 'destructive',
        });
        return;
      }

      // Calculate OREBRO score using proper scoring logic
      const { totalScore, riskLevel } = calculateOrebroScore(answers);

      const { error } = await supabase
        .from('orebro_responses')
        .insert({
          user_id: user.id,
          responses: answers,
          total_score: totalScore,
          risk_level: riskLevel,
        });

      if (error) throw error;

      toast({
        title: t('orebro.submitted.title'),
        description: t('orebro.submitted.description'),
      });

      // Navigate to result page with data
      navigate('/orebro-result', { 
        state: { 
          riskLevel, 
          painLocations: answers.painLocation || [] 
        } 
      });
    } catch (error) {
      console.error('Error submitting OREBRO:', error);
      toast({
        title: t('orebro.error'),
        description: t('orebro.submitError'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = isCurrentQuestionAnswered(currentQuestion, answers);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-muted/50 p-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center gap-3 mb-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/domov')}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">{t('backToHome')}</span>
            </div>
            
            <CardTitle>{t('orebro.title')}</CardTitle>
            <CardDescription>{t('orebro.description')}</CardDescription>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{t('orebro.questionProgress', { current: currentQuestion + 1, total: totalQuestions })}</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          </CardHeader>

          <CardContent className="min-h-[300px]">
            <OrebroQuestionRenderer
              currentQuestion={currentQuestion}
              answers={answers}
              onSliderChange={handleSliderChange}
              onRadioChange={handleRadioChange}
              onCheckboxChange={handleCheckboxChange}
            />
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handleBack} 
              disabled={currentQuestion === 0}
            >
              {t('back')}
            </Button>
            <Button 
              onClick={handleNext} 
              disabled={!canProceed || isSubmitting}
            >
              {currentQuestion === totalQuestions - 1 ? t('orebro.submit') : t('next')}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default OrebroQuestionnaire;