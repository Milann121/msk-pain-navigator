
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useTranslation } from 'react-i18next';

interface JobData {
  job: string;
  jobSubtype: string;
}

interface ProfileFormJobSelectionProps {
  data: JobData;
  onJobChange: (value: string) => void;
  onSubtypeChange: (field: keyof JobData, value: string) => void;
}

export const ProfileFormJobSelection: React.FC<ProfileFormJobSelectionProps> = ({
  data,
  onJobChange,
  onSubtypeChange
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <Label>{t('profile.profileForm.job')}</Label>
      <RadioGroup 
        value={data.job}
        onValueChange={onJobChange}
        className="space-y-3"
      >
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="manuálna práca" id="manual-job" />
            <Label htmlFor="manual-job" className="cursor-pointer">{t('profile.profileForm.manual')}</Label>
          </div>
          {data.job === 'manuálna práca' && (
            <div className="space-y-2 pl-6">
              <Label className="text-sm font-medium">{t('profile.profileForm.manualSpec')}</Label>
              <RadioGroup 
                value={data.jobSubtype}
                onValueChange={(value) => onSubtypeChange('jobSubtype', value)}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="zdvíhanie ťažkých predmetov" id="heavy-lifting-popup" />
                  <Label htmlFor="heavy-lifting-popup" className="cursor-pointer text-sm">{t('profile.profileForm.heavyLifting')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="práca v stoji na mieste" id="standing-work-popup" />
                  <Label htmlFor="standing-work-popup" className="cursor-pointer text-sm">{t('profile.profileForm.standingWork')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="práca v neprirodzených polohách" id="awkward-positions-popup" />
                  <Label htmlFor="awkward-positions-popup" className="cursor-pointer text-sm">{t('profile.profileForm.awkwardPositions')}</Label>
                </div>
              </RadioGroup>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sedavá práca" id="desk-job" />
            <Label htmlFor="desk-job" className="cursor-pointer">{t('profile.profileForm.desk')}</Label>
          </div>
          {data.job === 'sedavá práca' && (
            <div className="space-y-2 pl-6">
              <Label className="text-sm font-medium">{t('profile.profileForm.manualSpec')}</Label>
              <RadioGroup 
                value={data.jobSubtype}
                onValueChange={(value) => onSubtypeChange('jobSubtype', value)}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="práca v kancelárii" id="office-work-popup" />
                  <Label htmlFor="office-work-popup" className="cursor-pointer text-sm">{t('profile.profileForm.officeWork')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="šofér" id="driver-popup" />
                  <Label htmlFor="driver-popup" className="cursor-pointer text-sm">{t('profile.profileForm.driver')}</Label>
                </div>
              </RadioGroup>
            </div>
          )}
        </div>
      </RadioGroup>
    </div>
  );
};
