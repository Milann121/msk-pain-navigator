import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Edit } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface JobSectionFieldProps {
  departmentId: string;
  jobType: string;
  jobProperties: string[];
  editingField: string | null;
  tempDepartmentId: string;
  tempJobType: string;
  tempJobProperties: string[];
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onTempDepartmentChange: (value: string) => void;
  onTempJobTypeChange: (value: string) => void;
  onTempJobPropertiesChange: (value: string[]) => void;
}

interface Department {
  id: string;
  department_name: string;
}

interface JobProperty {
  id: string;
  property_name: string;
}

export const JobSectionField: React.FC<JobSectionFieldProps> = ({
  departmentId,
  jobType,
  jobProperties,
  editingField,
  tempDepartmentId,
  tempJobType,
  tempJobProperties,
  onEdit,
  onSave,
  onCancel,
  onTempDepartmentChange,
  onTempJobTypeChange,
  onTempJobPropertiesChange
}) => {
  const isEditing = editingField === 'jobSection';
  const { t } = useTranslation();
  const { user } = useAuth();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [jobPropertiesList, setJobPropertiesList] = useState<JobProperty[]>([]);
  const [departmentName, setDepartmentName] = useState('');

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;

      try {
        console.log('🔍 [JobSectionField] Loading departments and job properties...');
        
        // Load departments - rely on RLS policy to filter by user's b2b_partner_id
        const { data: companyDepartments, error: deptError } = await supabase
          .from('company_departments')
          .select('id, department_name')
          .order('department_name');

        console.log('🏬 [JobSectionField] Department query result:', {
          data: companyDepartments,
          error: deptError,
          count: companyDepartments?.length || 0
        });

        if (deptError) {
          console.error('❌ [JobSectionField] Department query error:', deptError);
        }

        setDepartments(companyDepartments || []);

        // Get current department name
        if (departmentId && companyDepartments) {
          const currentDept = companyDepartments.find(d => d.id === departmentId);
          setDepartmentName(currentDept?.department_name || '');
          console.log('🏷️ [JobSectionField] Current department:', currentDept);
        }

        // Load all job properties
        const { data: allJobProperties } = await supabase
          .from('job_properties')
          .select('id, property_name')
          .order('property_name');

        setJobPropertiesList(allJobProperties || []);
      } catch (error) {
        console.error('Error loading job data:', error);
      }
    };

    loadData();
  }, [user, departmentId]);

  const handleTempJobPropertyChange = (propertyName: string, checked: boolean) => {
    const updatedProperties = checked
      ? [...tempJobProperties, propertyName]
      : tempJobProperties.filter(prop => prop !== propertyName);
    
    onTempJobPropertiesChange(updatedProperties);
  };

  if (isEditing) {
    return (
      <div className="col-span-2 space-y-4">
        <Label className="text-base font-medium">{t('profile.jobSection.title')}:</Label>
        
        {/* Department Selection */}
        {departments.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">{t('profile.jobSection.department')}</Label>
            <Select
              value={tempDepartmentId}
              onValueChange={onTempDepartmentChange}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('profile.jobSection.departmentPlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>
                    {dept.department_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Job Type Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">{t('profile.jobSection.jobType')}</Label>
          <RadioGroup 
            value={tempJobType}
            onValueChange={onTempJobTypeChange}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="office work" id="office-work-edit" />
              <Label htmlFor="office-work-edit" className="cursor-pointer text-sm">{t('profile.jobSection.jobTypes.officeWork')}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="manual work" id="manual-work-edit" />
              <Label htmlFor="manual-work-edit" className="cursor-pointer text-sm">{t('profile.jobSection.jobTypes.manualWork')}</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Job Properties Selection */}
        {jobPropertiesList.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">{t('profile.jobSection.jobProperties')}</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
              {jobPropertiesList.map((property) => (
                <div key={property.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`temp-property-${property.id}`}
                    checked={tempJobProperties.includes(property.property_name)}
                    onCheckedChange={(checked) => 
                      handleTempJobPropertyChange(property.property_name, checked as boolean)
                    }
                  />
                  <Label 
                    htmlFor={`temp-property-${property.id}`} 
                    className="cursor-pointer text-xs"
                  >
                    {t(`profile.jobSection.jobPropertyNames.${property.property_name}`, property.property_name)}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex space-x-3 pt-2">
          <Button size="sm" onClick={onSave} className="px-6">
            {t('profile.save')}
          </Button>
          <Button size="sm" variant="outline" onClick={onCancel} className="px-6">
            {t('profile.cancel')}
          </Button>
        </div>
      </div>
    );
  }

  // Display mode
  const displayValue = () => {
    const parts = [];
    
    if (departmentName) {
      parts.push(`${t('profile.jobSection.department')}: ${departmentName}`);
    }
    
    if (jobType) {
      const translatedJobType = jobType === 'office work' 
        ? t('profile.jobSection.jobTypes.officeWork')
        : jobType === 'manual work' 
        ? t('profile.jobSection.jobTypes.manualWork')
        : jobType;
      parts.push(`${t('profile.jobSection.jobType')}: ${translatedJobType}`);
    }
    
    if (jobProperties && jobProperties.length > 0) {
      const translatedProperties = jobProperties.map(prop => 
        t(`profile.jobSection.jobPropertyNames.${prop}`, prop)
      ).join(', ');
      parts.push(`${t('profile.jobSection.jobProperties')}: ${translatedProperties}`);
    }
    
    return parts.length > 0 ? parts.join(' | ') : '-';
  };
  
  return (
    <>
      <div className="text-sm text-muted-foreground">{t('profile.job')}:</div>
      <div className="flex items-center justify-between">
        <span className="font-medium text-sm">{displayValue()}</span>
        <Button
          size="sm"
          variant="ghost"
          onClick={onEdit}
          className="h-8 w-8 p-0"
        >
          <Edit className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
};