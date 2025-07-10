import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';

interface OrebroAnswers {
  painLocation: string[];
  workDaysMissed: string;
  painDuration: string;
  workHeaviness: number;
  painThisWeek: number;
  painThreeMonths: number;
  painFrequency: number;
  painCoping: number;
  anxiety: number;
  depression: number;
  persistentRisk: number;
  workChances: number;
  jobSatisfaction: number;
  physicalActivity: number;
  stopActivity: number;
  normalWork: number;
  lightWork: number;
  walking: number;
  householdChores: number;
  shopping: number;
  sleep: number;
}

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

      // Calculate a basic total score (this is simplified)
      const numericAnswers = Object.values(answers).filter(val => typeof val === 'number') as number[];
      const totalScore = numericAnswers.reduce((sum, val) => sum + val, 0);

      const { error } = await supabase
        .from('orebro_responses')
        .insert({
          user_id: user.id,
          responses: answers,
          total_score: totalScore,
        });

      if (error) throw error;

      toast({
        title: t('orebro.submitted.title'),
        description: t('orebro.submitted.description'),
      });

      navigate('/domov');
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

  const isCurrentQuestionAnswered = () => {
    switch (currentQuestion) {
      case 0: return (answers.painLocation && answers.painLocation.length > 0);
      case 1: return !!answers.workDaysMissed;
      case 2: return !!answers.painDuration;
      case 3: return answers.workHeaviness !== undefined;
      case 4: return answers.painThisWeek !== undefined;
      case 5: return answers.painThreeMonths !== undefined;
      case 6: return answers.painFrequency !== undefined;
      case 7: return answers.painCoping !== undefined;
      case 8: return answers.anxiety !== undefined;
      case 9: return answers.depression !== undefined;
      case 10: return answers.persistentRisk !== undefined;
      case 11: return answers.workChances !== undefined;
      case 12: return answers.jobSatisfaction !== undefined;
      case 13: return answers.physicalActivity !== undefined;
      case 14: return answers.stopActivity !== undefined;
      case 15: return answers.normalWork !== undefined;
      case 16: return answers.lightWork !== undefined;
      case 17: return answers.walking !== undefined;
      case 18: return answers.householdChores !== undefined;
      case 19: return answers.shopping !== undefined;
      case 20: return answers.sleep !== undefined;
      default: return false;
    }
  };

  const renderQuestion = () => {
    switch (currentQuestion) {
      case 0:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t('orebro.questions.painLocation')}</h3>
            <div className="space-y-3">
              {['neck', 'shoulder', 'arm', 'upperBack', 'lowerBack', 'leg', 'other'].map((location) => (
                <div key={location} className="flex items-center space-x-2">
                  <Checkbox
                    id={location}
                    checked={answers.painLocation?.includes(location) || false}
                    onCheckedChange={(checked) => handleCheckboxChange('painLocation', location, checked as boolean)}
                  />
                  <Label htmlFor={location}>{t(`orebro.painLocations.${location}`)}</Label>
                </div>
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t('orebro.questions.workDaysMissed')}</h3>
            <RadioGroup value={answers.workDaysMissed || ""} onValueChange={(value) => handleRadioChange('workDaysMissed', value)}>
              {[
                { value: '0days', label: t('orebro.workDays.0days') },
                { value: '1-2days', label: t('orebro.workDays.1-2days') },
                { value: '3-7days', label: t('orebro.workDays.3-7days') },
                { value: '8-14days', label: t('orebro.workDays.8-14days') },
                { value: '15-30days', label: t('orebro.workDays.15-30days') },
                { value: '1month', label: t('orebro.workDays.1month') },
                { value: '2months', label: t('orebro.workDays.2months') },
                { value: '3-6months', label: t('orebro.workDays.3-6months') },
                { value: '6-12months', label: t('orebro.workDays.6-12months') },
                { value: 'over1year', label: t('orebro.workDays.over1year') },
              ].map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t('orebro.questions.painDuration')}</h3>
            <RadioGroup value={answers.painDuration || ""} onValueChange={(value) => handleRadioChange('painDuration', value)}>
              {[
                { value: '0-1week', label: t('orebro.duration.0-1week') },
                { value: '1-2weeks', label: t('orebro.duration.1-2weeks') },
                { value: '3-4weeks', label: t('orebro.duration.3-4weeks') },
                { value: '4-5weeks', label: t('orebro.duration.4-5weeks') },
                { value: '6-8weeks', label: t('orebro.duration.6-8weeks') },
                { value: '9-11weeks', label: t('orebro.duration.9-11weeks') },
                { value: '3-6months', label: t('orebro.duration.3-6months') },
                { value: '6-9months', label: t('orebro.duration.6-9months') },
                { value: '9-12months', label: t('orebro.duration.9-12months') },
                { value: 'over1year', label: t('orebro.duration.over1year') },
              ].map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t('orebro.questions.workHeaviness')}</h3>
            <div className="space-y-4">
              <Slider
                value={[answers.workHeaviness || 0]}
                onValueChange={(value) => handleSliderChange('workHeaviness', value)}
                max={10}
                min={0}
                step={1}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0 = {t('orebro.scales.notAtAll')}</span>
                <span className="text-primary font-medium">{answers.workHeaviness || 0}</span>
                <span>10 = {t('orebro.scales.extremely')}</span>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t('orebro.questions.painThisWeek')}</h3>
            <div className="space-y-4">
              <Slider
                value={[answers.painThisWeek || 0]}
                onValueChange={(value) => handleSliderChange('painThisWeek', value)}
                max={10}
                min={0}
                step={1}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0 = {t('orebro.scales.noPain')}</span>
                <span className="text-primary font-medium">{answers.painThisWeek || 0}</span>
                <span>10 = {t('orebro.scales.worstPain')}</span>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t('orebro.questions.painThreeMonths')}</h3>
            <div className="space-y-4">
              <Slider
                value={[answers.painThreeMonths || 0]}
                onValueChange={(value) => handleSliderChange('painThreeMonths', value)}
                max={10}
                min={0}
                step={1}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0 = {t('orebro.scales.noPain')}</span>
                <span className="text-primary font-medium">{answers.painThreeMonths || 0}</span>
                <span>10 = {t('orebro.scales.worstPain')}</span>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t('orebro.questions.painFrequency')}</h3>
            <div className="space-y-4">
              <Slider
                value={[answers.painFrequency || 0]}
                onValueChange={(value) => handleSliderChange('painFrequency', value)}
                max={10}
                min={0}
                step={1}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0 = {t('orebro.scales.never')}</span>
                <span className="text-primary font-medium">{answers.painFrequency || 0}</span>
                <span>10 = {t('orebro.scales.always')}</span>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t('orebro.questions.painCoping')}</h3>
            <div className="space-y-4">
              <Slider
                value={[answers.painCoping || 0]}
                onValueChange={(value) => handleSliderChange('painCoping', value)}
                max={10}
                min={0}
                step={1}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0 = {t('orebro.scales.cantDecrease')}</span>
                <span className="text-primary font-medium">{answers.painCoping || 0}</span>
                <span>10 = {t('orebro.scales.canDecreaseCompletely')}</span>
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t('orebro.questions.anxiety')}</h3>
            <div className="space-y-4">
              <Slider
                value={[answers.anxiety || 0]}
                onValueChange={(value) => handleSliderChange('anxiety', value)}
                max={10}
                min={0}
                step={1}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0 = {t('orebro.scales.absolutelyCalm')}</span>
                <span className="text-primary font-medium">{answers.anxiety || 0}</span>
                <span>10 = {t('orebro.scales.mostAnxious')}</span>
              </div>
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t('orebro.questions.depression')}</h3>
            <div className="space-y-4">
              <Slider
                value={[answers.depression || 0]}
                onValueChange={(value) => handleSliderChange('depression', value)}
                max={10}
                min={0}
                step={1}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0 = {t('orebro.scales.notAtAll')}</span>
                <span className="text-primary font-medium">{answers.depression || 0}</span>
                <span>10 = {t('orebro.scales.extremely')}</span>
              </div>
            </div>
          </div>
        );

      case 10:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t('orebro.questions.persistentRisk')}</h3>
            <div className="space-y-4">
              <Slider
                value={[answers.persistentRisk || 0]}
                onValueChange={(value) => handleSliderChange('persistentRisk', value)}
                max={10}
                min={0}
                step={1}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0 = {t('orebro.scales.noRisk')}</span>
                <span className="text-primary font-medium">{answers.persistentRisk || 0}</span>
                <span>10 = {t('orebro.scales.veryLargeRisk')}</span>
              </div>
            </div>
          </div>
        );

      case 11:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t('orebro.questions.workChances')}</h3>
            <div className="space-y-4">
              <Slider
                value={[answers.workChances || 0]}
                onValueChange={(value) => handleSliderChange('workChances', value)}
                max={10}
                min={0}
                step={1}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0 = {t('orebro.scales.noChance')}</span>
                <span className="text-primary font-medium">{answers.workChances || 0}</span>
                <span>10 = {t('orebro.scales.veryLargeChance')}</span>
              </div>
            </div>
          </div>
        );

      case 12:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t('orebro.questions.jobSatisfaction')}</h3>
            <div className="space-y-4">
              <Slider
                value={[answers.jobSatisfaction || 0]}
                onValueChange={(value) => handleSliderChange('jobSatisfaction', value)}
                max={10}
                min={0}
                step={1}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0 = {t('orebro.scales.notSatisfied')}</span>
                <span className="text-primary font-medium">{answers.jobSatisfaction || 0}</span>
                <span>10 = {t('orebro.scales.completelySatisfied')}</span>
              </div>
            </div>
          </div>
        );

      case 13:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t('orebro.questions.physicalActivity')}</h3>
            <div className="space-y-4">
              <Slider
                value={[answers.physicalActivity || 0]}
                onValueChange={(value) => handleSliderChange('physicalActivity', value)}
                max={10}
                min={0}
                step={1}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0 = {t('orebro.scales.completelyDisagree')}</span>
                <span className="text-primary font-medium">{answers.physicalActivity || 0}</span>
                <span>10 = {t('orebro.scales.completelyAgree')}</span>
              </div>
            </div>
          </div>
        );

      case 14:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t('orebro.questions.stopActivity')}</h3>
            <div className="space-y-4">
              <Slider
                value={[answers.stopActivity || 0]}
                onValueChange={(value) => handleSliderChange('stopActivity', value)}
                max={10}
                min={0}
                step={1}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0 = {t('orebro.scales.completelyDisagree')}</span>
                <span className="text-primary font-medium">{answers.stopActivity || 0}</span>
                <span>10 = {t('orebro.scales.completelyAgree')}</span>
              </div>
            </div>
          </div>
        );

      case 15:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t('orebro.questions.normalWork')}</h3>
            <div className="space-y-4">
              <Slider
                value={[answers.normalWork || 0]}
                onValueChange={(value) => handleSliderChange('normalWork', value)}
                max={10}
                min={0}
                step={1}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0 = {t('orebro.scales.completelyDisagree')}</span>
                <span className="text-primary font-medium">{answers.normalWork || 0}</span>
                <span>10 = {t('orebro.scales.completelyAgree')}</span>
              </div>
            </div>
          </div>
        );

      case 16:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t('orebro.questions.lightWork')}</h3>
            <div className="space-y-4">
              <Slider
                value={[answers.lightWork || 0]}
                onValueChange={(value) => handleSliderChange('lightWork', value)}
                max={10}
                min={0}
                step={1}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0 = {t('orebro.scales.cantDoBecauseOfPain')}</span>
                <span className="text-primary font-medium">{answers.lightWork || 0}</span>
                <span>10 = {t('orebro.scales.canDoWithoutPain')}</span>
              </div>
            </div>
          </div>
        );

      case 17:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t('orebro.questions.walking')}</h3>
            <div className="space-y-4">
              <Slider
                value={[answers.walking || 0]}
                onValueChange={(value) => handleSliderChange('walking', value)}
                max={10}
                min={0}
                step={1}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0 = {t('orebro.scales.cantDoBecauseOfPain')}</span>
                <span className="text-primary font-medium">{answers.walking || 0}</span>
                <span>10 = {t('orebro.scales.canDoWithoutPain')}</span>
              </div>
            </div>
          </div>
        );

      case 18:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t('orebro.questions.householdChores')}</h3>
            <div className="space-y-4">
              <Slider
                value={[answers.householdChores || 0]}
                onValueChange={(value) => handleSliderChange('householdChores', value)}
                max={10}
                min={0}
                step={1}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0 = {t('orebro.scales.cantDoBecauseOfPain')}</span>
                <span className="text-primary font-medium">{answers.householdChores || 0}</span>
                <span>10 = {t('orebro.scales.canDoWithoutPain')}</span>
              </div>
            </div>
          </div>
        );

      case 19:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t('orebro.questions.shopping')}</h3>
            <div className="space-y-4">
              <Slider
                value={[answers.shopping || 0]}
                onValueChange={(value) => handleSliderChange('shopping', value)}
                max={10}
                min={0}
                step={1}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0 = {t('orebro.scales.cantDoBecauseOfPain')}</span>
                <span className="text-primary font-medium">{answers.shopping || 0}</span>
                <span>10 = {t('orebro.scales.canDoWithoutPain')}</span>
              </div>
            </div>
          </div>
        );

      case 20:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t('orebro.questions.sleep')}</h3>
            <div className="space-y-4">
              <Slider
                value={[answers.sleep || 0]}
                onValueChange={(value) => handleSliderChange('sleep', value)}
                max={10}
                min={0}
                step={1}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0 = {t('orebro.scales.cantDoBecauseOfPain')}</span>
                <span className="text-primary font-medium">{answers.sleep || 0}</span>
                <span>10 = {t('orebro.scales.canDoWithoutPain')}</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

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
            {renderQuestion()}
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
              disabled={!isCurrentQuestionAnswered() || isSubmitting}
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