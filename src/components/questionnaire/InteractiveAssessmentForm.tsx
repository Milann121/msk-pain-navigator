import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserInfo } from '@/utils/types';
import ConsentSection from '@/components/form-sections/ConsentSection';
import { useTranslation } from 'react-i18next';

const BODY_AREAS = [
  {
    id: 'neck',
    name: 'Neck',
    coordinates: { x: 40, y: 10, width: 20, height: 15 },
    painArea: 'neck' as const
  },
  {
    id: 'middle-back',
    name: 'Middle Back', 
    coordinates: { x: 40, y: 30, width: 20, height: 20 },
    painArea: 'middle back' as const
  },
  {
    id: 'lower-back',
    name: 'Lower Back',
    coordinates: { x: 40, y: 50, width: 20, height: 15 },
    painArea: 'lower back' as const
  },
  {
    id: 'shoulder',
    name: 'Shoulder/Upper Limb',
    coordinates: { x: 20, y: 20, width: 15, height: 20 },
    painArea: 'upper limb' as const
  },
  {
    id: 'shoulder-right',
    name: 'Shoulder/Upper Limb',
    coordinates: { x: 65, y: 20, width: 15, height: 20 },
    painArea: 'upper limb' as const
  },
  {
    id: 'arm-left',
    name: 'Upper Limb',
    coordinates: { x: 10, y: 30, width: 10, height: 25 },
    painArea: 'upper limb' as const
  },
  {
    id: 'arm-right',
    name: 'Upper Limb', 
    coordinates: { x: 80, y: 30, width: 10, height: 25 },
    painArea: 'upper limb' as const
  }
];

interface InteractiveAssessmentFormProps {
  onSubmit: (data: UserInfo) => void;
}

export const InteractiveAssessmentForm: React.FC<InteractiveAssessmentFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation();
  const [selectedArea, setSelectedArea] = useState<typeof BODY_AREAS[0] | null>(null);
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);
  const [disclaimerConsent, setDisclaimerConsent] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);

  const handleAreaClick = (area: typeof BODY_AREAS[0]) => {
    setSelectedArea(area);
  };

  const handleSubmit = () => {
    if (!selectedArea || !disclaimerConsent || !privacyConsent) return;
    
    const userInfo: UserInfo = {
      name: 'Používateľ',
      age: 25,
      gender: 'female',
      job: 'sedentary',
      painArea: selectedArea.painArea,
      consentGiven: true
    };
    
    onSubmit(userInfo);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-blue-700">
          {t('assessment.painQuestionnaireTitle')}
        </CardTitle>
        <CardDescription className="text-center">
          {t('assessment.painQuestionnaireSubtitle')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Interactive Body Area Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-center">
            {t('assessment.painArea.specify')}
          </h3>
          
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
                    selectedArea?.id === area.id
                      ? 'bg-blue-600 bg-opacity-40 border-2 border-blue-600'
                      : hoveredArea === area.id 
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
          
          {selectedArea && (
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-blue-700 font-medium">
                {t('common.selected')}: {selectedArea.name}
              </p>
            </div>
          )}
        </div>

        {/* Consent Section */}
        <ConsentSection
          disclaimerConsent={disclaimerConsent}
          privacyConsent={privacyConsent}
          setDisclaimerConsent={setDisclaimerConsent}
          setPrivacyConsent={setPrivacyConsent}
        />
        
        {/* Submit Button */}
        <Button 
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={!selectedArea || !disclaimerConsent || !privacyConsent}
        >
          {t('assessment.startAssessment')}
        </Button>
      </CardContent>
    </Card>
  );
};