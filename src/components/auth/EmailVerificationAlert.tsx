
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail } from 'lucide-react';

interface EmailVerificationAlertProps {
  email: string;
  onResend: () => void;
  isLoading: boolean;
}

const EmailVerificationAlert = ({ email, onResend, isLoading }: EmailVerificationAlertProps) => {
  const { t } = useTranslation();

  return (
    <Alert className="mb-4 border-orange-200 bg-orange-50">
      <Mail className="h-4 w-4" />
      <AlertDescription>
        <div className="space-y-2">
          <p className="text-sm">
            {t('auth.emailNotConfirmed.message', { email })}
          </p>
          <p className="text-sm">
            {t('auth.emailNotConfirmed.instruction')}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={onResend}
            disabled={isLoading}
            className="mt-2"
          >
            {t('auth.emailNotConfirmed.resendButton')}
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default EmailVerificationAlert;
