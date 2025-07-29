import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="text-center">
          <Link 
            to="/privacy-policy" 
            className="text-blue-600 hover:text-blue-800 underline text-sm"
          >
            {t('footer.privacyPolicy')}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;