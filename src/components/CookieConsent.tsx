
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";
import { useTranslation } from 'react-i18next';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Cookie className="h-5 w-5 text-accent" />
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {t('cookie.message')}
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="default" onClick={acceptCookies}>
            {t('cookie.accept')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
