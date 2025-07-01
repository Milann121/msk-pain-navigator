
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

interface ProfileFormButtonsProps {
  isLoading: boolean;
  isProfileValid: boolean;
  onSkip: () => void;
  onSave: () => void;
}

export const ProfileFormButtons: React.FC<ProfileFormButtonsProps> = ({
  isLoading,
  isProfileValid,
  onSkip,
  onSave
}) => {
  const { t } = useTranslation();

  console.log('ProfileFormButtons render state:', { isLoading, isProfileValid });

  return (
    <div className="flex justify-end space-x-3 pt-6">
      <Button
        variant="outline"
        type="button"
        onClick={onSkip}
        disabled={!isProfileValid || isLoading}
        type="button"
      >
        {isLoading ? t('profile.profileForm.saving') : t('profile.profileForm.skip')}
      </Button>
      <Button
        type="button"
        onClick={onSave}
        disabled={!isProfileValid || isLoading}
        type="button"
      >
        {isLoading ? t('profile.profileForm.saving') : t('profile.profileForm.saveAll')}
      </Button>
    </div>
  );
};
