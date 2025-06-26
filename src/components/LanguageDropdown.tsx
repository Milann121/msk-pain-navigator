
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
    {
      code: 'sk',
      name: 'SK',
      flag: '/lovable-uploads/603332be-d99c-428d-af60-0062a83a4b91.png'
    },
    {
      code: 'cs', 
      name: 'CZ',
      flag: '/lovable-uploads/2b0f850b-8374-47d7-bc43-d873e567633c.png'
    },
    {
      code: 'en',
      name: 'EN', 
      flag: '/lovable-uploads/91a2e77e-23cc-4f3f-86b1-80408efea7ad.png'
    }
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
          <img 
            src={currentLanguage.flag} 
            alt={currentLanguage.name}
            className="w-5 h-4 object-cover rounded-sm"
          />
          <span>{currentLanguage.name}</span>
          <ChevronDown className={`h-4 w-4 ${iconColor}`} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white shadow-lg border rounded-md z-50">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
          >
            <img 
              src={language.flag} 
              alt={language.name}
              className="w-5 h-4 object-cover rounded-sm"
            />
            <span>{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageDropdown;
