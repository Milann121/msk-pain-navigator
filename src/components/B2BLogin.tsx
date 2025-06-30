
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
      toast.error('Failed to load partners');
    }
  };

  const handlePartnerSelect = (partnerName: string) => {
    setSelectedPartner(partnerName);
    setShowLoginDialog(true);
  };

  const handleLogin = async () => {
    if (!loginData.employeeId || !loginData.firstName || !loginData.lastName) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      // Verify employee exists and data matches
      const { data: employee, error } = await supabase
        .from('B2B_employees')
        .select('*')
        .eq('b2b_partner_name', selectedPartner)
        .eq('employee_id', loginData.employeeId)
        .eq('first_name', loginData.firstName)
        .eq('last_name', loginData.lastName)
        .single();

      if (error || !employee) {
        toast.error('Invalid employee credentials. Please check your information.');
        return;
      }

      // Store B2B session in localStorage for now
      localStorage.setItem('b2bEmployee', JSON.stringify(employee));
      toast.success(`Welcome ${employee.first_name}!`);
      
      // Redirect to main app or specific B2B dashboard
      window.location.href = '/domov';
      
    } catch (error) {
      console.error('B2B login error:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetLoginDialog = () => {
    setShowLoginDialog(false);
    setSelectedPartner('');
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
          Employee Login
        </h3>
        <p className="text-gray-600 mb-6">
          Select your employer to access your personalized health program
        </p>
      </div>

      <div className="space-y-3">
        <Label htmlFor="partner-select">Select Your Employer</Label>
        <Select onValueChange={handlePartnerSelect}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose your employer..." />
          </SelectTrigger>
          <SelectContent>
            {partners.map((partner) => (
              <SelectItem key={partner.id} value={partner.name}>
                {partner.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Dialog open={showLoginDialog} onOpenChange={resetLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-blue-800">
              Employee Login - {selectedPartner}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="employee-id">Employee ID</Label>
              <Input
                id="employee-id"
                placeholder="Enter your employee ID"
                value={loginData.employeeId}
                onChange={(e) => setLoginData({ ...loginData, employeeId: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input
                id="first-name"
                placeholder="Enter your first name"
                value={loginData.firstName}
                onChange={(e) => setLoginData({ ...loginData, firstName: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input
                id="last-name"
                placeholder="Enter your last name"
                value={loginData.lastName}
                onChange={(e) => setLoginData({ ...loginData, lastName: e.target.value })}
              />
            </div>
          </div>
          
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={resetLoginDialog}>
              Cancel
            </Button>
            <Button 
              onClick={handleLogin} 
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default B2BLogin;
