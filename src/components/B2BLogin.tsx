
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
      const filtered = partners.filter(partner =>
        partner.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredPartners(filtered);
      setShowDropdown(filtered.length > 0);
    } else {
      setShowDropdown(false);
      setFilteredPartners([]);
    }
  }, [searchValue, partners]);

  const fetchPartners = async () => {
    try {
      const { data, error } = await supabase
        .from('B2B_partners')
        .select('id, name')
        .order('name');

      if (error) throw error;
      setPartners(data || []);
    } catch (error) {
      console.error('Error fetching B2B partners:', error);
      toast.error(t('b2b.errors.loadPartners'));
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setSelectedPartner('');
  };

  const handlePartnerSelect = (partnerName: string) => {
    setSelectedPartner(partnerName);
    setSearchValue(partnerName);
    setShowDropdown(false);
  };

  const handleContinue = () => {
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
      // Verify employee exists and data matches
      const { data: employee, error } = await supabase
        .from('b2b_employees')
        .select('*')
        .eq('b2b_partner_name', selectedPartner)
        .eq('employee_id', loginData.employeeId)
        .eq('first_name', loginData.firstName)
        .eq('last_name', loginData.lastName)
        .single();

      if (error || !employee) {
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
