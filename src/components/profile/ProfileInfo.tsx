
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
    age: 30
  });

  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string | number>('');

  const handleEdit = (field: string, currentValue: string | number) => {
    setEditingField(field);
    setTempValue(currentValue);
  };

  const handleSave = (field: string) => {
    setUserData(prev => ({
      ...prev,
      [field]: tempValue
    }));
    setEditingField(null);
    setTempValue('');
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue('');
  };

  const renderEditableField = (label: string, field: string, value: string | number, type: 'text' | 'number' | 'gender' = 'text') => {
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
        </div>
      </CardContent>
    </Card>
  );
};
