
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import LanguageDropdown from '@/components/LanguageDropdown';

const AuthHeader = () => {
  const { t } = useTranslation();

  return (
    <div className="mb-4 flex justify-between items-center">
      <Link to="/">
        <Button variant="ghost" className="flex items-center gap-2">
          <Home className="h-4 w-4" />
          {t('auth.backHome')}
        </Button>
      </Link>
      <LanguageDropdown />
    </div>
  );
};

export default AuthHeader;
