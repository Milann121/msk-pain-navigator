
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ProfileInfo = () => {
  const { user } = useAuth();
  
  // Placeholder user data - in a real app, this would come from your database
  const userData = {
    firstName: user?.user_metadata?.first_name || 'Používateľ',
    lastName: '',
    gender: 'Muž',
    age: 30
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Osobné údaje</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm text-muted-foreground">Meno:</div>
            <div className="font-medium">{userData.firstName}</div>
            
            <div className="text-sm text-muted-foreground">Priezvisko:</div>
            <div className="font-medium">{userData.lastName || '-'}</div>
            
            <div className="text-sm text-muted-foreground">Pohlavie:</div>
            <div className="font-medium">{userData.gender}</div>
            
            <div className="text-sm text-muted-foreground">Vek:</div>
            <div className="font-medium">{userData.age} rokov</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
