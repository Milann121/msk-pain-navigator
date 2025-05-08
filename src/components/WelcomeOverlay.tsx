
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const WelcomeOverlay = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-10">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className={`relative rounded-2xl overflow-hidden shadow-xl ${!isMobile ? 'max-w-md mx-auto' : ''}`}>
          <img 
            src="/lovable-uploads/f16c860e-232c-44b4-bdb8-7e9450cf73f8.png"
            alt="Žena cvičí jogu" 
            className="w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-blue-800">
            Vitajte v našom dotazníku bolestí chrbtice
          </h2>
          <p className="text-lg text-gray-600">
            Pre prístup k dotazníku a personalizovaným cvičebným odporúčaniam sa prosím prihláste do svojho účtu.
          </p>
          <Button 
            onClick={() => navigate('/auth')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg mb-8"
          >
            Prihlásiť sa
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeOverlay;
