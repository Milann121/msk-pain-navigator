import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface JobSectionData {
  departmentId: string;
  jobType: string;
  jobProperties: string[];
}

interface ProfileFormJobSectionProps {
  data: JobSectionData;
  onChange: (field: keyof JobSectionData, value: string | string[]) => void;
}

interface Department {
  id: string;
  department_name: string;
}

interface JobProperty {
  id: string;
  property_name: string;
}

export const ProfileFormJobSection: React.FC<ProfileFormJobSectionProps> = ({
  data,
  onChange
}) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [jobProperties, setJobProperties] = useState<JobProperty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;

      try {
        console.log('🔍 [ProfileFormJobSection] ENHANCED DEBUG - Starting department loading');
        console.log('🔍 [ProfileFormJobSection] User auth status:', {
          userId: user.id,
          userEmail: user.email,
          isAuthenticated: !!user
        });
        
        // Test direct department query first
        console.log('🔍 [ProfileFormJobSection] Testing direct department query...');
        const { data: allDepartments, error: allDeptError } = await supabase
          .from('company_departments')
          .select('id, department_name, b2b_partner_id')
          .limit(10);
        
        console.log('🔍 [ProfileFormJobSection] Direct department query result:', {
          departments: allDepartments,
          error: allDeptError,
          count: allDepartments?.length || 0
        });

        // Load user's company departments - first try user_profiles, then B2B employee tables
        let b2bPartnerId = null;

        // Check user_profiles first
        console.log('🔍 [ProfileFormJobSection] Checking user_profiles...');
        const { data: userProfile, error: profileError } = await supabase
          .from('user_profiles')
          .select('b2b_partner_id, b2b_partner_name')
          .eq('user_id', user.id)
          .single();

        console.log('👤 [ProfileFormJobSection] User profile query result:', {
          data: userProfile,
          error: profileError,
          b2bPartnerId: userProfile?.b2b_partner_id
        });

        if (userProfile?.b2b_partner_id) {
          b2bPartnerId = userProfile.b2b_partner_id;
          console.log('✅ [ProfileFormJobSection] Found b2b_partner_id in user_profiles:', b2bPartnerId);
        } else {
          // Check B2B employee tables if not found in profiles
          console.log('🔍 [ProfileFormJobSection] Checking b2b_employees table...');
          const { data: b2bEmployee, error: b2bError } = await supabase
            .from('b2b_employees')
            .select('b2b_partner_id, email, id')
            .eq('email', user.email)
            .maybeSingle();

          console.log('🏢 [ProfileFormJobSection] B2B employee query result:', {
            data: b2bEmployee,
            error: b2bError,
            searchEmail: user.email,
            found: !!b2bEmployee
          });

          if (b2bEmployee?.b2b_partner_id) {
            b2bPartnerId = b2bEmployee.b2b_partner_id;
            console.log('✅ [ProfileFormJobSection] Found b2b_partner_id in b2b_employees:', b2bPartnerId);
          } else {
            // Check test_2_employees table as fallback
            console.log('🔍 [ProfileFormJobSection] Checking test_2_employees table...');
            const { data: testEmployee, error: testError } = await supabase
              .from('test_2_employees')
              .select('b2b_partner_id, email, id')
              .eq('email', user.email)
              .maybeSingle();

            console.log('🧪 [ProfileFormJobSection] Test employee query result:', {
              data: testEmployee,
              error: testError,
              searchEmail: user.email,
              found: !!testEmployee
            });

            if (testEmployee?.b2b_partner_id) {
              b2bPartnerId = testEmployee.b2b_partner_id;
              console.log('✅ [ProfileFormJobSection] Found b2b_partner_id in test_2_employees:', b2bPartnerId);
            }
          }
        }

        console.log('🎯 [ProfileFormJobSection] Final b2bPartnerId determined:', b2bPartnerId);

        // Load departments using the determined b2b_partner_id
        if (b2bPartnerId) {
          console.log('🏬 [ProfileFormJobSection] Loading departments for b2b_partner_id:', b2bPartnerId);
          
          // Try direct query with explicit b2b_partner_id filter
          const { data: companyDepartments, error: deptError } = await supabase
            .from('company_departments')
            .select('id, department_name, b2b_partner_id')
            .eq('b2b_partner_id', b2bPartnerId)
            .order('department_name');

          console.log('🏬 [ProfileFormJobSection] Department query result:', {
            data: companyDepartments,
            error: deptError,
            count: companyDepartments?.length || 0,
            queryPartnerId: b2bPartnerId
          });

          if (deptError) {
            console.error('❌ [ProfileFormJobSection] Department query error details:', deptError);
          }

          setDepartments(companyDepartments || []);
        } else {
          console.log('❌ [ProfileFormJobSection] No b2b_partner_id found, departments will not load');
          console.log('🔍 [ProfileFormJobSection] Debug summary - user needs B2B setup');
        }

        // Load all job properties
        const { data: allJobProperties } = await supabase
          .from('job_properties')
          .select('id, property_name')
          .order('property_name');

        setJobProperties(allJobProperties || []);
      } catch (error) {
        console.error('Error loading job data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  const handleJobPropertyChange = (propertyName: string, checked: boolean) => {
    const currentProperties = data.jobProperties || [];
    const updatedProperties = checked
      ? [...currentProperties, propertyName]
      : currentProperties.filter(prop => prop !== propertyName);
    
    onChange('jobProperties', updatedProperties);
  };

  if (loading) {
    return <div className="text-sm text-muted-foreground">{t('loading')}...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Department Selection */}
      {departments.length > 0 && (
        <div className="space-y-2">
          <Label className="text-base font-medium">{t('profile.jobSection.department')}</Label>
          <Select
            value={data.departmentId}
            onValueChange={(value) => onChange('departmentId', value)}
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
        <Label className="text-base font-medium">{t('profile.jobSection.jobType')}</Label>
        <RadioGroup 
          value={data.jobType}
          onValueChange={(value) => onChange('jobType', value)}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="office work" id="office-work" />
            <Label htmlFor="office-work" className="cursor-pointer">{t('profile.jobSection.jobTypes.officeWork')}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="manual work" id="manual-work" />
            <Label htmlFor="manual-work" className="cursor-pointer">{t('profile.jobSection.jobTypes.manualWork')}</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Job Properties Selection */}
      {jobProperties.length > 0 && (
        <div className="space-y-2">
          <Label className="text-base font-medium">{t('profile.jobSection.jobProperties')}</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {jobProperties.map((property) => (
              <div key={property.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`property-${property.id}`}
                  checked={data.jobProperties?.includes(property.property_name) || false}
                  onCheckedChange={(checked) => 
                    handleJobPropertyChange(property.property_name, checked as boolean)
                  }
                />
                <Label 
                  htmlFor={`property-${property.id}`} 
                  className="cursor-pointer text-sm"
                >
                  {t(`profile.jobSection.jobPropertyNames.${property.property_name}`, property.property_name)}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};