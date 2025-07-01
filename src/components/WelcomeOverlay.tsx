import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTranslation } from 'react-i18next';

const WelcomeOverlay = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header section with title, text and button */}
      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8 mb-1.5">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-blue-800">
              {t('welcome.title')}
            </h2>
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
        <div className="w-full h-full min-h-[400px] relative">
          <img
            src="/lovable-uploads/2nd-overlay.png"
            alt={t('welcome.alt.mobileApps')}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* White section with title and subtitle */}
      <div className="w-full bg-white py-10 px-4">
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
        <div className="w-full h-full min-h-[400px] relative">
          <img
            src="/lovable-uploads/16d5e659-d4bc-4980-b090-fc7512bd2ace.png"
            alt={t('welcome.alt.calendar')}
            className="w-full h-full object-cover object-center"
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
        <div className="w-full h-full min-h-[400px] relative">
          <img
            src="/lovable-uploads/133826c0-fff0-4a91-91fe-4e633b6f23ae.png"
            alt={t('welcome.alt.programs')}
            className="w-full h-full object-cover object-center"
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
        <div className="w-full h-full min-h-[400px] relative">
          <img
            src="/lovable-uploads/a78217f7-b4cf-44a8-932b-c3bb5b7ad2a0.png"
            alt={t('welcome.alt.assessment')}
            className="w-full h-full object-cover object-center"
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

      {/* Footer matching header design */}
      <footer className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-4 px-3 md:px-6 shadow-md mt-auto">
        <div className="container mx-auto flex justify-between items-center">
          <div 
            className="flex items-center space-x-2 md:space-x-4" 
            onClick={() => navigate('/')} 
            style={{ cursor: 'pointer' }}
          >
            <div className="bg-white p-1.5 md:p-2 rounded-full">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-blue-600 md:w-6 md:h-6"
              >
                <path d="M20 11c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8" />
                <path d="M2 15h8" />
                <path d="M2 11h18" />
                <path d="M2 7h8" />
                <path d="M17 21l-5-5 5-5" />
              </svg>
            </div>
            <h1 className="text-lg md:text-xl font-bold">{t('welcome.footer.title')}</h1>
          </div>
          
          <div className="text-sm text-blue-100">
            {t('welcome.footer.rights')}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WelcomeOverlay;
