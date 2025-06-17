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
        <div className="max-w-4xl mx-auto text-center space-y-8 mb-1.5">
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

      {/* White section with title and subtitle */}
      <div className="w-full bg-white py-10 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h2 className="text-4xl font-bold text-blue-800">
            Pohyb bez bolesti
          </h2>
          <p className="text-xl text-gray-600">
            Funkcie Pebee terapeuta
          </p>
        </div>
      </div>

      {/* Third image with light blue background */}
      <div className="w-full bg-blue-50">
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

      {/* Fifth image with light blue background */}
      <div className="w-full bg-blue-50">
        <div className="w-full h-full min-h-[400px] relative">
          <img 
            src="/lovable-uploads/a78217f7-b4cf-44a8-932b-c3bb5b7ad2a0.png"
            alt="Hodnotenie bolesti pohybového aparátu" 
            className="w-full h-full object-cover object-center"
          />
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
            <h1 className="text-lg md:text-xl font-bold">Pebee terapeut</h1>
          </div>
          
          <div className="text-sm text-blue-100">
            © 2024 Pebee terapeut. Všetky práva vyhradené.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WelcomeOverlay;
