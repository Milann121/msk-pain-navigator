
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

interface GoalsData {
  weeklyExerciseGoal: number | null;
  weeklyBlogGoal: number | null;
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
  
  const [goalsData, setGoalsData] = useState<GoalsData>({
    weeklyExerciseGoal: null,
    weeklyBlogGoal: null
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
      setGoalsData({
        weeklyExerciseGoal: null,
        weeklyBlogGoal: null
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

  const handleGoalChange = (field: keyof GoalsData, value: number | null) => {
    setGoalsData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveGoalToDatabase = async (goalType: 'weekly_exercise' | 'weekly_blog', value: number) => {
    if (!user) return;

    try {
      // First, check if a goal of this type already exists for the user
      const { data: existingGoal, error: selectError } = await supabase
        .from('user_goals')
        .select('id')
        .eq('user_id', user.id)
        .eq('goal_type', goalType)
        .maybeSingle();

      if (selectError) throw selectError;

      if (existingGoal) {
        // Update existing goal
        const { error: updateError } = await supabase
          .from('user_goals')
          .update({
            goal_value: value,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingGoal.id);

        if (updateError) throw updateError;
      } else {
        // Insert new goal
        const { error: insertError } = await supabase
          .from('user_goals')
          .insert({
            user_id: user.id,
            goal_type: goalType,
            goal_value: value
          });

        if (insertError) throw insertError;
      }
    } catch (error) {
      console.error('Error saving goal:', error);
      throw error;
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      // Save profile data
      const { error: profileError } = await supabase
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

      if (profileError) throw profileError;

      // Save goals if they were set
      if (goalsData.weeklyExerciseGoal !== null) {
        await saveGoalToDatabase('weekly_exercise', goalsData.weeklyExerciseGoal);
      }
      
      if (goalsData.weeklyBlogGoal !== null) {
        await saveGoalToDatabase('weekly_blog', goalsData.weeklyBlogGoal);
      }

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

  const handleSkipGoals = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      // Save only profile data without goals
      const { error: profileError } = await supabase
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

      if (profileError) throw profileError;

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

  // Generate options for dropdowns
  const exerciseOptions = Array.from({ length: 14 }, (_, i) => i + 1);
  const blogOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  // Function to get the correct word form for blogs
  const getBlogWord = (count: number | null) => {
    if (count === 1) return 'blog';
    if (count && count >= 2 && count <= 4) return 'blogy';
    return 'blogov';
  };

  // Check if all required profile fields are filled
  const isProfileValid = profileData.firstName.trim() !== '' && 
                        profileData.lastName.trim() !== '' && 
                        profileData.age !== '' && 
                        profileData.job.trim() !== '';

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Vyplňte vaše osobné údaje</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Personal Information Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-blue-800">Osobné informácie</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Meno *</Label>
                <Input
                  id="firstName"
                  value={profileData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Zadajte vaše meno"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Priezvisko *</Label>
                <Input
                  id="lastName"
                  value={profileData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Zadajte vaše priezvisko"
                  required
                />
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <Label>Pohlavie *</Label>
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

            <div className="space-y-2 mb-4">
              <Label htmlFor="age">Vek *</Label>
              <Input
                id="age"
                type="number"
                value={profileData.age}
                onChange={(e) => handleInputChange('age', e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="Zadajte váš vek"
                required
              />
            </div>

            <div className="space-y-4">
              <Label>Práca *</Label>
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
          </div>

          {/* Goals Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-blue-800">Moje ciele (voliteľné)</h3>
            <p className="text-sm text-gray-600 mb-4">Môžete si nastaviť ciele alebo ich preskočiť a nastaviť neskôr v profile.</p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-base">Týždenne chcem cvičiť</span>
                <Select 
                  value={goalsData.weeklyExerciseGoal?.toString() || ""} 
                  onValueChange={(value) => handleGoalChange('weeklyExerciseGoal', parseInt(value))}
                >
                  <SelectTrigger className="w-20 h-8">
                    <SelectValue placeholder="-" />
                  </SelectTrigger>
                  <SelectContent>
                    {exerciseOptions.map((option) => (
                      <SelectItem key={option} value={option.toString()}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-base">krát</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-base">Týždenne chcem prečítať</span>
                <Select 
                  value={goalsData.weeklyBlogGoal?.toString() || ""} 
                  onValueChange={(value) => handleGoalChange('weeklyBlogGoal', parseInt(value))}
                >
                  <SelectTrigger className="w-20 h-8">
                    <SelectValue placeholder="-" />
                  </SelectTrigger>
                  <SelectContent>
                    {blogOptions.map((option) => (
                      <SelectItem key={option} value={option.toString()}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-base">{getBlogWord(goalsData.weeklyBlogGoal)}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6">
            <Button 
              variant="outline" 
              onClick={handleSkipGoals} 
              disabled={!isProfileValid || isLoading}
            >
              {isLoading ? 'Ukladá sa...' : 'Preskočiť ciele'}
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={!isProfileValid || isLoading}
            >
              {isLoading ? 'Ukladá sa...' : 'Uložiť všetko'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
