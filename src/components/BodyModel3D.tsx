
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BodyModel3DProps {
  onAreaClick?: (area: 'neck' | 'middle back' | 'lower back') => void;
  selectedArea?: 'neck' | 'middle back' | 'lower back';
}

const BodyModel3D = ({ onAreaClick, selectedArea }: BodyModel3DProps) => {
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  const getAreaColor = (area: string) => {
    if (selectedArea === area) return 'bg-blue-500';
    if (hoveredArea === area) return 'bg-blue-300';
    return 'bg-gray-200';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-lg">Vyberte oblasť bolesti</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96 w-full flex items-center justify-center">
          <div className="relative">
            {/* Simple body representation */}
            <div className="flex flex-col items-center space-y-2">
              {/* Neck area */}
              <button
                className={`w-16 h-8 rounded-full ${getAreaColor('neck')} border-2 border-gray-300 hover:border-blue-400 transition-colors`}
                onClick={() => onAreaClick?.('neck')}
                onMouseEnter={() => setHoveredArea('neck')}
                onMouseLeave={() => setHoveredArea(null)}
              >
                <span className="text-xs font-medium">Krk</span>
              </button>
              
              {/* Middle back area */}
              <button
                className={`w-20 h-16 rounded-lg ${getAreaColor('middle back')} border-2 border-gray-300 hover:border-blue-400 transition-colors`}
                onClick={() => onAreaClick?.('middle back')}
                onMouseEnter={() => setHoveredArea('middle back')}
                onMouseLeave={() => setHoveredArea(null)}
              >
                <span className="text-xs font-medium">Hrudná</span>
              </button>
              
              {/* Lower back area */}
              <button
                className={`w-20 h-16 rounded-lg ${getAreaColor('lower back')} border-2 border-gray-300 hover:border-blue-400 transition-colors`}
                onClick={() => onAreaClick?.('lower back')}
                onMouseEnter={() => setHoveredArea('lower back')}
                onMouseLeave={() => setHoveredArea(null)}
              >
                <span className="text-xs font-medium">Drieková</span>
              </button>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-500 text-center mt-2">
          Kliknite na oblasť alebo použite ovládacie prvky nižšie
        </p>
      </CardContent>
    </Card>
  );
};

export default BodyModel3D;
