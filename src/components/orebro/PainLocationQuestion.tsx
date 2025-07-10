import { useTranslation } from 'react-i18next';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { OrebroAnswers } from '@/types/orebro';

interface PainLocationQuestionProps {
  answers: Partial<OrebroAnswers>;
  onAnswer: (field: keyof OrebroAnswers, option: string, checked: boolean) => void;
}

export const PainLocationQuestion = ({ answers, onAnswer }: PainLocationQuestionProps) => {
  const { t } = useTranslation();

  const locations = ['neck', 'shoulder', 'arm', 'upperBack', 'lowerBack', 'leg', 'other'];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{t('orebro.questions.painLocation')}</h3>
      <div className="space-y-3">
        {locations.map((location) => (
          <div key={location} className="flex items-center space-x-2">
            <Checkbox
              id={location}
              checked={answers.painLocation?.includes(location) || false}
              onCheckedChange={(checked) => onAnswer('painLocation', location, checked as boolean)}
            />
            <Label htmlFor={location}>{t(`orebro.painLocations.${location}`)}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};