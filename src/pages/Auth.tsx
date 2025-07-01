
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
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
import { supabase } from '@/integrations/supabase/client';
import AuthHeader from '@/components/auth/AuthHeader';
import EmailVerificationAlert from '@/components/auth/EmailVerificationAlert';
import B2BDataDisplay from '@/components/auth/B2BDataDisplay';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';
import AuthForm from '@/components/auth/AuthForm';
import { useB2BEmployeeVerification } from '@/hooks/useB2BEmployeeVerification';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [showEmailNotConfirmed, setShowEmailNotConfirmed] = useState(false);
  const [emailNotConfirmedAddress, setEmailNotConfirmedAddress] = useState('');
  
  // B2B registration fields
  const [employerName, setEmployerName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  
  const { signIn, signUp, signInWithGoogle, user } = useAuth();
  const { t } = useTranslation();
  const { toast } = useToast();

  const {
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
  } = useB2BEmployeeVerification();

  // Check for pre-filled B2B data from localStorage
  useEffect(() => {
    const b2bData = localStorage.getItem('b2b_employee_data');
    if (b2bData) {
      try {
        const parsedData = JSON.parse(b2bData);
        setEmployerName(parsedData.companyName || '');
        setEmployeeId(parsedData.employeeId || '');
        if (parsedData.companyName && parsedData.employeeId) {
          verifyEmployeeCredentials(parsedData.companyName, parsedData.employeeId);
        }
      } catch (error) {
        console.error('Error parsing B2B data:', error);
      }
    }
  }, []);

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleEmployerNameChange = (value: string) => {
    console.log('Employer name changed:', value);
    setEmployerName(value);
    resetVerification();
    searchEmployers(value);
  };

  const handleEmployeeIdChange = (value: string) => {
    console.log('Employee ID changed:', value);
    setEmployeeId(value);
    resetVerification();
  };

  const handleEmployerSelect = (employer: string) => {
    setEmployerName(employer);
    resetVerification();
  };

  const handleDropdownClose = () => {
    setShowEmployerDropdown(false);
  };

  const handleVerifyEmployee = () => {
    verifyEmployeeCredentials(undefined, undefined, employerName, employeeId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setShowEmailNotConfirmed(false);
    
    console.log('Form submitted with data:', {
      isSignUp,
      email,
      firstName,
      employerName,
      employeeId,
      isEmployeeVerified,
      privacyConsent
    });

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
        console.log('Starting user registration...');
        await signUp(email, password, firstName);
        await updateEmployeeEmail(email);
        
        toast({
          title: "Registrácia úspešná",
          description: "Prosím skontrolujte svoj email pre overenie účtu a potom sa prihláste.",
        });
        
        setIsSignUp(false);
        setEmail('');
        setPassword('');
        setFirstName('');
      } else {
        console.log('Starting user sign-in...');
        await signIn(email, password);
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      
      if (error?.message === "Invalid login credentials" || error?.code === "invalid_credentials") {
        setShowEmailNotConfirmed(true);
        setEmailNotConfirmedAddress(email);
        toast({
          title: "Chyba prihlásenia",
          description: "Neplatné prihlasovacie údaje. Ak ste sa už registrovali, skontrolujte či máte overený email.",
          variant: "destructive",
        });
      } else if (error?.message === "Email not confirmed" || error?.code === "email_not_confirmed") {
        setShowEmailNotConfirmed(true);
        setEmailNotConfirmedAddress(email);
        toast({
          title: "Email nie je overený",
          description: "Prosím skontrolujte svoj email a kliknite na overovací odkaz pred prihlásením.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Chyba",
          description: error instanceof Error ? error.message : "Vyskytla sa chyba",
          variant: "destructive",
        });
      }
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
      console.log('Starting Google sign-in...');
      await signInWithGoogle();
    } catch (error) {
      console.error('Google sign-in error:', error);
      toast({
        title: "Chyba",
        description: error instanceof Error ? error.message : "Vyskytla sa chyba pri prihlásení cez Google",
        variant: "destructive",
      });
    }
  };

  const handleResendConfirmation = async () => {
    if (!emailNotConfirmedAddress) return;
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: emailNotConfirmedAddress,
        options: {
          emailRedirectTo: `${window.location.origin}/auth`
        }
      });
      
      if (error) {
        console.error('Resend confirmation error:', error);
        toast({
          title: "Chyba",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Email odoslaný",
          description: "Overovací email bol znovu odoslaný. Skontrolujte svoju emailovú schránku.",
        });
      }
    } catch (error) {
      console.error('Error resending confirmation:', error);
      toast({
        title: "Chyba",
        description: "Nepodarilo sa odoslať overovací email",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearB2BData = () => {
    localStorage.removeItem('b2b_employee_data');
    setEmployerName('');
    setEmployeeId('');
    resetVerification();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <AuthHeader />
        
        <Card>
          <CardHeader>
            <CardTitle>{isSignUp ? t('auth.signUp') : t('auth.signIn')}</CardTitle>
            <CardDescription>
              {isSignUp ? t('auth.signUpSubtitle') : t('auth.signInSubtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {showEmailNotConfirmed && (
              <EmailVerificationAlert
                email={emailNotConfirmedAddress}
                onResend={handleResendConfirmation}
                isLoading={isLoading}
              />
            )}

            <B2BDataDisplay
              employerName={employerName}
              employeeId={employeeId}
              onClear={clearB2BData}
            />

            <div className="mb-4">
              <GoogleSignInButton
                onClick={handleGoogleSignIn}
                disabled={isSignUp && !isEmployeeVerified}
              />
            </div>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">{t('auth.or')}</span>
              </div>
            </div>

            <AuthForm
              isSignUp={isSignUp}
              email={email}
              password={password}
              firstName={firstName}
              employerName={employerName}
              employeeId={employeeId}
              isEmployeeVerified={isEmployeeVerified}
              isVerifyingEmployee={isVerifyingEmployee}
              privacyConsent={privacyConsent}
              employers={employers}
              showEmployerDropdown={showEmployerDropdown}
              isLoading={isLoading}
              onSubmit={handleSubmit}
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
              onFirstNameChange={setFirstName}
              onEmployerNameChange={handleEmployerNameChange}
              onEmployeeIdChange={handleEmployeeIdChange}
              onVerifyEmployee={handleVerifyEmployee}
              onEmployerSelect={handleEmployerSelect}
              onDropdownClose={handleDropdownClose}
              onPrivacyConsentChange={setPrivacyConsent}
            />
            
            <div className="mt-4 text-center">
              <Button
                variant="link"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setShowEmailNotConfirmed(false);
                }}
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
