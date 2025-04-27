
import { UseFormRegister } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UserInfo } from '@/utils/types';

interface PainAreaSectionProps {
  painArea: 'neck' | 'middle back' | 'lower back';
  handlePainAreaChange: (value: 'neck' | 'middle back' | 'lower back') => void;
  register: UseFormRegister<UserInfo>;
}

const PainAreaSection = ({
  painArea,
  handlePainAreaChange,
  register,
}: PainAreaSectionProps) => {
  return (
    <div className="space-y-3">
      <Label>Prosím, špecifikujte presnú oblasť vašej bolesti</Label>
      <RadioGroup 
        defaultValue="neck" 
        value={painArea}
        onValueChange={(value) => handlePainAreaChange(value as 'neck' | 'middle back' | 'lower back')}
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
      </RadioGroup>
    </div>
  );
};

export default PainAreaSection;
