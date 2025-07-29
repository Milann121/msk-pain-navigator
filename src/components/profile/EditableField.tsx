
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface EditableFieldProps {
  label: string;
  field: string;
  value: string | number;
  type?: 'text' | 'number';
  editingField: string | null;
  tempValue: string | number;
  onEdit: (field: string, value: string | number) => void;
  onSave: (field: string) => void;
  onCancel: () => void;
  onTempValueChange: (value: string | number) => void;
  onDelete?: (field: string) => void;
}

export const EditableField: React.FC<EditableFieldProps> = ({
  label,
  field,
  value,
  type = 'text',
  editingField,
  tempValue,
  onEdit,
  onSave,
  onCancel,
  onTempValueChange,
  onDelete
}) => {
  const isEditing = editingField === field;
  const { t } = useTranslation();

  if (isEditing) {
    return (
      <div className="col-span-2 space-y-3">
        <Label className="text-base font-medium">{label}:</Label>
        <div className="flex items-center space-x-3">
          <Input
            type={type}
            value={tempValue}
            onChange={(e) => onTempValueChange(type === 'number' ? (e.target.value === '' ? '' : Number(e.target.value)) : e.target.value)}
            className="flex-1 h-11 text-base"
            autoFocus
            placeholder={t('profile.savePlaceholder', { field: label.toLowerCase() })}
          />
          <Button size="sm" onClick={() => onSave(field)} className="px-6 h-11">
            {t('profile.save')}
          </Button>
          <Button size="sm" variant="outline" onClick={onCancel} className="px-6 h-11">
            {t('profile.cancel')}
          </Button>
          {onDelete && (
            <Button 
              size="sm" 
              variant="destructive" 
              onClick={() => onDelete(field)} 
              className="px-3 h-11"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="text-sm text-muted-foreground">{label}:</div>
      <div className="flex items-center justify-between">
        <span className="font-medium">{value || '-'}</span>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onEdit(field, value)}
          className="h-8 w-8 p-0"
        >
          <Edit className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
};
