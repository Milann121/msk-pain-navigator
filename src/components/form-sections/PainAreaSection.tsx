
import { UseFormRegister } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { UserInfo } from '@/utils/types';
import { useState } from 'react';

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

  const handleUpperLimbSubAreaChange = (value: string, checked: boolean) => {
    if (checked) {
      setUpperLimbSubAreas(prev => [...prev, value]);
    } else {
      setUpperLimbSubAreas(prev => prev.filter(area => area !== value));
    }
  };

  return (
    <div className="space-y-3">
      <Label>Prosím, špecifikujte presnú oblasť vašej bolesti</Label>
      <RadioGroup 
        defaultValue="neck" 
        value={painArea}
        onValueChange={(value) => handlePainAreaChange(value as 'neck' | 'middle back' | 'lower back' | 'upper limb')}
        className="flex flex-col space-y-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="neck" id="neck" />
          <Label htmlFor="neck" className="cursor-pointer">Krčná chrbtica</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="middle back" id="middle-back" />
          <Label htmlFor="middle-back" className="cursor-pointer">Hrudná chrbtica</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="lower back" id="lower-back" />
          <Label htmlFor="lower-back" className="cursor-pointer">Drieková chrbtica</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="upper limb" id="upper-limb" />
          <Label htmlFor="upper-limb" className="cursor-pointer">Horná končatina</Label>
        </div>
      </RadioGroup>

      {painArea === 'upper limb' && (
        <div className="ml-6 space-y-3">
          <Label>Špecifikujte oblasť hornej končatiny:</Label>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="shoulder"
                checked={upperLimbSubAreas.includes('shoulder')}
                onCheckedChange={(checked) => 
                  handleUpperLimbSubAreaChange('shoulder', checked as boolean)
                }
              />
              <Label htmlFor="shoulder" className="cursor-pointer">Rameno</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="elbow"
                checked={upperLimbSubAreas.includes('elbow')}
                onCheckedChange={(checked) => 
                  handleUpperLimbSubAreaChange('elbow', checked as boolean)
                }
              />
              <Label htmlFor="elbow" className="cursor-pointer">Lakeť</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="forearm"
                checked={upperLimbSubAreas.includes('forearm')}
                onCheckedChange={(checked) => 
                  handleUpperLimbSubAreaChange('forearm', checked as boolean)
                }
              />
              <Label htmlFor="forearm" className="cursor-pointer">Predlaktie</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="hand"
                checked={upperLimbSubAreas.includes('hand')}
                onCheckedChange={(checked) => 
                  handleUpperLimbSubAreaChange('hand', checked as boolean)
                }
              />
              <Label htmlFor="hand" className="cursor-pointer">Ruka</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="fingers"
                checked={upperLimbSubAreas.includes('fingers')}
                onCheckedChange={(checked) => 
                  handleUpperLimbSubAreaChange('fingers', checked as boolean)
                }
              />
              <Label htmlFor="fingers" className="cursor-pointer">Prsty</Label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PainAreaSection;
