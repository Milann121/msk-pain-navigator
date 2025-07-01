
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';

export const useB2BEmployeeVerification = () => {
  const [employers, setEmployers] = useState<string[]>([]);
  const [showEmployerDropdown, setShowEmployerDropdown] = useState(false);
  const [isEmployeeVerified, setIsEmployeeVerified] = useState(false);
  const [isVerifyingEmployee, setIsVerifyingEmployee] = useState(false);
  const [verifiedEmployeeRecord, setVerifiedEmployeeRecord] = useState<any>(null);
  const { toast } = useToast();
  const { t } = useTranslation();

  const searchEmployers = async (query: string) => {
    if (query.length < 3) {
      setEmployers([]);
      setShowEmployerDropdown(false);
      return;
    }

    try {
      console.log('Searching for employers with query:', query);
      
      const { data: partners, error: partnersError } = await supabase
        .from('B2B_partners')
        .select('name')
        .ilike('name', `%${query}%`)
        .limit(10);

      const { data: employees, error: employeesError } = await supabase
        .from('b2b_employees')
        .select('b2b_partner_name')
        .ilike('b2b_partner_name', `%${query}%`)
        .limit(10);

      if (partnersError) {
        console.error('Error searching partners:', partnersError);
      }
      if (employeesError) {
        console.error('Error searching employees:', employeesError);
      }

      const partnerNames = partners?.map(p => p.name) || [];
      const employeePartnerNames = employees?.map(e => e.b2b_partner_name) || [];
      const allNames = [...new Set([...partnerNames, ...employeePartnerNames])];
      
      console.log('Found employers:', allNames);
      setEmployers(allNames);
      setShowEmployerDropdown(allNames.length > 0);
    } catch (error) {
      console.error('Error searching employers:', error);
    }
  };

  const verifyEmployeeCredentials = async (companyName?: string, empId?: string, employerName?: string, employeeId?: string) => {
    const nameToVerify = companyName || employerName;
    const idToVerify = empId || employeeId;
    
    if (!nameToVerify || !idToVerify) {
      console.log('Missing employer name or employee ID for verification');
      setIsEmployeeVerified(false);
      return;
    }

    console.log('Verifying employee:', { nameToVerify, idToVerify });
    setIsVerifyingEmployee(true);
    
    try {
      const { data, error } = await supabase
        .from('b2b_employees')
        .select('*')
        .eq('b2b_partner_name', nameToVerify)
        .eq('employee_id', idToVerify)
        .single();

      console.log('Verification result:', { data, error });

      if (error || !data) {
        console.error('Employee verification failed:', error);
        setIsEmployeeVerified(false);
        setVerifiedEmployeeRecord(null);
        toast({
          title: t('auth.verificationFailed'),
          description: t('auth.verificationFailedMessage'),
          variant: "destructive",
        });
      } else {
        console.log('Employee verified successfully:', data);
        setIsEmployeeVerified(true);
        setVerifiedEmployeeRecord(data);
        toast({
          title: "Overenie úspešné",
          description: "Údaje zamestnávateľa boli overené",
        });
      }
    } catch (error) {
      console.error('Error verifying employee:', error);
      setIsEmployeeVerified(false);
      setVerifiedEmployeeRecord(null);
      toast({
        title: t('auth.verificationFailed'),
        description: t('auth.verificationFailedMessage'),
        variant: "destructive",
      });
    } finally {
      setIsVerifyingEmployee(false);
    }
  };

  const updateEmployeeEmail = async (userEmail: string) => {
    if (!verifiedEmployeeRecord) {
      console.log('No verified employee record found for email update');
      return;
    }

    console.log('Updating employee email:', { userEmail, recordId: verifiedEmployeeRecord.id });
    
    try {
      const { error } = await supabase
        .from('b2b_employees')
        .update({ 
          email: userEmail
        })
        .eq('id', verifiedEmployeeRecord.id);

      if (error) {
        console.error('Error updating employee email:', error);
        toast({
          title: "Upozornenie",
          description: "Registrácia bola úspešná, ale nepodarilo sa aktualizovať záznam zamestnanca",
          variant: "destructive",
        });
      } else {
        console.log('Employee email updated successfully');
      }
    } catch (error) {
      console.error('Error updating employee record:', error);
    }
  };

  const resetVerification = () => {
    setIsEmployeeVerified(false);
    setVerifiedEmployeeRecord(null);
  };

  return {
    employers,
    showEmployerDropdown,
    isEmployeeVerified,
    isVerifyingEmployee,
    verifiedEmployeeRecord,
    searchEmployers,
    verifyEmployeeCredentials,
    updateEmployeeEmail,
    resetVerification,
    setShowEmployerDropdown
  };
};
