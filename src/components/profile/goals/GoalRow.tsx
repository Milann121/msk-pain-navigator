
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface GoalRowProps {
  text: string;
  field: string;
  goalValue: number | null;
  onGoalChange: (value: string) => void;
  options: number[];
  isEditing: boolean;
  tempValue: number | null;
  onEdit: (field: string, currentValue: number | null) => void;
  onSave: (field: string) => void;
  onCancel: () => void;
  onTempValueChange: (value: number | null) => void;
  loading: boolean;
}

export const GoalRow = ({ 
  text, 
  field,
  goalValue, 
  onGoalChange, 
  options,
  isEditing,
  tempValue,
  onEdit,
  onSave,
  onCancel,
  onTempValueChange,
  loading
}: GoalRowProps) => {
  const { t } = useTranslation();

  // Function to get the correct word form for blogs in Slovak/Czech
  const getBlogWord = (count: number | null) => {
    if (!count) return 'blogov';
    if (count === 1) return 'blog';
    if (count >= 2 && count <= 4) return 'blogy';
    return 'blogov';
  };

  // Handle dynamic text for blog reading goal
  const getDisplayText = () => {
    if (field === 'weeklyBlogGoal') {
      const blogWord = isEditing ? getBlogWord(tempValue) : getBlogWord(goalValue);
      return t('profile.goals.blogGoal').replace('{dropdown}', '{dropdown}').replace('blogov', blogWord);
    }
    return text;
  };

  const displayText = getDisplayText();

  if (isEditing) {
    return (
      <div className="py-3 border-b border-gray-100 last:border-b-0">
        <div className="flex flex-col gap-3">
          {/* Text and dropdown row */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-base">
              {displayText.split('{dropdown}')[0]}
            </span>
            <Select value={tempValue?.toString() || ""} onValueChange={(value) => onTempValueChange(parseInt(value))}>
              <SelectTrigger className="w-20 h-8">
                <SelectValue placeholder="-" />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option} value={option.toString()}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-base">
              {displayText.split('{dropdown}')[1]}
            </span>
          </div>
          
          {/* Buttons row - stacked on mobile */}
          <div className="flex gap-2 flex-col sm:flex-row">
            <Button 
              size="default" 
              onClick={() => onSave(field)} 
              className="px-4 h-8 flex-1 sm:flex-none"
              disabled={loading}
            >
              {t('profile.save')}
            </Button>
            <Button 
              size="default" 
              variant="outline" 
              onClick={onCancel} 
              className="px-4 h-8 flex-1 sm:flex-none"
              disabled={loading}
            >
              {t('profile.cancel')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center py-3 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center gap-2 flex-1">
        <span className="text-base">
          {displayText.split('{dropdown}')[0]}
        </span>
        <div className="w-20 h-8 px-3 py-2 border rounded-md bg-muted text-sm flex items-center justify-center">
          {goalValue || '-'}
        </div>
        <span className="text-base">
          {displayText.split('{dropdown}')[1]}
        </span>
      </div>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => onEdit(field, goalValue)}
        className="h-8 w-8 p-0"
        disabled={loading}
      >
        <Edit className="h-4 w-4" />
      </Button>
    </div>
  );
};
