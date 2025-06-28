
import { Link } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useTranslation } from 'react-i18next';

interface ConsentSectionProps {
  disclaimerConsent: boolean;
  privacyConsent: boolean;
  setDisclaimerConsent: (checked: boolean) => void;
  setPrivacyConsent: (checked: boolean) => void;
}

const ConsentSection = ({
  disclaimerConsent,
  privacyConsent,
  setDisclaimerConsent,
  setPrivacyConsent,
}: ConsentSectionProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="disclaimer"
          checked={disclaimerConsent}
          onCheckedChange={(checked) => setDisclaimerConsent(checked as boolean)}
        />
        <Label htmlFor="disclaimer" className="text-sm text-gray-600">
          {t('assessment.consent.disclaimer')}
        </Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="privacy"
          checked={privacyConsent}
          onCheckedChange={(checked) => setPrivacyConsent(checked as boolean)}
        />
        <Label htmlFor="privacy" className="text-sm text-gray-600">
          {t('assessment.consent.privacy')}{' '}
          <Link
            to="/privacy-policy"
            className="text-blue-600 hover:text-blue-800 underline"
            target="_blank"
          >
            {t('assessment.consentSection.viewPrivacyPolicy')}
          </Link>
        </Label>
      </div>
    </div>
  );
};

export default ConsentSection;
