
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import B2BFields from './B2BFields';

interface AuthFormProps {
  isSignUp: boolean;
  email: string;
  password: string;
  firstName: string;
  employerName: string;
  employeeId: string;
  isEmployeeVerified: boolean;
  isVerifyingEmployee: boolean;
  privacyConsent: boolean;
  employers: string[];
  showEmployerDropdown: boolean;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onFirstNameChange: (value: string) => void;
  onEmployerNameChange: (value: string) => void;
  onEmployeeIdChange: (value: string) => void;
  onVerifyEmployee: () => void;
  onEmployerSelect: (employer: string) => void;
  onDropdownClose: () => void;
  onPrivacyConsentChange: (checked: boolean) => void;
}

const AuthForm = ({
  isSignUp,
  email,
  password,
  firstName,
  employerName,
  employeeId,
  isEmployeeVerified,
  isVerifyingEmployee,
  privacyConsent,
  employers,
  showEmployerDropdown,
  isLoading,
  onSubmit,
  onEmailChange,
  onPasswordChange,
  onFirstNameChange,
  onEmployerNameChange,
  onEmployeeIdChange,
  onVerifyEmployee,
  onEmployerSelect,
  onDropdownClose,
  onPrivacyConsentChange
}: AuthFormProps) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {isSignUp && (
        <B2BFields
          employerName={employerName}
          employeeId={employeeId}
          isEmployeeVerified={isEmployeeVerified}
          isVerifyingEmployee={isVerifyingEmployee}
          employers={employers}
          showEmployerDropdown={showEmployerDropdown}
          onEmployerNameChange={onEmployerNameChange}
          onEmployeeIdChange={onEmployeeIdChange}
          onVerifyEmployee={onVerifyEmployee}
          onEmployerSelect={onEmployerSelect}
          onDropdownClose={onDropdownClose}
        />
      )}

      {isSignUp && (
        <div className="space-y-1">
          <Label htmlFor="firstName">{t('auth.firstName')} (Meno Priezvisko)</Label>
          <Input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => onFirstNameChange(e.target.value)}
            placeholder="napr. Peter Novák"
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
          onChange={(e) => onEmailChange(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-1">
        <Label htmlFor="password">{t('auth.password')}</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          required
        />
      </div>
      
      {isSignUp && (
        <div className="flex items-center space-x-2">
          <Checkbox
            id="privacy"
            checked={privacyConsent}
            onCheckedChange={(checked) => onPrivacyConsentChange(checked as boolean)}
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
  );
};

export default AuthForm;
