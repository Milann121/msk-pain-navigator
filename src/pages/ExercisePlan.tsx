
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PainMechanism } from '@/utils/types';
import ExerciseItem from '@/components/ExerciseItem';
import exercisesByDifferential from '@/data/exercisesData';
import { formatDifferential, formatPainArea, getMechanismLabel } from '@/utils/formatHelpers';

const ExercisePlan = () => {
  const location = useLocation();
  const { mechanism = 'nociceptive', differential = 'none', painArea = 'lower back' } = location.state || {};
  
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
                          videoId: 'dQw4w9WgXcQ',
                          title: 'Základné cvičenie',
                          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
                        }
                      ]
                    }];

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
              Oblasť: {formatPainArea(painArea)}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          {exercises.map((exercise, index) => (
            <ExerciseItem key={index} exercise={exercise} />
          ))}
          
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
