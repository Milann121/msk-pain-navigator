
import { UseFormRegister } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
  const [upperLimbSubArea, setUpperLimbSubArea] = useState<string>('');

  const handleUpperLimbSubAreaChange = (value: string) => {
    setUpperLimbSubArea(value);
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
          <RadioGroup 
            value={upperLimbSubArea}
            onValueChange={handleUpperLimbSubAreaChange}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="shoulder" id="shoulder" />
              <Label htmlFor="shoulder" className="cursor-pointer">Rameno</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="elbow" id="elbow" />
              <Label htmlFor="elbow" className="cursor-pointer">Lakeť</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="forearm" id="forearm" />
              <Label htmlFor="forearm" className="cursor-pointer">Predlaktie</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="hand" id="hand" />
              <Label htmlFor="hand" className="cursor-pointer">Ruka</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fingers" id="fingers" />
              <Label htmlFor="fingers" className="cursor-pointer">Prsty</Label>
            </div>
          </RadioGroup>
        </div>
      )}
    </div>
  );
};

export default PainAreaSection;
