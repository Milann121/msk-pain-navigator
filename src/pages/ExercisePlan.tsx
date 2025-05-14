import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Differential, PainMechanism } from '@/utils/types';
import exercisesByDifferential from '@/data/exercises';
import { useAuth } from '@/contexts/AuthContext';
import { ExerciseCompletionCheckbox } from '@/components/ExerciseCompletionCheckbox';
import { Navigate } from 'react-router-dom';

const ExercisePlan = () => {
  const { user } = useAuth();
  const location = useLocation();
  const { mechanism = 'nociceptive', differential = 'none', painArea = 'lower back', assessmentId } = location.state || {};
  
  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  // Create key for exercise lookup
  const specificKey = `${mechanism}-${differential}-${painArea}`;
  const defaultKey = `${mechanism}-default-${painArea}`;
  
  // Find the appropriate exercises, first try specific, then default
  const exercises = exercisesByDifferential[specificKey] || 
                    exercisesByDifferential[defaultKey] || 
                    [{
                      title: 'Odporúčané cvičenia neboli nájdené',
                      description: 'Pre vašu kombináciu diagnózy a oblasti bolesti nemáme špecifické cvičenia. Prosím, konzultujte s fyzioterapeutom.',
                      videos: [
                        {
                          videoId: '',
                          title: '',
                          description: ''
                        }
                      ]
                    }];

  // Helper function to format mechanism for display
  const getMechanismLabel = (mechanism: PainMechanism): string => {
    const labels: Record<PainMechanism, string> = {
      'nociceptive': 'Nociceptívna bolesť',
      'neuropathic': 'Neuropatická bolesť',
      'central': 'Centrálna senzitizácia',
      'none': 'Nedefinovaný mechanizmus bolesti'
    };
    return labels[mechanism as PainMechanism] || 'Neznámy';
  };
  
  // Helper function to format differential for display
  const formatDifferential = (differential: string): string => {
    if (differential === 'none') return 'Nebola identifikovaná žiadna špecifická diagnóza';
    
    const translations: Record<string, string> = {
      'disc herniation': 'Hernia medzistavcovej platničky',
      'facet joint syndrome': 'Syndróm facetových kĺbov',
      'SIJ syndrome': 'Syndróm SI kĺbu',
      'muscle pain': 'Svalová bolesť',
      'red flag': 'Vyžaduje kontrolu u lekára/fyzioterapeuta.',
      'ventral spondylolisthesis': 'Ventrálna spondylolistéza',
      'dorsal spondylolisthesis': 'Dorzálna spondylolistéza',
      'costovertebral joint syndrome': 'Syndróm kostovertebrálneho kĺbu',
      'Radicular Pain': 'Radikulárna bolesť',
      'Radiculopathy': 'Radikulopatia',
      'Central Sensitisation': 'Centrálna senzitizácia',
      'Central Sensitisation - Allodynia': 'Centrálna senzitizácia - Alodýnia',
      'Central Sensitisation - Sensory Hypersensitivity': 'Centrálna senzitizácia - Zmyslová precitlivenosť',
      'Central Sensitisation - Cognitive Symptoms': 'Centrálna senzitizácia - Kognitívne symptómy'
    };
    
    return translations[differential] || differential;
  };

  // Format pain area for display
  const formatPainArea = (area: string): string => {
    const translations: Record<string, string> = {
      'neck': 'Krčná chrbtica',
      'middle back': 'Hrudná chrbtica',
      'lower back': 'Driekova chrbtica'
    };
    
    return translations[area] || area;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Link to="/" className="inline-flex items-center gap-2 mb-6">
        <ArrowLeft className="h-4 w-4" />
        Späť na hodnotenie
      </Link>
      
      <Card>
        <CardHeader>
          <CardTitle>Váš cvičebný plán</CardTitle>
          <CardDescription>
            Cvičenia špecifické pre {formatDifferential(differential)} v oblasti {formatPainArea(painArea)}.
            Postupujte podľa inštrukcií a v prípade bolesti cvičenie prerušte.
          </CardDescription>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {getMechanismLabel(mechanism as PainMechanism)}
            </span>
            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {formatDifferential(differential)}
            </span>
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {formatPainArea(painArea)}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          {exercises.map((exercise, index) => (
            <div key={index} className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{exercise.title}</h3>
                <p className="text-gray-600">{exercise.description}</p>
              </div>
              
              <div className="space-y-6">
                {exercise.videos.map((video, videoIndex) => (
                  <div key={videoIndex} className="space-y-4">
                    {video.title && (
                      <h4 className="text-lg font-medium text-gray-800">{video.title}</h4>
                    )}
                    <div className="aspect-video w-full">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${video.videoId}`}
                        title={video.title || exercise.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    {video.description && (
                      <p className="text-gray-600 ml-4 border-l-2 border-gray-200 pl-4">
                        {video.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {/* Exercise completion button placed below all exercises */}
          {assessmentId && (
            <div className="flex justify-center mt-8">
              <ExerciseCompletionCheckbox 
                exerciseTitle={exercises[0]?.title}
                assessmentId={assessmentId}
              />
            </div>
          )}
          
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h3 className="font-semibold text-amber-800 mb-2">Dôležité upozornenie</h3>
            <p className="text-amber-700">
              Tieto cvičenia slúžia len ako všeobecné odporúčania a nenahrádzajú návštevu fyzioterapeuta 
              alebo lekára. Ak počas cvičenia pocítite zvýšenú bolesť, závraty alebo akýkoľvek diskomfort, 
              okamžite cvičenie prerušte a vyhľadajte odbornú pomoc.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExercisePlan;
