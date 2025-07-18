
import { UseFormRegister } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { UserInfo } from '@/utils/types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface PainAreaSectionProps {
  painArea: 'neck' | 'middle back' | 'lower back' | 'upper limb';
  handlePainAreaChange: (value: 'neck' | 'middle back' | 'lower back' | 'upper limb') => void;
  register: UseFormRegister<UserInfo>;
}

const PainAreaSection = ({
  painArea,
  handlePainAreaChange,
  register,
}: PainAreaSectionProps) => {
  const [upperLimbSubAreas, setUpperLimbSubAreas] = useState<string[]>([]);
  const { t } = useTranslation();

  const handleUpperLimbSubAreaChange = (value: string, checked: boolean) => {
    if (checked) {
      setUpperLimbSubAreas(prev => [...prev, value]);
    } else {
      setUpperLimbSubAreas(prev => prev.filter(area => area !== value));
    }
  };

  return (
    <div className="space-y-3">
      <Label>{t('assessment.painArea.specify')}</Label>
      <RadioGroup 
        defaultValue="neck" 
        value={painArea}
        onValueChange={(value) => handlePainAreaChange(value as 'neck' | 'middle back' | 'lower back' | 'upper limb')}
        className="flex flex-col space-y-3"
      >
        <div className="flex items-center space-x-3 p-2 rounded-lg border hover:bg-muted/50 transition-colors">
          <RadioGroupItem value="neck" id="neck" />
          <img 
            src="/lovable-uploads/imageAssessment/neckAssessment.png" 
            alt="Neck assessment area"
            className="w-12 h-12 object-contain"
          />
          <Label htmlFor="neck" className="cursor-pointer flex-1">{t('assessment.painArea.neck')}</Label>
        </div>
        <div className="flex items-center space-x-3 p-2 rounded-lg border hover:bg-muted/50 transition-colors">
          <RadioGroupItem value="middle back" id="middle-back" />
          <img 
            src="/lovable-uploads/imageAssessment/middleBackAssessment.png" 
            alt="Middle back assessment area"
            className="w-12 h-12 object-contain"
          />
          <Label htmlFor="middle-back" className="cursor-pointer flex-1">{t('assessment.painArea.middleBack')}</Label>
        </div>
        <div className="flex items-center space-x-3 p-2 rounded-lg border hover:bg-muted/50 transition-colors">
          <RadioGroupItem value="lower back" id="lower-back" />
          <img 
            src="/lovable-uploads/imageAssessment/lowerBackAssessment.png" 
            alt="Lower back assessment area"
            className="w-12 h-12 object-contain"
          />
          <Label htmlFor="lower-back" className="cursor-pointer flex-1">{t('assessment.painArea.lowerBack')}</Label>
        </div>
        <div className="flex items-center space-x-3 p-2 rounded-lg border hover:bg-muted/50 transition-colors">
          <RadioGroupItem value="upper limb" id="upper-limb" />
          <img 
            src="/lovable-uploads/imageAssessment/shoulderAssessment.png" 
            alt="Upper limb assessment area"
            className="w-12 h-12 object-contain"
          />
          <Label htmlFor="upper-limb" className="cursor-pointer flex-1">{t('assessment.painArea.upperLimb')}</Label>
        </div>
      </RadioGroup>

      {painArea === 'upper limb' && (
        <div className="ml-6 space-y-3">
          <Label>{t('assessment.painArea.specifyUpperLimb')}</Label>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="shoulder"
                checked={upperLimbSubAreas.includes('shoulder')}
                onCheckedChange={(checked) => 
                  handleUpperLimbSubAreaChange('shoulder', checked as boolean)
                }
              />
              <Label htmlFor="shoulder" className="cursor-pointer">{t('assessment.painArea.shoulder')}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="elbow"
                checked={upperLimbSubAreas.includes('elbow')}
                onCheckedChange={(checked) => 
                  handleUpperLimbSubAreaChange('elbow', checked as boolean)
                }
              />
              <Label htmlFor="elbow" className="cursor-pointer">{t('assessment.painArea.elbow')}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="forearm"
                checked={upperLimbSubAreas.includes('forearm')}
                onCheckedChange={(checked) => 
                  handleUpperLimbSubAreaChange('forearm', checked as boolean)
                }
              />
              <Label htmlFor="forearm" className="cursor-pointer">{t('assessment.painArea.forearm')}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="hand"
                checked={upperLimbSubAreas.includes('hand')}
                onCheckedChange={(checked) => 
                  handleUpperLimbSubAreaChange('hand', checked as boolean)
                }
              />
              <Label htmlFor="hand" className="cursor-pointer">{t('assessment.painArea.hand')}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="fingers"
                checked={upperLimbSubAreas.includes('fingers')}
                onCheckedChange={(checked) => 
                  handleUpperLimbSubAreaChange('fingers', checked as boolean)
                }
              />
              <Label htmlFor="fingers" className="cursor-pointer">{t('assessment.painArea.fingers')}</Label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PainAreaSection;
