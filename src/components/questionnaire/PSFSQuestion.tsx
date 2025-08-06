import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

interface PSFSQuestionProps {
  question: {
    id: string;
    text: string;
    description?: string;
    psfs?: {
      questions: Array<{
        id: string;
        text: string;
        scale: {
          min: number;
          max: number;
          minLabel: string;
          maxLabel: string;
        };
      }>;
    };
  };
  values: Record<string, number>;
  onChange: (questionId: string, value: number) => void;
}

// Image component with error handling
const PSFSImage = ({ src, alt, index }: { src: string; alt: string; index: number }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    // Preload image
    const img = new Image();
    img.onload = () => {
      setLoading(false);
      console.log(`✅ PSFS Image ${index + 1} loaded successfully:`, src);
    };
    img.onerror = () => {
      setLoading(false);
      setError(true);
      console.error(`❌ PSFS Image ${index + 1} failed to load:`, src);
    };
    img.src = src;
  }, [src, index]);

  if (loading) {
    return (
      <div className="w-full mb-6">
        <Skeleton className="w-full h-48 rounded-lg" />
        <p className="text-xs text-muted-foreground mt-2 text-center">Loading image...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full mb-6 p-6 bg-muted rounded-lg border-2 border-dashed border-muted-foreground/30">
        <div className="text-center">
          <p className="text-muted-foreground mb-2">📷 {alt}</p>
          <p className="text-xs text-muted-foreground">Image unavailable</p>
          {process.env.NODE_ENV === 'development' && (
            <p className="text-xs text-destructive mt-1">Path: {src}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mb-6">
      <img 
        src={src}
        alt={alt}
        className="w-full h-auto rounded-lg"
        onError={() => {
          setError(true);
          console.error(`❌ PSFS Image ${index + 1} failed to display after loading:`, src);
        }}
        onLoad={() => {
          console.log(`✅ PSFS Image ${index + 1} displayed successfully:`, src);
        }}
      />
    </div>
  );
};

const PSFSQuestion = ({ question, values, onChange }: PSFSQuestionProps) => {
  const { t } = useTranslation();
  
  if (!question.psfs?.questions) return null;
  
  // Get the first question to extract scale labels for the legend
  const firstQuestion = question.psfs.questions[0];
  
  // Image configurations
  const imageConfigs = [
    { src: "/lovable-uploads/psfsImages/psfsHouseHoldImage.png", alt: "Household activities" },
    { src: "/lovable-uploads/psfsImages/psfsYogaAtHomeImage.png", alt: "Yoga and sports activities" },
    { src: "/lovable-uploads/psfsImages/psfsHeavyLoadsImage.png", alt: "Heavy loads activities" },
    { src: "/lovable-uploads/psfsImages/psfsWalkingStairsImage.png", alt: "Walking stairs activities" },
    { src: "/lovable-uploads/psfsImages/psfsCareFamilyImage.png", alt: "Family care activities" }
  ];
  
  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">{t(question.text)}</h3>
        {question.description && (
          <p className="text-muted-foreground text-sm">{t(question.description)}</p>
        )}
      </div>
      
      
      <div className="space-y-6">
        {question.psfs.questions.map((subQuestion, index) => {
          const value = values[subQuestion.id] ?? 5;
          
          return (
            <div key={subQuestion.id} className="space-y-4">
              {/* Display images with error handling */}
              {index < imageConfigs.length && (
                <PSFSImage 
                  src={imageConfigs[index].src}
                  alt={imageConfigs[index].alt}
                  index={index}
                />
              )}
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-4">
                    {t(subQuestion.text)}
                  </h4>
                  
                  <div className="space-y-4">
                    <Select 
                      value={value.toString()} 
                      onValueChange={(val) => onChange(subQuestion.id, parseInt(val))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a value" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 11 }, (_, i) => (
                          <SelectItem key={i} value={i.toString()}>
                            <div className="flex items-center gap-2">
                              <span>{i}</span>
                              {i === 0 && (
                                <span className="text-muted-foreground text-sm">
                                  - {t(subQuestion.scale.minLabel)}
                                </span>
                              )}
                              {i === 10 && (
                                <span className="text-muted-foreground text-sm">
                                  - {t(subQuestion.scale.maxLabel)}
                                </span>
                              )}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PSFSQuestion;
