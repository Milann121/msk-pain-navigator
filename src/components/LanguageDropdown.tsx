
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const LanguageDropdown = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';

  const languages = [
    { code: 'sk', name: 'SK' },
    { code: 'cs', name: 'CZ', flag: '/lovable-uploads/languageImages/czech-republic-flag-icon.svg' },
    { code: 'en', name: 'EN', flag: '/lovable-uploads/languageImages/united-kingdom-flag-icon.svg' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  const buttonClasses = isAuthPage 
    ? "border border-blue-500 text-blue-600 hover:bg-blue-50 flex items-center gap-2" 
    : "text-white hover:bg-blue-600 flex items-center gap-2";

  const iconColor = isAuthPage ? "text-blue-600" : "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={buttonClasses}>
          {currentLanguage.flag && (
            <img
              src={currentLanguage.flag}
              alt={`${currentLanguage.name} flag`}
              className="w-5 h-4 object-cover rounded-sm"
              decoding="async"
            />
          )}
          <span>{currentLanguage.name}</span>
          <ChevronDown className={`h-4 w-4 ${iconColor}`} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white shadow-lg border rounded-md z-50 min-w-[120px]">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer"
          >
            {language.flag && (
              <img 
                src={language.flag} 
                alt={`${language.name} flag`}
                className="w-5 h-4 object-cover rounded-sm flex-shrink-0"
                decoding="async"
              />
            )}
            <span className="text-sm font-medium">{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageDropdown;
