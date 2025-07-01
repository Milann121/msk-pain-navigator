
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from 'react-i18next';

interface GoalsData {
  weeklyExerciseGoal: number | null;
  weeklyBlogGoal: number | null;
}

interface ProfileFormGoalsProps {
  data: GoalsData;
  onChange: (field: keyof GoalsData, value: number | null) => void;
}

export const ProfileFormGoals: React.FC<ProfileFormGoalsProps> = ({
  data,
  onChange
}) => {
  const { t } = useTranslation();

  // Generate options for dropdowns
  const exerciseOptions = Array.from({ length: 14 }, (_, i) => i + 1);
  const blogOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  // Function to get the correct word form for blogs
  const getBlogWord = (count: number | null) => {
    if (count === 1) return 'blog';
    if (count && count >= 2 && count <= 4) return 'blogy';
    return 'blogov';
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 text-blue-800">{t('profile.profileForm.goalsTitle')}</h3>
      <p className="text-sm text-gray-600 mb-4">{t('profile.profileForm.goalsSubtitle')}</p>
      
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-base">{t('profile.profileForm.weeklyExercise')}</span>
          <Select 
            value={data.weeklyExerciseGoal?.toString() || ""} 
            onValueChange={(value) => onChange('weeklyExerciseGoal', parseInt(value))}
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
          <span className="text-base">{t('profile.profileForm.times')}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-base">{t('profile.profileForm.weeklyBlog')}</span>
          <Select 
            value={data.weeklyBlogGoal?.toString() || ""} 
            onValueChange={(value) => onChange('weeklyBlogGoal', parseInt(value))}
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
          <span className="text-base">{getBlogWord(data.weeklyBlogGoal)}</span>
        </div>
      </div>
    </div>
  );
};
