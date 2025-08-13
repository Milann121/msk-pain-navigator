import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
// Removed unused useIsMobile
import { useTranslation } from 'react-i18next';
import ImageWithFallback from '@/components/utils/ImageWithFallback';

const WelcomeOverlay = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header section with title, text and button */}
      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8 mb-1.5">
          <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-blue-800">
              {t('welcome.title')}
            </h1>

            <p className="text-lg text-gray-600">
              {t('welcome.subtitle')}
            </p>
            <Button
              onClick={() => navigate('/auth')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
            >
              {t('welcome.signIn')}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Current overlay image */}
      <div className="w-full">
        <div className="w-full h-full min-h-[420px] md:min-h-[560px] relative">
          <ImageWithFallback
            webpSrc="/lovable-uploads/WelcomePageImages/mainOverlayImage.svg"
            fallbackSrc="/lovable-uploads/WelcomePageImages/mainOverlayImage.svg"
            alt={t('welcome.alt.mobileApps')}
            className="w-full h-full object-cover object-center"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>

      {/* White section with title and subtitle */}
      <div className="w-full bg-white pt-3.5 pb-10 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h2 className="text-4xl font-bold text-blue-800">
            {t('welcome.movementTitle')}
          </h2>
          <p className="text-xl text-gray-600">
            {t('welcome.features')}
          </p>
        </div>
      </div>

      {/* Third image with full width and text overlay on the right */}
      <div className="w-full bg-blue-50 relative">
        <div className="w-full h-full min-h-[420px] md:min-h-[560px] relative">
          <ImageWithFallback
            webpSrc="/lovable-uploads/WelcomePageImages/9.svg"
            fallbackSrc="/lovable-uploads/WelcomePageImages/9.svg"
            alt={t('welcome.alt.calendar')}
            className="w-full h-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
          {/* Text overlay positioned on the right */}
          <div className="absolute inset-0 flex items-center justify-end px-4 md:px-8">
            <div className="bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-lg max-w-md md:max-w-lg space-y-4 mr-4 md:mr-8">
              <h3 className="text-2xl font-bold text-blue-800">{t('welcome.calendar.title')}</h3>
              <p className="text-gray-700 leading-relaxed">
                {t('welcome.calendar.text')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fourth image with full width and text overlay on the left */}
      <div className="w-full relative">
        <div className="w-full h-full min-h-[420px] md:min-h-[560px] relative">
          <ImageWithFallback
            webpSrc="/lovable-uploads/WelcomePageImages/10.svg"
            fallbackSrc="/lovable-uploads/WelcomePageImages/10.svg"
            alt={t('welcome.alt.programs')}
            className="w-full h-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
          {/* Text overlay positioned on the left */}
          <div className="absolute inset-0 flex items-center justify-start px-4 md:px-8">
            <div className="bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-lg max-w-md md:max-w-lg space-y-4 ml-4 md:ml-8">
              <h3 className="text-2xl font-bold text-blue-800">{t('welcome.programs.title')}</h3>
              <p className="text-gray-700 leading-relaxed">
                {t('welcome.programs.text')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fifth image with full width and text overlay on the right */}
      <div className="w-full bg-blue-50 relative">
        <div className="w-full h-full min-h-[420px] md:min-h-[560px] relative">
          <ImageWithFallback
            webpSrc="/lovable-uploads/WelcomePageImages/11.svg"
            fallbackSrc="/lovable-uploads/WelcomePageImages/11.svg"
            alt={t('welcome.alt.assessment')}
            className="w-full h-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
          {/* Text overlay positioned on the right */}
          <div className="absolute inset-0 flex items-center justify-end px-4 md:px-8">
            <div className="bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-lg max-w-md md:max-w-lg space-y-4 mr-4 md:mr-8">
              <h3 className="text-2xl font-bold text-blue-800">{t('welcome.assessment.title')}</h3>
              <p className="text-gray-700 leading-relaxed">
                {t('welcome.assessment.text')}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default WelcomeOverlay;
