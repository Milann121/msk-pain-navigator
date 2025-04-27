
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UserInfo } from '@/utils/types';

interface PersonalInfoSectionProps {
  register: UseFormRegister<UserInfo>;
  errors: FieldErrors<UserInfo>;
  gender: 'muž' | 'žena';
  handleGenderChange: (value: 'muž' | 'žena') => void;
}

const PersonalInfoSection = ({
  register,
  errors,
  gender,
  handleGenderChange,
}: PersonalInfoSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="firstName">Meno</Label>
        <Input
          id="firstName"
          {...register('firstName', { required: 'Meno je povinné' })}
          placeholder="Zadajte svoje meno"
          className={errors.firstName ? 'border-red-500' : ''}
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="age">Vek</Label>
        <Input
          id="age"
          type="number"
          {...register('age', {
            required: 'Vek je povinný',
            min: {
              value: 18,
              message: 'Vek musí byť aspoň 18'
            },
            max: {
              value: 100,
              message: 'Vek musí byť maximálne 100'
            }
          })}
          placeholder="Zadajte svoj vek"
          className={errors.age ? 'border-red-500' : ''}
        />
        {errors.age && (
          <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
        )}
      </div>

      <div className="space-y-3">
        <Label>Pohlavie</Label>
        <RadioGroup 
          defaultValue="žena" 
          value={gender}
          onValueChange={(value) => handleGenderChange(value as 'muž' | 'žena')}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="žena" id="zena" />
            <Label htmlFor="zena" className="cursor-pointer">Žena</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="muž" id="muz" />
            <Label htmlFor="muz" className="cursor-pointer">Muž</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
