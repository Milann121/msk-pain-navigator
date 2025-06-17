
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const WelcomeOverlay = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-[80vh] flex flex-col relative">
      {/* Content above the image */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-2xl mx-auto text-center space-y-6 mb-8">
          <h2 className="text-3xl font-bold text-blue-800">
            Vitajte u nášho Pebee terapeuta
          </h2>
          <p className="text-lg text-gray-600">
            Pre prístup k dotazníku a personalizovaným cvičebným odporúčaniam sa prosím prihláste do svojho účtu.
          </p>
          <Button 
            onClick={() => navigate('/auth')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
          >
            Prihlásiť sa
          </Button>
        </div>
      </div>
      
      {/* Background image overlay */}
      <div className="flex-1 relative">
        <div className="absolute inset-0">
          <img 
            src="/lovable-uploads/69f93b83-b2c8-45d5-bf34-5bb75efe0bf2.png"
            alt="Žena cvičí jogu s mobilnými aplikáciami" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default WelcomeOverlay;
