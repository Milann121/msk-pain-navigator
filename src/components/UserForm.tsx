
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserInfo } from '@/utils/types';
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
      firstName: 'Používateľ', // Default name since it's no longer collected
      age: 25, // Default age since it's no longer collected
      painArea: 'neck',
      gender: 'žena' // Default gender since it's no longer collected
    }
  });
  
  const painArea = watch('painArea');

  const handlePainAreaChange = (value: 'neck' | 'middle back' | 'lower back' | 'upper limb') => {
    setValue('painArea', value);
  };

  const handleFormSubmit = (data: UserInfo) => {
    onSubmit(data);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-blue-700">
          Dotazník bolesti
        </CardTitle>
        <CardDescription className="text-center">
          Pre začatie hodnotenia prosím vyberte oblasť bolesti
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
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
