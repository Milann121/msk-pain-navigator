
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EditableField } from './EditableField';
import { GenderField } from './GenderField';
import { JobField } from './JobField';

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
        [field]: String(tempValue),
        jobSubtype: tempJobSubtype
      }));
    } else {
      setUserData(prev => ({
        ...prev,
        [field]: field === 'age' ? Number(tempValue) : String(tempValue)
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

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Osobné údaje</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <EditableField
              label="Meno"
              field="firstName"
              value={userData.firstName}
              editingField={editingField}
              tempValue={tempValue}
              onEdit={handleEdit}
              onSave={handleSave}
              onCancel={handleCancel}
              onTempValueChange={setTempValue}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <EditableField
              label="Priezvisko"
              field="lastName"
              value={userData.lastName}
              editingField={editingField}
              tempValue={tempValue}
              onEdit={handleEdit}
              onSave={handleSave}
              onCancel={handleCancel}
              onTempValueChange={setTempValue}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <EditableField
              label="Vek"
              field="age"
              value={userData.age}
              type="number"
              editingField={editingField}
              tempValue={tempValue}
              onEdit={handleEdit}
              onSave={handleSave}
              onCancel={handleCancel}
              onTempValueChange={setTempValue}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <GenderField
              value={userData.gender}
              editingField={editingField}
              tempValue={tempValue}
              onEdit={handleEdit}
              onSave={handleSave}
              onCancel={handleCancel}
              onTempValueChange={setTempValue}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <JobField
              value={userData.job}
              jobSubtype={userData.jobSubtype}
              editingField={editingField}
              tempValue={tempValue}
              tempJobSubtype={tempJobSubtype}
              onEdit={handleEdit}
              onSave={handleSave}
              onCancel={handleCancel}
              onTempValueChange={setTempValue}
              onTempJobSubtypeChange={setTempJobSubtype}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
