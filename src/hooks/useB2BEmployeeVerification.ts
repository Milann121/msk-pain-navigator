
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

  const verifyEmployeeCredentials = async (companyName?: string, empId?: string, employerName?: string, employeeId?: string) => {
    const nameToVerify = companyName || employerName;
    const idToVerify = empId || employeeId;
    
    console.log('=== VERIFICATION START ===');
    console.log('Input parameters:', {
      companyName,
      empId,
      employerName,
      employeeId,
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

    console.log('Starting verification for:', { nameToVerify, idToVerify });
    setIsVerifyingEmployee(true);
    
    const normalizeBool = (v: any) => v === true || v === 'true' || v === 1;
    
    try {
      console.log('=== PERFORMING VERIFICATION QUERY ===');
      console.log('Query parameters:', {
        b2b_partner_name: nameToVerify,
        employee_id: idToVerify
      });

      const [
        { data: b2bVerified, error: b2bError },
        { data: testVerified, error: testError }
      ] = await Promise.all([
        supabase.rpc('verify_b2b_employee', {
          _b2b_partner_name: nameToVerify,
          _employee_id: idToVerify,
        }),
        supabase.rpc('verify_test2_employee', {
          _b2b_partner_name: nameToVerify,
          _employee_id: idToVerify,
        })
      ]);

      console.log('Verification query executed');
      console.log('Query result data:', b2bVerified, testVerified);
      console.log('Query result error:', b2bError, testError);

      const errMsg = (b2bError?.message || testError?.message || '').toLowerCase();
      if (errMsg.includes('permission') || errMsg.includes('execute')) {
        toast({
          title: 'Chyba oprávnení',
          description: 'Overenie nie je momentálne dostupné. Skúste to prosím neskôr.',
          variant: 'destructive',
        });
        setIsEmployeeVerified(false);
        setVerifiedEmployeeRecord(null);
        return;
      }

      if (b2bError && testError) {
        console.error('Database error during verification:', b2bError, testError);
        setIsEmployeeVerified(false);
        setVerifiedEmployeeRecord(null);
        toast({
          title: 'Databázová chyba',
          description: 'Vyskytla sa chyba pri overovaní údajov',
          variant: 'destructive',
        });
        return;
      }

      let record: any = null;
      if (normalizeBool(b2bVerified)) {
        record = { entry: { b2b_partner_name: nameToVerify, employee_id: idToVerify }, table: 'b2b_employees' };
      } else if (normalizeBool(testVerified)) {
        record = { entry: { b2b_partner_name: nameToVerify, employee_id: idToVerify }, table: 'test_2_employees' };
      }

      if (!record) {
        console.log('=== VERIFICATION FAILED ===');
        console.log('No matching employee found for:', { nameToVerify, idToVerify });
        setIsEmployeeVerified(false);
        setVerifiedEmployeeRecord(null);
        toast({
          title: 'Overenie neúspešné',
          description: 'Údaje sa nezhodujú so záznamami v databáze. Skontrolujte názov zamestnávateľa a ID zamestnanca.',
          variant: 'destructive',
        });
      } else {
        const employeeRecord = record.entry;
        console.log('=== VERIFICATION SUCCESSFUL ===');
        console.log('Employee verified successfully:', employeeRecord);
        setIsEmployeeVerified(true);
        setVerifiedEmployeeRecord({ ...(employeeRecord as any), sourceTable: record.table });
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
      return;
    }

    console.log('=== UPDATING EMPLOYEE STATUS ===');
    console.log('Updating employee email, status, and user_id:', { 
      userEmail, 
      userId,
      recordId: verifiedEmployeeRecord.id,
      currentState: verifiedEmployeeRecord.state 
    });
    
    try {
      const table = (verifiedEmployeeRecord as any).sourceTable || 'b2b_employees';
      const updateData: any = {
        email: userEmail,
        state: 'active'
      };
      
      // Add user_id if provided
      if (userId) {
        updateData.user_id = userId;
      }
      
      if (table === 'test_2_employees') {
        const { error } = await (supabase as any).rpc('update_test2_employee_contact', {
          _b2b_partner_name: (verifiedEmployeeRecord as any).b2b_partner_name || (verifiedEmployeeRecord as any).employerName,
          _employee_id: (verifiedEmployeeRecord as any).employee_id || (verifiedEmployeeRecord as any).employeeId,
        });
        if (error) {
          console.error('Error updating employee email and status via RPC:', error);
        }
      } else {
        const { error } = await (supabase as any).rpc('update_b2b_employee_contact', {
          _b2b_partner_name: (verifiedEmployeeRecord as any).b2b_partner_name || (verifiedEmployeeRecord as any).employerName,
          _employee_id: (verifiedEmployeeRecord as any).employee_id || (verifiedEmployeeRecord as any).employeeId,
        });
        if (error) {
          console.error('Error updating employee email and status via RPC:', error);
        }
      }

      console.log('Employee email, status, and user_id updated successfully');
      // Update the local state to reflect the change
      setVerifiedEmployeeRecord(prev => prev ? { 
        ...prev, 
        email: userEmail, 
        state: 'active',
        ...(userId && { user_id: userId })
      } : null);
    } catch (error) {
      console.error('Error updating employee record:', error);
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
