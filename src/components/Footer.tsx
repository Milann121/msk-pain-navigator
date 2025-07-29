import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-blue-600 text-white py-4 px-4 mt-auto">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-bold text-sm">P</span>
          </div>
          <span className="font-medium">Pebee terapeut</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link 
            to="/privacy-policy" 
            className="hover:text-blue-200 underline"
          >
            {t('footer.privacyPolicy')}
          </Link>
          <span>© 2024 Všetky práva vyhradené</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;