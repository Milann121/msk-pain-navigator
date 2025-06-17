
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const WelcomeOverlay = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Blue header section with content */}
      <div className="bg-blue-600 text-white px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            Vitajte u nášho Pebee terapeuta
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Pre prístup k dotazníku a personalizovaným cvičebným odporúčaniam sa prosím 
            prihláste do svojho účtu.
          </p>
          <Button 
            onClick={() => navigate('/auth')}
            className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-3 text-lg font-semibold rounded-md mt-6"
          >
            Prihlásiť sa
          </Button>
        </div>
      </div>

      {/* Image section with mobile mockups */}
      <div className="flex-1 bg-white flex items-center justify-center py-8">
        <div className="max-w-6xl mx-auto px-4">
          <img 
            src="/lovable-uploads/9523e741-0085-4680-b00e-98790bfce9c4.png"
            alt="Pebee terapeut aplikácia - ukážka mobilných obrazoviek" 
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeOverlay;
