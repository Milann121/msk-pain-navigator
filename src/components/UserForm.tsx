
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserInfo } from '@/utils/types';
import PainAreaSection from './form-sections/PainAreaSection';
import ConsentSection from './form-sections/ConsentSection';
import { useTranslation } from 'react-i18next';

interface UserFormProps {
  onSubmit: (data: UserInfo) => void;
}

const UserForm = ({ onSubmit }: UserFormProps) => {
  const { t } = useTranslation();
  const [disclaimerConsent, setDisclaimerConsent] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<UserInfo>({
    defaultValues: {
      name: 'Používateľ', // Changed from firstName to name
      age: 25,
      painArea: 'neck',
      gender: 'female'
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
        <CardTitle className="text-center text-2xl font-bold text-primary">
          {t('assessment.painQuestionnaireTitle')}
        </CardTitle>
        <CardDescription className="text-center">
          {t('assessment.painQuestionnaireSubtitle')}
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
            className="w-full bg-accent hover:bg-accent/90"
            disabled={!disclaimerConsent || !privacyConsent}
          >
            {t('assessment.startAssessment')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserForm;
