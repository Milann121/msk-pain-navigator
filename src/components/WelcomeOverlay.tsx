
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const WelcomeOverlay = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header section with title, text and button */}
      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8 mb-6">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-blue-800">
              Vitajte u nášho Pebee terapeuta
            </h2>
            <p className="text-lg text-gray-600">
              Pre prístup k dotazníku a personalizovaným cvičebným programom sa prosím prihláste do svojho účtu.
            </p>
            <Button 
              onClick={() => navigate('/auth')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
            >
              Prihlásiť sa
            </Button>
          </div>
        </div>
      </div>
      
      {/* Current overlay image */}
      <div className="w-full">
        <div className="w-full h-full min-h-[400px] relative">
          <img 
            src="/lovable-uploads/2nd-overlay.png"
            alt="Mobilné aplikácie" 
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* Additional scrollable images */}
      <div className="w-full">
        <div className="w-full h-full min-h-[400px] relative">
          <img 
            src="/lovable-uploads/16d5e659-d4bc-4980-b090-fc7512bd2ace.png"
            alt="Kalendár cvičení a úspory" 
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      <div className="w-full">
        <div className="w-full h-full min-h-[400px] relative">
          <img 
            src="/lovable-uploads/133826c0-fff0-4a91-91fe-4e633b6f23ae.png"
            alt="Moje cviky a aktívne programy" 
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      <div className="w-full">
        <div className="w-full h-full min-h-[400px] relative">
          <img 
            src="/lovable-uploads/a78217f7-b4cf-44a8-932b-c3bb5b7ad2a0.png"
            alt="Hodnotenie bolesti pohybového aparátu" 
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeOverlay;
