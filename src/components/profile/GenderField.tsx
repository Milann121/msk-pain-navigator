
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Edit, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface GenderFieldProps {
  value: string;
  editingField: string | null;
  tempValue: string | number;
  onEdit: (field: string, value: string | number) => void;
  onSave: (field: string) => void;
  onCancel: () => void;
  onTempValueChange: (value: string | number) => void;
  onDelete?: (field: string) => void;
}

export const GenderField: React.FC<GenderFieldProps> = ({
  value,
  editingField,
  tempValue,
  onEdit,
  onSave,
  onCancel,
  onTempValueChange,
  onDelete
}) => {
  const isEditing = editingField === 'gender';
  const { t } = useTranslation();

  // Function to translate gender values from database to current language
  const translateGenderValue = (genderValue: string) => {
    switch (genderValue) {
      case 'Muž':
        return t('profile.male');
      case 'Žena':
        return t('profile.female');
      default:
        return genderValue;
    }
  };

  if (isEditing) {
    return (
      <div className="col-span-2 space-y-3">
        <Label className="text-base font-medium">{t('profile.gender')}:</Label>
        <RadioGroup 
          value={tempValue as string}
          onValueChange={(value) => onTempValueChange(value)}
          className="flex space-x-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Muž" id="muz-edit" />
            <Label htmlFor="muz-edit" className="cursor-pointer text-sm">{t('profile.male')}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Žena" id="zena-edit" />
            <Label htmlFor="zena-edit" className="cursor-pointer text-sm">{t('profile.female')}</Label>
          </div>
        </RadioGroup>
        <div className="flex space-x-3 pt-2">
          <Button size="sm" onClick={() => onSave('gender')} className="px-6">
            {t('profile.save')}
          </Button>
          <Button size="sm" variant="outline" onClick={onCancel} className="px-6">
            {t('profile.cancel')}
          </Button>
          {onDelete && (
            <Button 
              size="sm" 
              variant="destructive" 
              onClick={() => onDelete('gender')} 
              className="px-3"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Translate the display value
  const translatedGenderValue = value ? translateGenderValue(value) : '';
  const displayValue = translatedGenderValue || '-';

  return (
    <>
      <div className="text-sm text-muted-foreground">{t('profile.gender')}:</div>
      <div className="flex items-center justify-between">
        <span className="font-medium">{displayValue}</span>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onEdit('gender', value)}
          className="h-8 w-8 p-0"
        >
          <Edit className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
};
