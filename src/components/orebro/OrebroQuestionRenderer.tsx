import { OrebroAnswers } from '@/types/orebro';
import { PainLocationQuestion } from './PainLocationQuestion';
import { RadioQuestion } from './RadioQuestion';
import { SliderQuestion } from './SliderQuestion';

interface OrebroQuestionRendererProps {
  currentQuestion: number;
  answers: Partial<OrebroAnswers>;
  onSliderChange: (field: keyof OrebroAnswers, value: number[]) => void;
  onRadioChange: (field: keyof OrebroAnswers, value: string) => void;
  onCheckboxChange: (field: keyof OrebroAnswers, option: string, checked: boolean) => void;
}

export const OrebroQuestionRenderer = ({ 
  currentQuestion, 
  answers, 
  onSliderChange, 
  onRadioChange, 
  onCheckboxChange 
}: OrebroQuestionRendererProps) => {
  
  const workDaysOptions = [
    { value: '0days', labelKey: 'orebro.workDays.0days' },
    { value: '1-2days', labelKey: 'orebro.workDays.1-2days' },
    { value: '3-7days', labelKey: 'orebro.workDays.3-7days' },
    { value: '8-14days', labelKey: 'orebro.workDays.8-14days' },
    { value: '15-30days', labelKey: 'orebro.workDays.15-30days' },
    { value: '1month', labelKey: 'orebro.workDays.1month' },
    { value: '2months', labelKey: 'orebro.workDays.2months' },
    { value: '3-6months', labelKey: 'orebro.workDays.3-6months' },
    { value: '6-12months', labelKey: 'orebro.workDays.6-12months' },
    { value: 'over1year', labelKey: 'orebro.workDays.over1year' },
  ];

  const painDurationOptions = [
    { value: '0-1week', labelKey: 'orebro.duration.0-1week' },
    { value: '1-2weeks', labelKey: 'orebro.duration.1-2weeks' },
    { value: '3-4weeks', labelKey: 'orebro.duration.3-4weeks' },
    { value: '4-5weeks', labelKey: 'orebro.duration.4-5weeks' },
    { value: '6-8weeks', labelKey: 'orebro.duration.6-8weeks' },
    { value: '9-11weeks', labelKey: 'orebro.duration.9-11weeks' },
    { value: '3-6months', labelKey: 'orebro.duration.3-6months' },
    { value: '6-9months', labelKey: 'orebro.duration.6-9months' },
    { value: '9-12months', labelKey: 'orebro.duration.9-12months' },
    { value: 'over1year', labelKey: 'orebro.duration.over1year' },
  ];

  switch (currentQuestion) {
    case 0:
      return <PainLocationQuestion answers={answers} onAnswer={onCheckboxChange} />;
    
    case 1:
      return (
        <RadioQuestion
          field="workDaysMissed"
          questionKey="orebro.questions.workDaysMissed"
          options={workDaysOptions}
          answers={answers}
          onAnswer={onRadioChange}
        />
      );
    
    case 2:
      return (
        <RadioQuestion
          field="painDuration"
          questionKey="orebro.questions.painDuration"
          options={painDurationOptions}
          answers={answers}
          onAnswer={onRadioChange}
        />
      );
    
    case 3:
      return (
        <SliderQuestion
          field="workHeaviness"
          questionKey="orebro.questions.workHeaviness"
          minLabel="orebro.scales.notAtAll"
          maxLabel="orebro.scales.extremely"
          answers={answers}
          onAnswer={onSliderChange}
        />
      );
    
    case 4:
      return (
        <SliderQuestion
          field="painThisWeek"
          questionKey="orebro.questions.painThisWeek"
          minLabel="orebro.scales.noPain"
          maxLabel="orebro.scales.worstPain"
          answers={answers}
          onAnswer={onSliderChange}
        />
      );
    
    case 5:
      return (
        <SliderQuestion
          field="painThreeMonths"
          questionKey="orebro.questions.painThreeMonths"
          minLabel="orebro.scales.noPain"
          maxLabel="orebro.scales.worstPain"
          answers={answers}
          onAnswer={onSliderChange}
        />
      );
    
    case 6:
      return (
        <SliderQuestion
          field="painFrequency"
          questionKey="orebro.questions.painFrequency"
          minLabel="orebro.scales.never"
          maxLabel="orebro.scales.always"
          answers={answers}
          onAnswer={onSliderChange}
        />
      );
    
    case 7:
      return (
        <SliderQuestion
          field="painCoping"
          questionKey="orebro.questions.painCoping"
          minLabel="orebro.scales.cantDecrease"
          maxLabel="orebro.scales.canDecreaseCompletely"
          answers={answers}
          onAnswer={onSliderChange}
        />
      );
    
    case 8:
      return (
        <SliderQuestion
          field="anxiety"
          questionKey="orebro.questions.anxiety"
          minLabel="orebro.scales.absolutelyCalm"
          maxLabel="orebro.scales.mostAnxious"
          answers={answers}
          onAnswer={onSliderChange}
        />
      );
    
    case 9:
      return (
        <SliderQuestion
          field="depression"
          questionKey="orebro.questions.depression"
          minLabel="orebro.scales.notAtAll"
          maxLabel="orebro.scales.extremely"
          answers={answers}
          onAnswer={onSliderChange}
        />
      );
    
    case 10:
      return (
        <SliderQuestion
          field="persistentRisk"
          questionKey="orebro.questions.persistentRisk"
          minLabel="orebro.scales.noRisk"
          maxLabel="orebro.scales.veryLargeRisk"
          answers={answers}
          onAnswer={onSliderChange}
        />
      );
    
    case 11:
      return (
        <SliderQuestion
          field="workChances"
          questionKey="orebro.questions.workChances"
          minLabel="orebro.scales.noChance"
          maxLabel="orebro.scales.veryLargeChance"
          answers={answers}
          onAnswer={onSliderChange}
        />
      );
    
    case 12:
      return (
        <SliderQuestion
          field="jobSatisfaction"
          questionKey="orebro.questions.jobSatisfaction"
          minLabel="orebro.scales.notSatisfied"
          maxLabel="orebro.scales.completelySatisfied"
          answers={answers}
          onAnswer={onSliderChange}
        />
      );
    
    case 13:
      return (
        <SliderQuestion
          field="physicalActivity"
          questionKey="orebro.questions.physicalActivity"
          minLabel="orebro.scales.completelyDisagree"
          maxLabel="orebro.scales.completelyAgree"
          answers={answers}
          onAnswer={onSliderChange}
        />
      );
    
    case 14:
      return (
        <SliderQuestion
          field="stopActivity"
          questionKey="orebro.questions.stopActivity"
          minLabel="orebro.scales.completelyDisagree"
          maxLabel="orebro.scales.completelyAgree"
          answers={answers}
          onAnswer={onSliderChange}
        />
      );
    
    case 15:
      return (
        <SliderQuestion
          field="normalWork"
          questionKey="orebro.questions.normalWork"
          minLabel="orebro.scales.completelyDisagree"
          maxLabel="orebro.scales.completelyAgree"
          answers={answers}
          onAnswer={onSliderChange}
        />
      );
    
    case 16:
      return (
        <SliderQuestion
          field="lightWork"
          questionKey="orebro.questions.lightWork"
          minLabel="orebro.scales.cantDoBecauseOfPain"
          maxLabel="orebro.scales.canDoWithoutPain"
          answers={answers}
          onAnswer={onSliderChange}
        />
      );
    
    case 17:
      return (
        <SliderQuestion
          field="walking"
          questionKey="orebro.questions.walking"
          minLabel="orebro.scales.cantDoBecauseOfPain"
          maxLabel="orebro.scales.canDoWithoutPain"
          answers={answers}
          onAnswer={onSliderChange}
        />
      );
    
    case 18:
      return (
        <SliderQuestion
          field="householdChores"
          questionKey="orebro.questions.householdChores"
          minLabel="orebro.scales.cantDoBecauseOfPain"
          maxLabel="orebro.scales.canDoWithoutPain"
          answers={answers}
          onAnswer={onSliderChange}
        />
      );
    
    case 19:
      return (
        <SliderQuestion
          field="shopping"
          questionKey="orebro.questions.shopping"
          minLabel="orebro.scales.cantDoBecauseOfPain"
          maxLabel="orebro.scales.canDoWithoutPain"
          answers={answers}
          onAnswer={onSliderChange}
        />
      );
    
    case 20:
      return (
        <SliderQuestion
          field="sleep"
          questionKey="orebro.questions.sleep"
          minLabel="orebro.scales.cantDoBecauseOfPain"
          maxLabel="orebro.scales.canDoWithoutPain"
          answers={answers}
          onAnswer={onSliderChange}
        />
      );
    
    default:
      return null;
  }
};