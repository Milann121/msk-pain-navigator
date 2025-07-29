import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
const Footer = () => {
  const {
    t
  } = useTranslation();
  return <footer className="bg-blue-600 text-white py-4 px-6">
      <div className="container mx-auto px-0">
        {/* Desktop layout */}
        <div className="hidden md:flex items-center justify-between">
          <span className="font-semibold">Pebee terapeut</span>
          
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="text-white hover:text-blue-200 transition-colors text-sm">
              {t('footer.gdprLink')}
            </Link>
            <span className="text-sm">© 2024 {t('footer.copyright')}</span>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="md:hidden space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Pebee terapeut</span>
            <span className="text-sm text-right">© 2024 {t('footer.copyright')}</span>
          </div>
          
          <div>
            <Link to="/privacy-policy" className="text-white hover:text-blue-200 transition-colors text-sm">
              {t('footer.gdprLink')}
            </Link>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;