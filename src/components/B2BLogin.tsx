
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

interface B2BPartner {
  id: number;
  name: string;
}

interface B2BEmployee {
  id: string;
  b2b_partner_name: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  job_post?: string;
  pain_area?: string;
  differentials?: string;
}

const B2BLogin = () => {
  const { t } = useTranslation();
  const [partners, setPartners] = useState<B2BPartner[]>([]);
  const [filteredPartners, setFilteredPartners] = useState<B2BPartner[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<string>('');
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    employeeId: '',
    firstName: '',
    lastName: ''
  });

  useEffect(() => {
    fetchPartners();
  }, []);

  useEffect(() => {
    if (searchValue.length >= 3) {
      console.log('Searching for:', searchValue);
      console.log('Available partners:', partners);
      
      const filtered = partners.filter(partner =>
        partner.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      
      console.log('Filtered partners:', filtered);
      setFilteredPartners(filtered);
      setShowDropdown(filtered.length > 0);
    } else {
      setShowDropdown(false);
      setFilteredPartners([]);
    }
  }, [searchValue, partners]);

  const fetchPartners = async () => {
    try {
      console.log('Fetching partners...');
      
      // First, get partners from B2B_partners table
      const { data: b2bPartners, error: partnersError } = await supabase
        .from('B2B_partners')
        .select('id, name')
        .order('name');

      if (partnersError) {
        console.error('Error fetching B2B_partners:', partnersError);
      }

      // Also get unique partner names from b2b_employees table
      const { data: employeePartners, error: employeesError } = await supabase
        .from('b2b_employees')
        .select('b2b_partner_name')
        .order('b2b_partner_name');

      if (employeesError) {
        console.error('Error fetching b2b_employees:', employeesError);
      }

      console.log('B2B Partners from B2B_partners:', b2bPartners);
      console.log('Employee partners from b2b_employees:', employeePartners);

      // Combine and deduplicate partner names
      const allPartners: B2BPartner[] = [];
      const partnerNames = new Set<string>();

      // Add partners from B2B_partners table
      if (b2bPartners) {
        b2bPartners.forEach(partner => {
          if (!partnerNames.has(partner.name.toLowerCase())) {
            partnerNames.add(partner.name.toLowerCase());
            allPartners.push(partner);
          }
        });
      }

      // Add unique partners from b2b_employees table
      if (employeePartners) {
        employeePartners.forEach((emp, index) => {
          if (emp.b2b_partner_name && !partnerNames.has(emp.b2b_partner_name.toLowerCase())) {
            partnerNames.add(emp.b2b_partner_name.toLowerCase());
            allPartners.push({
              id: 1000 + index, // Use a different ID range for employee-derived partners
              name: emp.b2b_partner_name
            });
          }
        });
      }

      console.log('Combined partners:', allPartners);
      setPartners(allPartners || []);
    } catch (error) {
      console.error('Error fetching partners:', error);
      toast.error(t('b2b.errors.loadPartners'));
    }
  };

  const handleSearchChange = (value: string) => {
    console.log('Search value changed to:', value);
    setSearchValue(value);
    setSelectedPartner('');
  };

  const handlePartnerSelect = (partnerName: string) => {
    console.log('Partner selected:', partnerName);
    setSelectedPartner(partnerName);
    setSearchValue(partnerName);
    setShowDropdown(false);
  };

  const handleContinue = () => {
    console.log('Continue clicked with selected partner:', selectedPartner);
    if (!selectedPartner) {
      toast.error(t('b2b.errors.selectEmployer'));
      return;
    }
    setShowLoginDialog(true);
  };

  const handleLogin = async () => {
    if (!loginData.employeeId || !loginData.firstName || !loginData.lastName) {
      toast.error(t('b2b.errors.fillFields'));
      return;
    }

    setIsLoading(true);
    try {
      console.log('Attempting login with:', {
        partner: selectedPartner,
        employeeId: loginData.employeeId,
        firstName: loginData.firstName,
        lastName: loginData.lastName
      });

      // Verify employee exists and data matches
      const { data: employee, error } = await supabase
        .from('b2b_employees')
        .select('*')
        .eq('b2b_partner_name', selectedPartner)
        .eq('employee_id', loginData.employeeId)
        .eq('first_name', loginData.firstName)
        .eq('last_name', loginData.lastName)
        .single();

      console.log('Employee lookup result:', { employee, error });

      if (error || !employee) {
        console.error('Login failed:', error);
        toast.error(t('b2b.errors.invalidCredentials'));
        return;
      }

      // Store B2B session in localStorage for now
      localStorage.setItem('b2bEmployee', JSON.stringify(employee));
      toast.success(t('b2b.welcomeMessage', { name: employee.first_name }));
      
      // Redirect to main app or specific B2B dashboard
      window.location.href = '/domov';
      
    } catch (error) {
      console.error('B2B login error:', error);
      toast.error(t('b2b.errors.loginFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  const resetLoginDialog = () => {
    setShowLoginDialog(false);
    setSelectedPartner('');
    setSearchValue('');
    setLoginData({
      employeeId: '',
      firstName: '',
      lastName: ''
    });
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-blue-800 mb-4">
          {t('b2b.title')}
        </h3>
        <p className="text-gray-600 mb-6">
          {t('b2b.subtitle')}
        </p>
      </div>

      <div className="space-y-3 relative">
        <Label htmlFor="partner-search">{t('b2b.selectEmployer')}</Label>
        <Input
          id="partner-search"
          placeholder={t('b2b.typeEmployer')}
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full"
        />
        
        {showDropdown && (
          <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {filteredPartners.map((partner) => (
              <button
                key={partner.id}
                onClick={() => handlePartnerSelect(partner.name)}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
              >
                {partner.name}
              </button>
            ))}
          </div>
        )}

        {searchValue.length >= 3 && filteredPartners.length === 0 && (
          <div className="text-sm text-red-600 mt-1">
            {t('b2b.errors.noResults')}
          </div>
        )}
      </div>

      {selectedPartner && (
        <div className="mt-4">
          <Button
            onClick={handleContinue}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {t('b2b.continue')}
          </Button>
        </div>
      )}

      <Dialog open={showLoginDialog} onOpenChange={resetLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-blue-800">
              {t('b2b.loginTitle')} - {selectedPartner}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="employee-id">{t('b2b.employeeId')}</Label>
              <Input
                id="employee-id"
                placeholder={t('b2b.employeeIdPlaceholder')}
                value={loginData.employeeId}
                onChange={(e) => setLoginData({ ...loginData, employeeId: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="first-name">{t('b2b.firstName')}</Label>
              <Input
                id="first-name"
                placeholder={t('b2b.firstNamePlaceholder')}
                value={loginData.firstName}
                onChange={(e) => setLoginData({ ...loginData, firstName: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="last-name">{t('b2b.lastName')}</Label>
              <Input
                id="last-name"
                placeholder={t('b2b.lastNamePlaceholder')}
                value={loginData.lastName}
                onChange={(e) => setLoginData({ ...loginData, lastName: e.target.value })}
              />
            </div>
          </div>
          
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={resetLoginDialog}>
              {t('b2b.cancel')}
            </Button>
            <Button 
              onClick={handleLogin} 
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? t('b2b.loggingIn') : t('b2b.login')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default B2BLogin;
