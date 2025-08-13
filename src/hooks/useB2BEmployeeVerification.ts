
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
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
      const [
        { data: b2bNames, error: b2bRpcError },
        { data: testNames, error: testRpcError }
      ] = await Promise.all([
        supabase.rpc('search_b2b_employer_names', { _query: query, _limit: 10 }),
        supabase.rpc('search_test2_employer_names', { _query: query, _limit: 10 })
      ]);

      if (b2bRpcError || testRpcError) {
        console.error('Employer search RPC error(s):', b2bRpcError, testRpcError);
        const msg = (b2bRpcError?.message || testRpcError?.message || '').toLowerCase();
        if (msg.includes('permission') || msg.includes('execute')) {
          toast({
            title: 'Chyba oprávnení',
            description: 'Vyhľadávanie zamestnávateľov nie je momentálne dostupné.',
            variant: 'destructive',
          });
          setEmployers([]);
          setShowEmployerDropdown(false);
          return;
        }
      }

      const b2bPartnerNames = (Array.isArray(b2bNames) ? b2bNames : []).map((r: any) => r.name) || [];
      const testEmployeeNames = (Array.isArray(testNames) ? testNames : []).map((r: any) => r.name) || [];
      const allNames = [...new Set([...b2bPartnerNames, ...testEmployeeNames])];

      console.log('Found employers:', allNames);
      setEmployers(allNames);
      setShowEmployerDropdown(allNames.length > 0);
    } catch (error) {
      console.error('Error searching employers:', error);
      toast({ title: 'Chyba', description: 'Vyhľadávanie zlyhalo.', variant: 'destructive' });
    }
  };

  const verifyEmployeeCredentials = async (
    companyName?: string, 
    empId?: string, 
    employerName?: string, 
    employeeId?: string,
    firstName?: string,
    lastName?: string
  ) => {
    const nameToVerify = companyName || employerName;
    const idToVerify = empId || employeeId;
    
    console.log('=== VERIFICATION START ===');
    console.log('Input parameters:', {
      companyName,
      empId,
      employerName,
      employeeId,
      firstName,
      lastName,
      nameToVerify,
      idToVerify
    });
    
    if (!nameToVerify?.trim() || !idToVerify?.trim()) {
      console.log('Missing employer name or employee ID for verification');
      toast({
        title: "Chyba overenia",
        description: "Zadajte názov zamestnávateľa a ID zamestnanca",
        variant: "destructive",
      });
      setIsEmployeeVerified(false);
      setVerifiedEmployeeRecord(null);
      return;
    }

    console.log('Starting verification for:', { nameToVerify, idToVerify, firstName, lastName });
    setIsVerifyingEmployee(true);
    
    try {
      console.log('=== PERFORMING ENHANCED VERIFICATION QUERY ===');
      console.log('Query parameters:', {
        first_name: firstName,
        last_name: lastName,
        employee_id: idToVerify,
        b2b_partner_name: nameToVerify
      });

      // Use the new enhanced verification function
      const { data: verificationResult, error: verificationError } = await supabase.rpc('verify_employee_by_name_and_id', {
        _first_name: firstName || '',
        _last_name: lastName || '',
        _employee_id: idToVerify,
        _b2b_partner_name: nameToVerify,
      });

      console.log('Enhanced verification query executed');
      console.log('Query result data:', verificationResult);
      console.log('Query result error:', verificationError);

      if (verificationError) {
        const errMsg = verificationError.message?.toLowerCase() || '';
        if (errMsg.includes('permission') || errMsg.includes('execute')) {
          toast({
            title: 'Chyba oprávnení',
            description: 'Overenie nie je momentálne dostupné. Skúste to prosím neskôr.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Databázová chyba',
            description: 'Vyskytla sa chyba pri overovaní údajov',
            variant: 'destructive',
          });
        }
        setIsEmployeeVerified(false);
        setVerifiedEmployeeRecord(null);
        return;
      }

      if (!verificationResult || verificationResult.length === 0) {
        console.log('=== VERIFICATION FAILED ===');
        console.log('No matching employee found for:', { firstName, lastName, idToVerify, nameToVerify });
        setIsEmployeeVerified(false);
        setVerifiedEmployeeRecord(null);
        toast({
          title: 'Overenie neúspešné',
          description: 'Údaje sa nezhodujú so záznamami v databáze. Skontrolujte meno, priezvisko, názov zamestnávateľa a ID zamestnanca.',
          variant: 'destructive',
        });
      } else {
        const employeeRecord = verificationResult[0];
        console.log('=== VERIFICATION SUCCESSFUL ===');
        console.log('Employee verified successfully:', employeeRecord);
        setIsEmployeeVerified(true);
        setVerifiedEmployeeRecord({
          employee_record_id: employeeRecord.employee_record_id,
          b2b_partner_id: employeeRecord.b2b_partner_id,
          b2b_partner_name: employeeRecord.b2b_partner_name,
          employee_id: employeeRecord.employee_id,
          sourceTable: employeeRecord.source_table,
          firstName,
          lastName
        });
        toast({
          title: 'Overenie úspešné',
          description: 'Údaje boli úspešne overené',
        });
      }
    } catch (error) {
      console.error('=== VERIFICATION ERROR ===');
      console.error('Unexpected error during verification:', error);
      setIsEmployeeVerified(false);
      setVerifiedEmployeeRecord(null);
      toast({
        title: 'Chyba overenia',
        description: 'Vyskytla sa neočakávaná chyba pri overovaní',
        variant: 'destructive',
      });
    } finally {
      setIsVerifyingEmployee(false);
      console.log('=== VERIFICATION END ===');
    }
  };

  const updateEmployeeEmail = async (userEmail: string, userId?: string) => {
    if (!verifiedEmployeeRecord) {
      console.log('No verified employee record found for email update');
      return false;
    }

    console.log('=== UPDATING EMPLOYEE STATUS ===');
    console.log('Updating employee email, status, and user_id:', { 
      userEmail, 
      userId,
      recordId: verifiedEmployeeRecord.employee_record_id,
      sourceTable: verifiedEmployeeRecord.sourceTable
    });
    
    try {
      // Use the new link function
      const { data: linkResult, error: linkError } = await supabase.rpc('link_verified_employee_to_user', {
        _employee_record_id: verifiedEmployeeRecord.employee_record_id,
        _source_table: verifiedEmployeeRecord.sourceTable,
        _user_id: userId,
        _user_email: userEmail
      });

      if (linkError) {
        console.error('Error linking employee to user:', linkError);
        return false;
      }

      if (linkResult) {
        console.log('Employee linked to user successfully');
        // Update the local state to reflect the change
        setVerifiedEmployeeRecord(prev => prev ? { 
          ...prev, 
          email: userEmail, 
          state: 'active',
          user_id: userId,
          isLinked: true
        } : null);
        return true;
      } else {
        console.log('Employee linking failed - no rows updated');
        return false;
      }
    } catch (error) {
      console.error('Error updating employee record:', error);
      return false;
    }
  };

  const resetVerification = () => {
    console.log('Resetting verification state');
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
