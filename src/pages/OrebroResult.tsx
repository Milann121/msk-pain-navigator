import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertTriangle, Info } from 'lucide-react';
import Header from '@/components/Header';
import ExerciseVideo from '@/components/ExerciseVideo';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Exercise } from '@/types/exercise';
import exercisesByDifferential from '@/data/exercises';
import { generateGeneralProgram } from '@/utils/generalProgramGenerator';

interface OrebroResultState {
  riskLevel: string;
  painLocations: string[];
}

const OrebroResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const [programExercises, setProgramExercises] = useState<Exercise[]>([]);

  // Get result data from navigation state
  const resultData = location.state as OrebroResultState;

  useEffect(() => {
    if (!resultData) {
      navigate('/orebro-questionnaire');
      return;
    }

    // Determine program to show based on pain locations
    const exercises = getRecommendedExercises(resultData.painLocations);
    setProgramExercises(exercises);
  }, [resultData, navigate]);

  const getRecommendedExercises = (painLocations: string[]): Exercise[] => {
    if (painLocations.length === 0) return [];

    // If multiple pain locations, create a general program
    if (painLocations.length > 1) {
      // Create mock assessments for general program generation
      const mockAssessments = painLocations.map((location, index) => ({
        id: `mock-${index}`,
        primary_mechanism: 'nociceptive',
        primary_differential: 'default',
        pain_area: mapPainLocationToArea(location)
      }));

      return generateGeneralProgram('nociceptive', 'general', mockAssessments);
    }

    // Single pain location - get specific exercises
    const painArea = mapPainLocationToArea(painLocations[0]);
    const programKey = `nociceptive-default-${painArea}`;
    
    return exercisesByDifferential[programKey] || [];
  };

  const mapPainLocationToArea = (location: string): string => {
    const locationMap: Record<string, string> = {
      'neck': 'neck',
      'shoulder': 'upper limb',
      'arm': 'upper limb',
      'upperBack': 'middle-back',
      'lowerBack': 'lower-back',
      'leg': 'lower limb',
      'other': 'general'
    };
    return locationMap[location] || 'general';
  };


  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low':
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case 'medium':
        return <AlertTriangle className="h-6 w-6 text-yellow-600" />;
      case 'high':
        return <AlertTriangle className="h-6 w-6 text-red-600" />;
      default:
        return <Info className="h-6 w-6 text-blue-600" />;
    }
  };

  const getRiskColorClass = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low':
        return 'border-green-200 bg-green-50';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50';
      case 'high':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-blue-200 bg-blue-50';
    }
  };

  if (!resultData) {
    return null;
  }

  const painLocationText = resultData.painLocations.length > 1 
    ? t('orebro.result.generalProgram')
    : t(`orebro.painLocations.${resultData.painLocations[0]}`);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-muted/50 p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Thank you message */}
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h1 className="text-2xl font-bold text-primary">
                  {t('orebro.result.thankYou')}
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {t('orebro.result.description')}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Risk Level Result */}
          <Card className={getRiskColorClass(resultData.riskLevel)}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                {getRiskIcon(resultData.riskLevel)}
                <h2 className="text-lg font-semibold">
                  {t('orebro.result.riskTitle')}
                </h2>
              </div>
              <p className="text-lg font-medium mb-2">
                {t(`orebro.result.riskLevels.${resultData.riskLevel}`)}
              </p>
            </CardContent>
          </Card>

          {/* Recommendation */}
          <Card>
            <CardHeader>
              <CardTitle>{t('orebro.result.recommendationTitle')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                {t(`orebro.result.recommendations.${resultData.riskLevel}`, {
                  painLocation: painLocationText
                })}
              </p>
              
              {resultData.riskLevel === 'low' && (
                <p className="text-sm text-muted-foreground">
                  {t('orebro.result.tryGeneralProgram', { painLocation: painLocationText })}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Embedded Exercises */}
          {programExercises.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {t('orebro.result.recommendedExercises', { painLocation: painLocationText })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {programExercises[0]?.videos.slice(0, 6).map((video, index) => (
                    <ExerciseVideo
                      key={`${video.videoId}-${index}`}
                      videoId={video.videoId}
                      title={video.title || ''}
                      description={video.description || ''}
                      exerciseTitle={programExercises[0]?.title || ''}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      </div>
    </>
  );
};

export default OrebroResult;