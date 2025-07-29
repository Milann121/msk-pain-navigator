
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Footer from '@/components/Footer';

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{t('notFound.title')}</h1>
          <p className="text-xl text-gray-600 mb-4">{t('notFound.message')}</p>
          <a href="/" className="text-blue-500 hover:text-blue-700 underline">
            {t('notFound.returnHome')}
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
