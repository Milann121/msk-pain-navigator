
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const WelcomeOverlay = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-[80vh] flex flex-col px-4 py-20">
      <div className="max-w-4xl mx-auto text-center space-y-8 mb-12">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-blue-800">
            Vitajte u nášho Pebee terapeuta
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
      
      <div className="flex-1 w-full">
        <div className="w-full h-full min-h-[400px] relative">
          <img 
            src="/lovable-uploads/1st-overlay.png"
            alt="Mobilné aplikácie" 
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeOverlay;
