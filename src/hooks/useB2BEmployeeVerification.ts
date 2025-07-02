
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

      const { data: testEmployees, error: testEmployeesError } = await supabase
        .from('test_2_employees' as any)
        .select('b2b_partner_name')
        .ilike('b2b_partner_name', `%${query}%`)
        .limit(10);

      if (partnersError) {
        console.error('Error searching partners:', partnersError);
      }
      if (employeesError) {
        console.error('Error searching employees:', employeesError);
      }
      if (testEmployeesError) {
        console.error('Error searching test employees:', testEmployeesError);
      }

      const partnerNames = partners?.map(p => p.name) || [];
      const employeePartnerNames = employees?.map(e => e.b2b_partner_name) || [];
      const testEmployeeNames = testEmployees?.map(e => e.b2b_partner_name) || [];
      const allNames = [...new Set([...partnerNames, ...employeePartnerNames, ...testEmployeeNames])];
      
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
    
    try {
      // Now perform the actual verification query
      // The new policies allow anonymous access for verification
      console.log('=== PERFORMING VERIFICATION QUERY ===');
      console.log('Query parameters:', {
        b2b_partner_name: nameToVerify,
        employee_id: idToVerify
      });

      const [{ data, error }, { data: testData, error: testError }] = await Promise.all([
        supabase
          .from('b2b_employees')
          .select('*')
          .eq('b2b_partner_name', nameToVerify)
          .eq('employee_id', idToVerify),
        supabase
          .from('test_2_employees' as any)
          .select('*')
          .eq('b2b_partner_name', nameToVerify)
          .eq('employee_id', idToVerify)
      ]);

      console.log('Verification query executed');
      console.log('Query result data:', data, testData);
      console.log('Query result error:', error, testError);

      if (error && testError) {
        console.error('Database error during verification:', error, testError);
        setIsEmployeeVerified(false);
        setVerifiedEmployeeRecord(null);
        toast({
          title: "Databázová chyba",
          description: "Vyskytla sa chyba pri overovaní údajov",
          variant: "destructive",
        });
        return;
      }
      const record = data && data.length > 0 ? { entry: data[0], table: 'b2b_employees' } :
        testData && testData.length > 0 ? { entry: testData[0], table: 'test_2_employees' } : null;

      if (!record) {
        console.log('=== VERIFICATION FAILED ===');
        console.log('No matching employee found for:', { nameToVerify, idToVerify });
        setIsEmployeeVerified(false);
        setVerifiedEmployeeRecord(null);
        toast({
          title: "Overenie neúspešné",
          description: "Údaje sa nezhodujú so záznamami v databáze. Skontrolujte názov zamestnávateľa a ID zamestnanca.",
          variant: "destructive",
        });
      } else {
        const employeeRecord = record.entry;
        console.log('=== VERIFICATION SUCCESSFUL ===');
        console.log('Employee verified successfully:', employeeRecord);
        setIsEmployeeVerified(true);
        setVerifiedEmployeeRecord({ ...employeeRecord, sourceTable: record.table });
        toast({
          title: "Overenie úspešné",
          description: `Údaje boli úspešne overené pre ${employeeRecord.first_name} ${employeeRecord.last_name}`,
        });
      }
    } catch (error) {
      console.error('=== VERIFICATION ERROR ===');
      console.error('Unexpected error during verification:', error);
      setIsEmployeeVerified(false);
      setVerifiedEmployeeRecord(null);
      toast({
        title: "Chyba overenia",
        description: "Vyskytla sa neočakávaná chyba pri overovaní",
        variant: "destructive",
      });
    } finally {
      setIsVerifyingEmployee(false);
      console.log('=== VERIFICATION END ===');
    }
  };

  const updateEmployeeEmail = async (userEmail: string) => {
    if (!verifiedEmployeeRecord) {
      console.log('No verified employee record found for email update');
      return;
    }

    console.log('=== UPDATING EMPLOYEE STATUS ===');
    console.log('Updating employee email and status:', { 
      userEmail, 
      recordId: verifiedEmployeeRecord.id,
      currentState: verifiedEmployeeRecord.state 
    });
    
    try {
      const table = (verifiedEmployeeRecord as any).sourceTable || 'b2b_employees';
      const { error } = await supabase
        .from(table as any)
        .update({
          email: userEmail,
          state: 'active'
        })
        .eq('id', verifiedEmployeeRecord.id);

      if (error) {
        console.error('Error updating employee email and status:', error);
        toast({
          title: "Upozornenie",
          description: "Registrácia bola úspešná, ale nepodarilo sa aktualizovať záznam zamestnanca",
          variant: "destructive",
        });
      } else {
        console.log('Employee email and status updated successfully to active');
        // Update the local state to reflect the change
        setVerifiedEmployeeRecord(prev => prev ? { ...prev, email: userEmail, state: 'active' } : null);
      }
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
