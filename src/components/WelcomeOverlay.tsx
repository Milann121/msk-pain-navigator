
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const WelcomeOverlay = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Content positioned above the image */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 px-4 py-20">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-800">
            Vitajte u nášho Pebee terapeuta
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Pre prístup k dotazníku a personalizovaným cvičebným odporúčaniam sa prosím prihláste do svojho účtu.
          </p>
          <Button 
            onClick={() => navigate('/auth')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Prihlásiť sa
          </Button>
        </div>
      </div>
      
      {/* Background image with mobile mockups */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`relative ${isMobile ? 'w-full h-full' : 'w-full max-w-6xl h-full'}`}>
          <img 
            src="/lovable-uploads/16bc5524-9ba5-43d5-a590-7b54eaabf99e.png"
            alt="Pebee terapeut aplikácia s mobilnými telefónmi a cvičiacou ženou" 
            className="w-full h-full object-contain object-center"
            style={{ 
              marginTop: isMobile ? '0' : '120px'
            }}
          />
          {/* Subtle overlay to ensure text readability */}
          <div className="absolute inset-0 bg-white/10" />
        </div>
      </div>
    </div>
  );
};

export default WelcomeOverlay;
