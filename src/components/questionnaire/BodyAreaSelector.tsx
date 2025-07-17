import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

const BODY_AREAS = [
  {
    id: 'neck',
    name: 'Neck',
    coordinates: { x: 40, y: 10, width: 20, height: 15 },
    painArea: 'neck'
  },
  {
    id: 'middle-back',
    name: 'Middle Back', 
    coordinates: { x: 40, y: 30, width: 20, height: 20 },
    painArea: 'middle back'
  },
  {
    id: 'lower-back',
    name: 'Lower Back',
    coordinates: { x: 40, y: 50, width: 20, height: 15 },
    painArea: 'lower back'
  },
  {
    id: 'shoulder',
    name: 'Shoulder/Upper Limb',
    coordinates: { x: 20, y: 20, width: 15, height: 20 },
    painArea: 'upper limb'
  },
  {
    id: 'shoulder-right',
    name: 'Shoulder/Upper Limb',
    coordinates: { x: 65, y: 20, width: 15, height: 20 },
    painArea: 'upper limb'
  },
  {
    id: 'arm-left',
    name: 'Upper Limb',
    coordinates: { x: 10, y: 30, width: 10, height: 25 },
    painArea: 'upper limb'
  },
  {
    id: 'arm-right',
    name: 'Upper Limb', 
    coordinates: { x: 80, y: 30, width: 10, height: 25 },
    painArea: 'upper limb'
  }
];

export const BodyAreaSelector = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  const handleAreaClick = (area: typeof BODY_AREAS[0]) => {
    navigate(`/assessment?area=${area.painArea.replace(' ', '-')}`);
  };

  return (
    <Card className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        {t('selectPainArea', 'Select Your Pain Area')}
      </h2>
      
      <div className="relative w-full max-w-md mx-auto">
        {/* Background body image */}
        <img 
          src="/lovable-uploads/questionnaireBackground/4.png" 
          alt="Body outline"
          className="w-full h-auto"
        />
        
        {/* Clickable overlays */}
        <div className="absolute inset-0">
          {BODY_AREAS.map((area) => (
            <button
              key={area.id}
              className={`absolute transition-all duration-200 ${
                hoveredArea === area.id 
                  ? 'bg-blue-500 bg-opacity-30 border-2 border-blue-500' 
                  : 'bg-transparent hover:bg-blue-500 hover:bg-opacity-20 border-2 border-transparent hover:border-blue-400'
              } rounded-lg cursor-pointer`}
              style={{
                left: `${area.coordinates.x}%`,
                top: `${area.coordinates.y}%`,
                width: `${area.coordinates.width}%`,
                height: `${area.coordinates.height}%`,
              }}
              onMouseEnter={() => setHoveredArea(area.id)}
              onMouseLeave={() => setHoveredArea(null)}
              onClick={() => handleAreaClick(area)}
              aria-label={`Select ${area.name} area`}
            >
              {/* Tooltip on hover */}
              {hoveredArea === area.id && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-sm whitespace-nowrap z-10">
                  {area.name}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
      
      <p className="text-sm text-gray-600 text-center mt-4">
        {t('clickBodyAreaInstruction', 'Click on the body area where you experience pain to start your assessment')}
      </p>
    </Card>
  );
};