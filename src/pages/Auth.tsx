
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Home } from 'lucide-react';
import LanguageDropdown from '@/components/LanguageDropdown';
import { supabase } from '@/integrations/supabase/client';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  
  // B2B registration fields
  const [employerName, setEmployerName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [employers, setEmployers] = useState<string[]>([]);
  const [showEmployerDropdown, setShowEmployerDropdown] = useState(false);
  const [isEmployeeVerified, setIsEmployeeVerified] = useState(false);
  const [isVerifyingEmployee, setIsVerifyingEmployee] = useState(false);
  const [verifiedEmployeeRecord, setVerifiedEmployeeRecord] = useState<any>(null);
  
  const { signIn, signUp, signInWithGoogle, user } = useAuth();
  const { t } = useTranslation();
  const { toast } = useToast();

  // Check for pre-filled B2B data from localStorage
  useEffect(() => {
    const b2bData = localStorage.getItem('b2b_employee_data');
    if (b2bData) {
      try {
        const parsedData = JSON.parse(b2bData);
        setEmployerName(parsedData.companyName || '');
        setEmployeeId(parsedData.employeeId || '');
        // Auto-verify if data is pre-filled
        if (parsedData.companyName && parsedData.employeeId) {
          setIsEmployeeVerified(true);
        }
      } catch (error) {
        console.error('Error parsing B2B data:', error);
      }
    }
  }, []);

  if (user) {
    return <Navigate to="/" replace />;
  }

  // Search for employers when user types
  const searchEmployers = async (query: string) => {
    if (query.length < 3) {
      setEmployers([]);
      setShowEmployerDropdown(false);
      return;
    }

    try {
      // Search in B2B_partners table
      const { data: partners, error: partnersError } = await supabase
        .from('B2B_partners')
        .select('name')
        .ilike('name', `%${query}%`)
        .limit(10);

      // Search in b2b_employees table
      const { data: employees, error: employeesError } = await supabase
        .from('b2b_employees')
        .select('b2b_partner_name')
        .ilike('b2b_partner_name', `%${query}%`)
        .limit(10);

      if (partnersError && employeesError) {
        console.error('Error searching employers:', partnersError, employeesError);
        return;
      }

      // Combine and deduplicate results
      const partnerNames = partners?.map(p => p.name) || [];
      const employeePartnerNames = employees?.map(e => e.b2b_partner_name) || [];
      const allNames = [...new Set([...partnerNames, ...employeePartnerNames])];
      
      setEmployers(allNames);
      setShowEmployerDropdown(allNames.length > 0);
    } catch (error) {
      console.error('Error searching employers:', error);
    }
  };

  // Verify employee credentials
  const verifyEmployee = async () => {
    if (!employerName || !employeeId) {
      setIsEmployeeVerified(false);
      return;
    }

    setIsVerifyingEmployee(true);
    try {
      const { data, error } = await supabase
        .from('b2b_employees')
        .select('*')
        .eq('b2b_partner_name', employerName)
        .eq('employee_id', employeeId)
        .single();

      if (error || !data) {
        setIsEmployeeVerified(false);
        setVerifiedEmployeeRecord(null);
        toast({
          title: "Chyba overenia",
          description: "Neplatné údaje zamestnávateľa alebo ID zamestnanca",
          variant: "destructive",
        });
      } else {
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
    } finally {
      setIsVerifyingEmployee(false);
    }
  };

  // Handle employer name change
  const handleEmployerNameChange = (value: string) => {
    setEmployerName(value);
    setIsEmployeeVerified(false);
    setVerifiedEmployeeRecord(null);
    searchEmployers(value);
  };

  // Handle employee ID change
  const handleEmployeeIdChange = (value: string) => {
    setEmployeeId(value);
    setIsEmployeeVerified(false);
    setVerifiedEmployeeRecord(null);
  };

  // Update employee record with email after successful registration
  const updateEmployeeEmail = async (userEmail: string) => {
    if (!verifiedEmployeeRecord) return;

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
      }
    } catch (error) {
      console.error('Error updating employee record:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp && !privacyConsent) {
      toast({
        title: "Chyba",
        description: "Pre registráciu je potrebné súhlasiť so spracovaním osobných údajov",
        variant: "destructive",
      });
      return;
    }

    if (isSignUp && !isEmployeeVerified) {
      toast({
        title: "Chyba",
        description: "Najprv overte svoje údaje zamestnávateľa",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      if (isSignUp) {
        // First sign up the user
        await signUp(email, password, firstName);
        
        // Then update the employee record with the email
        await updateEmployeeEmail(email);
        
        toast({
          title: "Registrácia úspešná",
          description: "Prosím skontrolujte svoj email pre overenie účtu.",
        });
      } else {
        await signIn(email, password);
      }
    } catch (error) {
      toast({
        title: "Chyba",
        description: error instanceof Error ? error.message : "Vyskytla sa chyba",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (isSignUp && !isEmployeeVerified) {
      toast({
        title: "Chyba",
        description: "Najprv overte svoje údaje zamestnávateľa",
        variant: "destructive",
      });
      return;
    }

    try {
      await signInWithGoogle();
      
      // If this is a sign-up flow, also update the employee record
      if (isSignUp && verifiedEmployeeRecord) {
        // Note: For Google sign-in, we might need to handle the email update differently
        // since we don't have the email immediately available here
      }
    } catch (error) {
      toast({
        title: "Chyba",
        description: error instanceof Error ? error.message : "Vyskytla sa chyba pri prihlásení cez Google",
        variant: "destructive",
      });
    }
  };

  const clearB2BData = () => {
    localStorage.removeItem('b2b_employee_data');
    setEmployerName('');
    setEmployeeId('');
    setIsEmployeeVerified(false);
    setVerifiedEmployeeRecord(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="mb-4 flex justify-between items-center">
          <Link to="/">
            <Button variant="ghost" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              {t('auth.backHome')}
            </Button>
          </Link>
          <LanguageDropdown />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>{isSignUp ? t('auth.signUp') : t('auth.signIn')}</CardTitle>
            <CardDescription>
              {isSignUp ? t('auth.signUpSubtitle') : t('auth.signInSubtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* B2B Data Display (if pre-filled) */}
            {(employerName || employeeId) && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="text-sm">
                    <p><strong>Zamestnávateľ:</strong> {employerName}</p>
                    <p><strong>ID zamestnanca:</strong> {employeeId}</p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={clearB2BData}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Vymazať
                  </Button>
                </div>
              </div>
            )}

            <div className="mb-4">
              <Button 
                type="button" 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2"
                onClick={handleGoogleSignIn}
                disabled={isSignUp && !isEmployeeVerified}
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                {t('auth.google')}
              </Button>
            </div>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">{t('auth.or')}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <>
                  {/* Employer Name Field */}
                  <div className="space-y-1 relative">
                    <Label htmlFor="employerName">Názov zamestnávateľa *</Label>
                    <div className="relative">
                      <Input
                        id="employerName"
                        type="text"
                        value={employerName}
                        onChange={(e) => handleEmployerNameChange(e.target.value)}
                        placeholder="Začnite písať názov zamestnávateľa..."
                        required
                        className={isEmployeeVerified ? "border-green-500" : ""}
                      />
                      {showEmployerDropdown && employers.length > 0 && (
                        <div className="absolute top-full left-0 right-0 z-50 mt-1">
                          <Command className="border rounded-md shadow-lg bg-white">
                            <CommandList className="max-h-40">
                              <CommandGroup>
                                {employers.map((employer, index) => (
                                  <CommandItem
                                    key={index}
                                    onSelect={() => {
                                      setEmployerName(employer);
                                      setShowEmployerDropdown(false);
                                      setIsEmployeeVerified(false);
                                      setVerifiedEmployeeRecord(null);
                                    }}
                                    className="cursor-pointer"
                                  >
                                    {employer}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Employee ID Field */}
                  <div className="space-y-1">
                    <Label htmlFor="employeeId">ID zamestnanca *</Label>
                    <div className="flex gap-2">
                      <Input
                        id="employeeId"
                        type="text"
                        value={employeeId}
                        onChange={(e) => handleEmployeeIdChange(e.target.value)}
                        placeholder="Zadajte vaše ID zamestnanca"
                        required
                        className={isEmployeeVerified ? "border-green-500" : ""}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={verifyEmployee}
                        disabled={!employerName || !employeeId || isVerifyingEmployee}
                        className="whitespace-nowrap"
                      >
                        {isVerifyingEmployee ? "Overujem..." : "Overiť"}
                      </Button>
                    </div>
                    {isEmployeeVerified && (
                      <p className="text-sm text-green-600">✓ Údaje overené</p>
                    )}
                  </div>
                </>
              )}

              {isSignUp && (
                <div className="space-y-1">
                  <Label htmlFor="firstName">{t('auth.firstName')}</Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
              )}
              <div className="space-y-1">
                <Label htmlFor="email">{t('auth.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">{t('auth.password')}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              {isSignUp && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="privacy"
                    checked={privacyConsent}
                    onCheckedChange={(checked) => setPrivacyConsent(checked as boolean)}
                  />
                  <Label htmlFor="privacy" className="text-sm text-gray-600">
                    {t('auth.privacyConsent')} {' '}
                    <Link
                      to="/privacy-policy"
                      className="text-blue-600 hover:text-blue-800 underline"
                      target="_blank"
                    >
                      spracovaním osobných údajov
                    </Link>
                  </Label>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || (isSignUp && (!privacyConsent || !isEmployeeVerified))}
              >
                {isLoading
                  ? t('loading')
                  : isSignUp
                  ? t('auth.signUp')
                  : t('auth.signIn')}
              </Button>
            </form>
            
            <div className="mt-4 text-center">
              <Button
                variant="link"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm"
              >
                {isSignUp
                  ? t('auth.toggleSignIn')
                  : t('auth.toggleSignUp')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
