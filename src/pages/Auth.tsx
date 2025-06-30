
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

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [b2bEmployee, setB2bEmployee] = useState<B2BEmployee | null>(null);
  const { signIn, signUp, signInWithGoogle, user } = useAuth();
  const { t } = useTranslation();
  const { toast } = useToast();

  useEffect(() => {
    // Check if there's B2B employee data in localStorage
    const storedB2BEmployee = localStorage.getItem('b2bEmployee');
    if (storedB2BEmployee) {
      try {
        const employeeData = JSON.parse(storedB2BEmployee);
        setB2bEmployee(employeeData);
        // Pre-fill first name if available
        if (employeeData.first_name) {
          setFirstName(employeeData.first_name);
        }
      } catch (error) {
        console.error('Error parsing B2B employee data:', error);
        localStorage.removeItem('b2bEmployee');
      }
    }
  }, []);

  if (user) {
    return <Navigate to="/" replace />;
  }

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

    setIsLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password, firstName);
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
    try {
      await signInWithGoogle();
    } catch (error) {
      toast({
        title: "Chyba",
        description: error instanceof Error ? error.message : "Vyskytla sa chyba pri prihlásení cez Google",
        variant: "destructive",
      });
    }
  };

  const clearB2BData = () => {
    localStorage.removeItem('b2bEmployee');
    setB2bEmployee(null);
    setFirstName('');
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
            {/* B2B Employee Information Display */}
            {b2bEmployee && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-sm font-semibold text-blue-800">
                    {t('b2b.title')} - Informácie
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearB2BData}
                    className="text-blue-600 hover:text-blue-800 h-auto p-1"
                  >
                    ×
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label className="text-xs text-blue-700">Spoločnosť</Label>
                    <Input
                      value={b2bEmployee.b2b_partner_name}
                      readOnly
                      className="bg-white border-blue-200 text-sm"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <Label className="text-xs text-blue-700">ID zamestnanca</Label>
                    <Input
                      value={b2bEmployee.employee_id}
                      readOnly
                      className="bg-white border-blue-200 text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mb-4">
              <Button 
                type="button" 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2"
                onClick={handleGoogleSignIn}
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
                disabled={isLoading || (isSignUp && !privacyConsent)}
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
