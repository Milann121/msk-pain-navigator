
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserInfo } from '@/utils/types';
import PersonalInfoSection from './form-sections/PersonalInfoSection';
import PainAreaSection from './form-sections/PainAreaSection';
import ConsentSection from './form-sections/ConsentSection';

interface UserFormProps {
  onSubmit: (data: UserInfo) => void;
}

const UserForm = ({ onSubmit }: UserFormProps) => {
  const [disclaimerConsent, setDisclaimerConsent] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<UserInfo>({
    defaultValues: {
      firstName: '',
      age: 0,
      painArea: 'neck',
      gender: 'žena'
    }
  });
  
  const painArea = watch('painArea');
  const gender = watch('gender');

  const handlePainAreaChange = (value: 'neck' | 'middle back' | 'lower back') => {
    setValue('painArea', value);
  };

  const handleGenderChange = (value: 'muž' | 'žena') => {
    setValue('gender', value);
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
          <PersonalInfoSection
            register={register}
            errors={errors}
            gender={gender}
            handleGenderChange={handleGenderChange}
          />
          
          <PainAreaSection
            painArea={painArea}
            handlePainAreaChange={handlePainAreaChange}
            register={register}
          />
          
          <ConsentSection
            disclaimerConsent={disclaimerConsent}
            privacyConsent={privacyConsent}
            setDisclaimerConsent={setDisclaimerConsent}
            setPrivacyConsent={setPrivacyConsent}
          />
          
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
