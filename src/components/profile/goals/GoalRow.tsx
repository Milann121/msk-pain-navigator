
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
      <div className="py-4 border-b border-gray-100 last:border-b-0">
        <div className="space-y-4">
          {/* Goal sentence with inline editing */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-base">
              <span className="text-gray-800">
                {displayText.split('{dropdown}')[0]}
              </span>
              <Select value={tempValue?.toString() || ""} onValueChange={(value) => onTempValueChange(parseInt(value))}>
                <SelectTrigger className="w-20 h-9 bg-white border-blue-300 focus:border-blue-500">
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
              <span className="text-gray-800">
                {displayText.split('{dropdown}')[1]}
              </span>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex gap-2 justify-end">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={onCancel} 
              className="px-4"
              disabled={loading}
            >
              {t('profile.cancel')}
            </Button>
            <Button 
              size="sm" 
              onClick={() => onSave(field)} 
              className="px-4"
              disabled={loading}
            >
              {t('profile.save')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4 border-b border-gray-100 last:border-b-0">
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 group hover:bg-gray-100 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Goal sentence */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-base">
            <span className="text-gray-800">
              {displayText.split('{dropdown}')[0]}
            </span>
            <div className="inline-flex items-center gap-2">
              <div className="w-12 h-8 px-2 py-1 bg-white border border-gray-300 rounded-md text-sm font-semibold text-blue-600 flex items-center justify-center">
                {goalValue || '-'}
              </div>
              <span className="text-gray-800">
                {displayText.split('{dropdown}')[1]}
              </span>
            </div>
          </div>
          
          {/* Edit button */}
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onEdit(field, goalValue)}
            className="h-8 w-8 p-0 opacity-70 group-hover:opacity-100 transition-opacity self-end sm:self-center"
            disabled={loading}
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
