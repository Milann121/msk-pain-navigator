
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ProfileFormPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileSaved?: () => void;
}

interface ProfileData {
  firstName: string;
  lastName: string;
  gender: string;
  age: number | '';
  job: string;
  jobSubtype: string;
}

export const ProfileFormPopup: React.FC<ProfileFormPopupProps> = ({
  isOpen,
  onClose,
  onProfileSaved
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    gender: 'Muž',
    age: '',
    job: '',
    jobSubtype: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);

  // Reset form when dialog opens
  useEffect(() => {
    if (isOpen && user) {
      setProfileData({
        firstName: user.user_metadata?.first_name || '',
        lastName: '',
        gender: 'Muž',
        age: '',
        job: '',
        jobSubtype: ''
      });
    }
  }, [isOpen, user]);

  const handleInputChange = (field: keyof ProfileData, value: string | number) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleJobChange = (value: string) => {
    setProfileData(prev => ({
      ...prev,
      job: value,
      jobSubtype: '' // Reset subtype when job changes
    }));
  };

  const handleSave = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          first_name: profileData.firstName,
          last_name: profileData.lastName,
          gender: profileData.gender,
          age: profileData.age === '' ? null : Number(profileData.age),
          job: profileData.job,
          job_subtype: profileData.jobSubtype
        });

      if (error) throw error;

      toast({
        title: 'Úspech',
        description: 'Osobné údaje boli úspešne uložené.',
      });

      onProfileSaved?.();
      onClose();
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: 'Chyba',
        description: 'Nepodarilo sa uložiť osobné údaje.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = profileData.firstName.trim() !== '';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Vyplňte vaše osobné údaje</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Meno *</Label>
              <Input
                id="firstName"
                value={profileData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="Zadajte vaše meno"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName">Priezvisko</Label>
              <Input
                id="lastName"
                value={profileData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Zadajte vaše priezvisko"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Pohlavie</Label>
            <RadioGroup 
              value={profileData.gender}
              onValueChange={(value) => handleInputChange('gender', value)}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Muž" id="muz" />
                <Label htmlFor="muz" className="cursor-pointer">Muž</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Žena" id="zena" />
                <Label htmlFor="zena" className="cursor-pointer">Žena</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Vek</Label>
            <Input
              id="age"
              type="number"
              value={profileData.age}
              onChange={(e) => handleInputChange('age', e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="Zadajte váš vek"
            />
          </div>

          <div className="space-y-4">
            <Label>Práca</Label>
            <RadioGroup 
              value={profileData.job}
              onValueChange={handleJobChange}
              className="space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="manuálna práca" id="manual-job" />
                  <Label htmlFor="manual-job" className="cursor-pointer">manuálna práca</Label>
                </div>
                {profileData.job === 'manuálna práca' && (
                  <div className="space-y-2 pl-6">
                    <Label className="text-sm font-medium">Špecifikácia:</Label>
                    <RadioGroup 
                      value={profileData.jobSubtype}
                      onValueChange={(value) => handleInputChange('jobSubtype', value)}
                      className="space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="zdvíhanie ťažkých predmetov" id="heavy-lifting-popup" />
                        <Label htmlFor="heavy-lifting-popup" className="cursor-pointer text-sm">zdvíhanie ťažkých predmetov</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="práca v stoji na mieste" id="standing-work-popup" />
                        <Label htmlFor="standing-work-popup" className="cursor-pointer text-sm">práca v stoji na mieste</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="práca v neprirodzených polohách" id="awkward-positions-popup" />
                        <Label htmlFor="awkward-positions-popup" className="cursor-pointer text-sm">práca v neprirodzených polohách</Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sedavá práca" id="desk-job" />
                  <Label htmlFor="desk-job" className="cursor-pointer">sedavá práca</Label>
                </div>
                {profileData.job === 'sedavá práca' && (
                  <div className="space-y-2 pl-6">
                    <Label className="text-sm font-medium">Špecifikácia:</Label>
                    <RadioGroup 
                      value={profileData.jobSubtype}
                      onValueChange={(value) => handleInputChange('jobSubtype', value)}
                      className="space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="práca v kancelárii" id="office-work-popup" />
                        <Label htmlFor="office-work-popup" className="cursor-pointer text-sm">práca v kancelárii</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="šofér" id="driver-popup" />
                        <Label htmlFor="driver-popup" className="cursor-pointer text-sm">šofér</Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}
              </div>
            </RadioGroup>
          </div>

          <div className="flex justify-end space-x-3 pt-6">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Zrušiť
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? 'Ukladá sa...' : 'Uložiť'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
