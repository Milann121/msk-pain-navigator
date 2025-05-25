
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Edit } from 'lucide-react';

export const ProfileInfo = () => {
  const { user } = useAuth();
  
  // Placeholder user data - in a real app, this would come from your database
  const [userData, setUserData] = useState({
    firstName: user?.user_metadata?.first_name || 'Používateľ',
    lastName: '',
    gender: 'Muž',
    age: 30,
    job: '',
    jobSubtype: ''
  });

  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string | number>('');
  const [tempJobSubtype, setTempJobSubtype] = useState<string>('');

  const handleEdit = (field: string, currentValue: string | number) => {
    setEditingField(field);
    setTempValue(currentValue);
    if (field === 'job') {
      setTempJobSubtype(userData.jobSubtype);
    }
  };

  const handleSave = (field: string) => {
    if (field === 'job') {
      setUserData(prev => ({
        ...prev,
        [field]: tempValue,
        jobSubtype: tempJobSubtype
      }));
    } else {
      setUserData(prev => ({
        ...prev,
        [field]: tempValue
      }));
    }
    setEditingField(null);
    setTempValue('');
    setTempJobSubtype('');
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue('');
    setTempJobSubtype('');
  };

  const getJobSubtypeOptions = (jobType: string) => {
    if (jobType === 'manuálna práca') {
      return ['zdvíhanie ťažkých predmetov', 'práca v stoji na mieste', 'práca v neprirodzených polohách'];
    } else if (jobType === 'sedavá práca') {
      return ['práca v kancelárii', 'šofér'];
    }
    return [];
  };

  const renderEditableField = (label: string, field: string, value: string | number, type: 'text' | 'number' | 'gender' | 'job' = 'text') => {
    const isEditing = editingField === field;

    if (isEditing) {
      if (type === 'gender') {
        return (
          <div className="col-span-2 space-y-3">
            <Label className="text-base font-medium">{label}:</Label>
            <RadioGroup 
              value={tempValue as string}
              onValueChange={(value) => setTempValue(value)}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Muž" id="muz-edit" />
                <Label htmlFor="muz-edit" className="cursor-pointer text-sm">Muž</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Žena" id="zena-edit" />
                <Label htmlFor="zena-edit" className="cursor-pointer text-sm">Žena</Label>
              </div>
            </RadioGroup>
            <div className="flex space-x-3 pt-2">
              <Button size="sm" onClick={() => handleSave(field)} className="px-6">
                Uložiť
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancel} className="px-6">
                Zrušiť
              </Button>
            </div>
          </div>
        );
      }

      if (type === 'job') {
        const subtypeOptions = getJobSubtypeOptions(tempValue as string);
        
        return (
          <div className="col-span-2 space-y-4">
            <Label className="text-base font-medium">{label}:</Label>
            <RadioGroup 
              value={tempValue as string}
              onValueChange={(value) => {
                setTempValue(value);
                setTempJobSubtype(''); // Reset subtype when job type changes
              }}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="manuálna práca" id="manual-job-edit" />
                <Label htmlFor="manual-job-edit" className="cursor-pointer text-sm">manuálna práca</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sedavá práca" id="desk-job-edit" />
                <Label htmlFor="desk-job-edit" className="cursor-pointer text-sm">sedavá práca</Label>
              </div>
            </RadioGroup>
            
            {subtypeOptions.length > 0 && (
              <div className="space-y-3 pl-6">
                <Label className="text-sm font-medium">Špecifikácia:</Label>
                <RadioGroup 
                  value={tempJobSubtype}
                  onValueChange={setTempJobSubtype}
                  className="space-y-2"
                >
                  {subtypeOptions.map((option, index) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`subtype-${index}`} />
                      <Label htmlFor={`subtype-${index}`} className="cursor-pointer text-sm">{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
            
            <div className="flex space-x-3 pt-2">
              <Button size="sm" onClick={() => handleSave(field)} className="px-6">
                Uložiť
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancel} className="px-6">
                Zrušiť
              </Button>
            </div>
          </div>
        );
      }

      return (
        <div className="col-span-2 space-y-3">
          <Label className="text-base font-medium">{label}:</Label>
          <div className="flex items-center space-x-3">
            <Input
              type={type}
              value={tempValue}
              onChange={(e) => setTempValue(type === 'number' ? Number(e.target.value) : e.target.value)}
              className="flex-1 h-11 text-base"
              autoFocus
              placeholder={`Zadajte ${label.toLowerCase()}`}
            />
            <Button size="sm" onClick={() => handleSave(field)} className="px-6 h-11">
              Uložiť
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancel} className="px-6 h-11">
              Zrušiť
            </Button>
          </div>
        </div>
      );
    }

    // Display mode
    if (type === 'job') {
      const displayValue = value ? `${value}${userData.jobSubtype ? ` - ${userData.jobSubtype}` : ''}` : '-';
      return (
        <>
          <div className="text-sm text-muted-foreground">{label}:</div>
          <div className="flex items-center justify-between">
            <span className="font-medium">{displayValue}</span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleEdit(field, value)}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </>
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
            onClick={() => handleEdit(field, value)}
            className="h-8 w-8 p-0"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </>
    );
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Osobné údaje</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {renderEditableField('Meno', 'firstName', userData.firstName)}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {renderEditableField('Priezvisko', 'lastName', userData.lastName)}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {renderEditableField('Vek', 'age', userData.age, 'number')}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {renderEditableField('Pohlavie', 'gender', userData.gender, 'gender')}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {renderEditableField('Práca', 'job', userData.job, 'job')}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
