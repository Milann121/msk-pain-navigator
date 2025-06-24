
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    // Store the selected language in localStorage to persist the choice
    localStorage.setItem('selectedLanguage', lng);
  };

  return (
    <div className="flex gap-2 mb-4">
      <Button 
        variant={i18n.language === 'sk' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => changeLanguage('sk')}
        className={i18n.language === 'sk' ? 'bg-blue-600 hover:bg-blue-700' : ''}
      >
        SK
      </Button>
      <Button 
        variant={i18n.language === 'cs' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => changeLanguage('cs')}
        className={i18n.language === 'cs' ? 'bg-blue-600 hover:bg-blue-700' : ''}
      >
        CZ
      </Button>
      <Button 
        variant={i18n.language === 'en' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => changeLanguage('en')}
        className={i18n.language === 'en' ? 'bg-blue-600 hover:bg-blue-700' : ''}
      >
        EN
      </Button>
    </div>
  );
};

export default LanguageSwitcher;
