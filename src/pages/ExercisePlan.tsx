
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Exercise {
  title: string;
  description: string;
  videoId: string;
}

const exercises: Record<string, Exercise[]> = {
  'nociceptive': [
    {
      title: 'Cvičenie na uvoľnenie svalov',
      description: 'Toto cvičenie pomáha uvoľniť napäté svaly a zmierniť bolesť. Vykonávajte ho pomaly a kontrolovane.',
      videoId: 'dQw4w9WgXcQ'
    },
    {
      title: 'Stabilizačné cvičenie',
      description: 'Stabilizačné cvičenia pomáhajú posilniť hlboké svaly a zlepšiť držanie tela.',
      videoId: 'dQw4w9WgXcQ'
    }
  ],
  'neuropathic': [
    {
      title: 'Nervové napínacie cvičenia',
      description: 'Tieto cvičenia pomáhajú mobilizovať nervový systém a zmierniť neuropatickú bolesť.',
      videoId: 'dQw4w9WgXcQ'
    }
  ],
  'central': [
    {
      title: 'Relaxačné techniky',
      description: 'Relaxačné cvičenia pomáhajú zmierniť centrálnu senzitizáciu a celkovú citlivosť na bolesť.',
      videoId: 'dQw4w9WgXcQ'
    }
  ]
};

const ExercisePlan = () => {
  const location = useLocation();
  const { mechanism } = location.state || { mechanism: 'nociceptive' };
  const relevantExercises = exercises[mechanism] || exercises.nociceptive;

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
            Vybrané cvičenia pre váš stav. Postupujte podľa inštrukcií a v prípade bolesti cvičenie prerušte.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {relevantExercises.map((exercise, index) => (
            <div key={index} className="space-y-4">
              <div className="aspect-video w-full">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${exercise.videoId}`}
                  title={exercise.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{exercise.title}</h3>
                <p className="text-gray-600">{exercise.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExercisePlan;
