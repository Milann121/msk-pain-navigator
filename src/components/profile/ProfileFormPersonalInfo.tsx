
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useTranslation } from 'react-i18next';

interface PersonalInfoData {
  firstName: string;
  lastName: string;
  gender: string;
  yearOfBirth: string | null;
}

interface ProfileFormPersonalInfoProps {
  data: PersonalInfoData;
  onChange: (field: keyof PersonalInfoData, value: string | number) => void;
}

export const ProfileFormPersonalInfo: React.FC<ProfileFormPersonalInfoProps> = ({
  data,
  onChange
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <h3 className="text-base font-medium mb-3 text-blue-800">{t('profile.profileForm.personalInfo')}</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-base font-medium">
            {t('profile.profileForm.firstName')} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="firstName"
            value={data.firstName}
            onChange={(e) => onChange('firstName', e.target.value)}
            placeholder={t('profile.profileForm.firstNamePlaceholder')}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-base font-medium">
            {t('profile.profileForm.lastName')} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="lastName"
            value={data.lastName}
            onChange={(e) => onChange('lastName', e.target.value)}
            placeholder={t('profile.profileForm.lastNamePlaceholder')}
            required
          />
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <Label className="text-base font-medium">
          {t('profile.profileForm.gender')} <span className="text-red-500">*</span>
        </Label>
        <RadioGroup 
          value={data.gender}
          onValueChange={(value) => onChange('gender', value)}
          className="flex space-x-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Muž" id="muz" />
            <Label htmlFor="muz" className="cursor-pointer text-base">{t('profile.profileForm.male')}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Žena" id="zena" />
            <Label htmlFor="zena" className="cursor-pointer text-base">{t('profile.profileForm.female')}</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2 mb-4">
        <Label htmlFor="yearOfBirth" className="text-base font-medium">
          {t('profile.profileForm.yearOfBirth')} <span className="text-red-500">*</span>
        </Label>
        <Input
          id="yearOfBirth"
          type="text"
          value={data.yearOfBirth || ''}
          onChange={(e) => onChange('yearOfBirth', e.target.value)}
          placeholder={t('profile.profileForm.yearOfBirthPlaceholder')}
          required
        />
      </div>
    </div>
  );
};
