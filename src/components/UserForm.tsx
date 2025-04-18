import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';
import { UserInfo } from '@/utils/types';

interface UserFormProps {
  onSubmit: (data: UserInfo) => void;
}

const UserForm = ({ onSubmit }: UserFormProps) => {
  const [disclaimerConsent, setDisclaimerConsent] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<UserInfo>({
    defaultValues: {
      firstName: '',
      email: '',
      age: 0,
      painArea: 'neck'
    }
  });
  
  const painArea = watch('painArea');
  
  const handleRadioChange = (value: 'neck' | 'middle back' | 'lower back') => {
    setValue('painArea', value);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-blue-700">
          Dotazník bolesti
        </CardTitle>
        <CardDescription className="text-center">
          Pre začatie hodnotenia prosím vyplňte svoje údaje
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            <Label htmlFor="email">Emailová adresa</Label>
            <Input
              id="email"
              type="email"
              {...register('email', { 
                required: 'Email je povinný',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Prosím zadajte platný email'
                }
              })}
              placeholder="Zadajte svoj email"
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
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
            <Label>Prosím, špecifikujte presnú oblasť vašej bolesti</Label>
            <RadioGroup 
              defaultValue="neck" 
              value={painArea}
              onValueChange={(value) => handleRadioChange(value as 'neck' | 'middle back' | 'lower back')}
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
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="disclaimer"
                checked={disclaimerConsent}
                onCheckedChange={(checked) => setDisclaimerConsent(checked as boolean)}
              />
              <Label htmlFor="disclaimer" className="text-sm text-gray-600">
                Súhlasím a plne si uvedomujem, že táto aplikácia slúži len na vzdelávacie účely a nenahrádza odbornú lekársku pomoc
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="privacy"
                checked={privacyConsent}
                onCheckedChange={(checked) => setPrivacyConsent(checked as boolean)}
              />
              <Label htmlFor="privacy" className="text-sm text-gray-600">
                Súhlasím so{' '}
                <Link
                  to="/privacy-policy"
                  className="text-blue-600 hover:text-blue-800 underline"
                  target="_blank"
                >
                  spracovaním osobných údajov
                </Link>
              </Label>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={!disclaimerConsent || !privacyConsent}
          >
            Začať hodnotenie
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserForm;
