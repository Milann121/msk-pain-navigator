import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import * as XLSX from 'xlsx';

export const useDownloadPersonalData = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadPersonalData = async () => {
    if (!user) {
      toast({
        title: t('profile.error'),
        description: 'User not authenticated',
        variant: 'destructive',
      });
      return;
    }

    setIsDownloading(true);

    try {
      // Fetch user profile data
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError;
      }

      // Fetch department data if available
      let departmentName = '';
      if (profileData?.department_id) {
        const { data: deptData } = await supabase
          .from('company_departments')
          .select('department_name')
          .eq('id', profileData.department_id)
          .single();
        
        departmentName = deptData?.department_name || '';
      }

      // Fetch B2B employee data if available
      const { data: b2bData } = await supabase
        .from('b2b_employees')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // Prepare data for Excel export
      const personalData = [
        [t('profile.personalData'), ''],
        ['', ''],
        [t('profile.employerName'), b2bData?.b2b_partner_name || ''],
        [t('profile.employeeId'), b2bData?.employee_id || ''],
        [t('profile.firstName'), profileData?.first_name || ''],
        [t('profile.lastName'), profileData?.last_name || ''],
        [t('profile.emailAddress'), profileData?.email || user.email || ''],
        [t('profile.yearOfBirth'), profileData?.year_birth || ''],
        [t('profile.gender'), profileData?.gender || ''],
        ['', ''],
        [t('profile.jobInfo'), ''],
        [t('profile.department'), departmentName],
        [t('profile.jobType'), profileData?.job_type || ''],
        [t('profile.jobProperties'), profileData?.job_properties || ''],
        [t('profile.painArea'), profileData?.pain_area || ''],
        ['', ''],
        [t('profile.exportedAt'), new Date().toLocaleString()]
      ];

      // Create workbook and worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.aoa_to_sheet(personalData);

      // Style the header
      worksheet['A1'] = { v: t('profile.personalData'), t: 's' };
      worksheet['A11'] = { v: t('profile.jobInfo'), t: 's' };

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, t('profile.personalData'));

      // Generate filename with timestamp
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `personal_data_${timestamp}.xlsx`;

      // Download the file
      XLSX.writeFile(workbook, filename);

      toast({
        title: t('profile.success'),
        description: t('profile.downloadSuccess'),
      });
    } catch (error) {
      console.error('Error downloading personal data:', error);
      toast({
        title: t('profile.error'),
        description: t('profile.downloadError'),
        variant: 'destructive',
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return {
    downloadPersonalData,
    isDownloading
  };
};