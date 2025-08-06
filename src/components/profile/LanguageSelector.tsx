import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  showAsRequired?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange,
  showAsRequired = false
}) => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'sk', label: 'Slovenčina' },
    { code: 'en', label: 'English' },
    { code: 'cs', label: 'Čeština' }
  ];

  const handleLanguageChange = (languageCode: string) => {
    onLanguageChange(languageCode);
    i18n.changeLanguage(languageCode);
  };

  return (
    <div className="space-y-2">
      <Label className="text-base font-medium">
        Language {showAsRequired && <span className="text-red-500">*</span>}
      </Label>
      <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
        <SelectTrigger className="bg-background border-border">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent className="bg-background border-border z-50">
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};