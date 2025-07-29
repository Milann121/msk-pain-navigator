import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-blue-600 text-white py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-bold text-sm">P</span>
          </div>
          <span className="font-semibold">Pebee terapeut</span>
        </div>
        
        <div className="flex items-center gap-6">
          <Link 
            to="/privacy-policy" 
            className="text-white hover:text-blue-200 transition-colors text-sm"
          >
            {t('footer.gdprLink')}
          </Link>
          <span className="text-sm">© 2024 {t('footer.copyright')}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;