
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Edit } from 'lucide-react';

interface JobFieldProps {
  value: string;
  jobSubtype: string;
  editingField: string | null;
  tempValue: string | number;
  tempJobSubtype: string;
  onEdit: (field: string, value: string | number) => void;
  onSave: (field: string) => void;
  onCancel: () => void;
  onTempValueChange: (value: string | number) => void;
  onTempJobSubtypeChange: (value: string) => void;
}

export const JobField: React.FC<JobFieldProps> = ({
  value,
  jobSubtype,
  editingField,
  tempValue,
  tempJobSubtype,
  onEdit,
  onSave,
  onCancel,
  onTempValueChange,
  onTempJobSubtypeChange
}) => {
  const isEditing = editingField === 'job';

  if (isEditing) {
    return (
      <div className="col-span-2 space-y-4">
        <Label className="text-base font-medium">Práca:</Label>
        <RadioGroup 
          value={tempValue as string}
          onValueChange={(value) => {
            onTempValueChange(value);
            onTempJobSubtypeChange(''); // Reset subtype when job type changes
          }}
          className="space-y-3"
        >
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="manuálna práca" id="manual-job-edit" />
              <Label htmlFor="manual-job-edit" className="cursor-pointer text-sm">manuálna práca</Label>
            </div>
            {tempValue === 'manuálna práca' && (
              <div className="space-y-2 pl-6">
                <Label className="text-sm font-medium">Špecifikácia:</Label>
                <RadioGroup 
                  value={tempJobSubtype}
                  onValueChange={onTempJobSubtypeChange}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="zdvíhanie ťažkých predmetov" id="heavy-lifting" />
                    <Label htmlFor="heavy-lifting" className="cursor-pointer text-sm">zdvíhanie ťažkých predmetov</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="práca v stoji na mieste" id="standing-work" />
                    <Label htmlFor="standing-work" className="cursor-pointer text-sm">práca v stoji na mieste</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="práca v neprirodzených polohách" id="awkward-positions" />
                    <Label htmlFor="awkward-positions" className="cursor-pointer text-sm">práca v neprirodzených polohách</Label>
                  </div>
                </RadioGroup>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sedavá práca" id="desk-job-edit" />
              <Label htmlFor="desk-job-edit" className="cursor-pointer text-sm">sedavá práca</Label>
            </div>
            {tempValue === 'sedavá práca' && (
              <div className="space-y-2 pl-6">
                <Label className="text-sm font-medium">Špecifikácia:</Label>
                <RadioGroup 
                  value={tempJobSubtype}
                  onValueChange={onTempJobSubtypeChange}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="práca v kancelárii" id="office-work" />
                    <Label htmlFor="office-work" className="cursor-pointer text-sm">práca v kancelárii</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="šofér" id="driver" />
                    <Label htmlFor="driver" className="cursor-pointer text-sm">šofér</Label>
                  </div>
                </RadioGroup>
              </div>
            )}
          </div>
        </RadioGroup>
        
        <div className="flex space-x-3 pt-2">
          <Button size="sm" onClick={() => onSave('job')} className="px-6">
            Uložiť
          </Button>
          <Button size="sm" variant="outline" onClick={onCancel} className="px-6">
            Zrušiť
          </Button>
        </div>
      </div>
    );
  }

  const displayValue = value ? `${value}${jobSubtype ? ` - ${jobSubtype}` : ''}` : '-';
  
  return (
    <>
      <div className="text-sm text-muted-foreground">Práca:</div>
      <div className="flex items-center justify-between">
        <span className="font-medium">{displayValue}</span>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onEdit('job', value)}
          className="h-8 w-8 p-0"
        >
          <Edit className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
};
