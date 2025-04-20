
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Differential, PainMechanism } from '@/utils/types';

interface Exercise {
  title: string;
  description: string;
  videoId: string;
}

// Organized exercises by differential diagnosis and body part
const exercisesByDifferential: Record<string, Exercise[]> = {
  // Nociceptive - Disc Herniation
  'nociceptive-disc herniation-neck': [
    {
      title: 'Cvičenie na stabilizáciu krku',
      description: 'Jemné cvičenia na posilnenie hlbokých krčných svalov, ktoré pomáhajú stabilizovať krčnú chrbticu a znížiť tlak na medzistavcové platničky.',
      videoId: 'dQw4w9WgXcQ'
    },
    {
      title: 'Trakčné cvičenia pre krčnú chrbticu',
      description: 'Cvičenia zamerané na jemné natiahnutie krčnej chrbtice na zníženie tlaku na nervové korene a zlepšenie mobility.',
      videoId: 'dQw4w9WgXcQ'
    }
  ],
  'nociceptive-disc herniation-middle back': [
    {
      title: 'Stabilizačné cvičenia pre hrudnú chrbticu',
      description: 'Cvičenia na posilnenie svalov, ktoré podporujú hrudnú chrbticu a znižujú tlak na medzistavcové platničky.',
      videoId: 'dQw4w9WgXcQ'
    }
  ],
  'nociceptive-disc herniation-lower back': [
    {
      title: 'Mačací chrbát',
      description: 'Mobilizačné cvičenie na zmiernenie tlaku na medzistavcové platničky v driekovej oblasti a predĺženie priestoru medzi stavcami.',
      videoId: 'dQw4w9WgXcQ'
    },
    {
      title: 'Stabilizačné cvičenia pre driekovú chrbticu',
      description: 'Cvičenia na posilnenie core svalov, ktoré podporujú driekovú chrbticu a znižujú tlak na medzistavcové platničky.',
      videoId: 'dQw4w9WgXcQ'
    }
  ],

  // Nociceptive - Facet Joint Syndrome
  'nociceptive-facet joint syndrome-neck': [
    {
      title: 'Jemná rotácia krku',
      description: 'Cvičenie na zlepšenie mobility facetových kĺbov v krčnej oblasti pri minimálnom zaťažení.',
      videoId: 'dQw4w9WgXcQ'
    }
  ],
  'nociceptive-facet joint syndrome-middle back': [
    {
      title: 'Rotačné cvičenia pre hrudnú chrbticu',
      description: 'Jemné rotačné pohyby pre zlepšenie mobility facetových kĺbov v hrudnej oblasti.',
      videoId: 'dQw4w9WgXcQ'
    }
  ],
  'nociceptive-facet joint syndrome-lower back': [
    {
      title: 'Rotačné cvičenia pre driek',
      description: 'Cvičenia zamerané na mobilizáciu facetových kĺbov v driekovej oblasti s dôrazom na kontrolovaný pohyb.',
      videoId: 'dQw4w9WgXcQ'
    }
  ],

  // Nociceptive - SIJ Syndrome
  'nociceptive-SIJ syndrome-lower back': [
    {
      title: 'Stabilizačné cvičenia pre SI kĺb',
      description: 'Cvičenia zamerané na stabilizáciu sakroiliakálneho kĺbu a zlepšenie jeho funkcie.',
      videoId: 'dQw4w9WgXcQ'
    },
    {
      title: 'Mobilizácia panvy',
      description: 'Jemné cvičenia na zlepšenie mobility panvy a sakroiliakálneho kĺbu.',
      videoId: 'dQw4w9WgXcQ'
    }
  ],

  // Neuropathic - Radicular Pain
  'neuropathic-Radicular Pain-neck': [
    {
      title: 'Nervové napínacie cvičenia pre krk',
      description: 'Jemné cvičenia na uvoľnenie nervových koreňov v krčnej oblasti a zníženie neurologických príznakov.',
      videoId: 'dQw4w9WgXcQ'
    }
  ],
  'neuropathic-Radicular Pain-middle back': [
    {
      title: 'Nervové mobilizačné cvičenia pre hrudnú chrbticu',
      description: 'Cvičenia zamerané na mobilizáciu nervových koreňov v hrudnej oblasti.',
      videoId: 'dQw4w9WgXcQ'
    }
  ],
  'neuropathic-Radicular Pain-lower back': [
    {
      title: 'Nervové napínacie cvičenia pre driek',
      description: 'Cvičenia zamerané na jemnú mobilizáciu nervových štruktúr v driekovej oblasti.',
      videoId: 'dQw4w9WgXcQ'
    }
  ],

  // Neuropathic - Radiculopathy
  'neuropathic-Radiculopathy-neck': [
    {
      title: 'Cvičenia na posilnenie krčných svalov',
      description: 'Cvičenia zamerané na posilnenie svalov, ktoré podporujú krčnú chrbticu a znižujú tlak na nervové korene.',
      videoId: 'dQw4w9WgXcQ'
    }
  ],
  'neuropathic-Radiculopathy-lower back': [
    {
      title: 'Cvičenia na posilnenie core',
      description: 'Cvičenia zamerané na posilnenie core svalov na podporu driekovej chrbtice a zníženie tlaku na nervové korene.',
      videoId: 'dQw4w9WgXcQ'
    }
  ],

  // Central - Central Sensitisation
  'central-Central Sensitisation-neck': [
    {
      title: 'Relaxačné cvičenia pre krk',
      description: 'Jemné cvičenia zamerané na relaxáciu a zníženie napätia v krčnej oblasti.',
      videoId: 'dQw4w9WgXcQ'
    },
    {
      title: 'Dychové cvičenia',
      description: 'Cvičenia zamerané na dychové techniky pomáhajúce znížiť stres a napätie, ktoré môžu prispievať k centrálnej senzitizácii.',
      videoId: 'dQw4w9WgXcQ'
    }
  ],
  'central-Central Sensitisation-middle back': [
    {
      title: 'Joga pre hrudnú chrbticu',
      description: 'Jemné jogové cvičenia pre relaxáciu hrudnej chrbtice a zníženie celkového napätia v tele.',
      videoId: 'dQw4w9WgXcQ'
    }
  ],
  'central-Central Sensitisation-lower back': [
    {
      title: 'Relaxačné cvičenia pre driek',
      description: 'Jemné cvičenia zamerané na relaxáciu a zníženie napätia v driekovej oblasti.',
      videoId: 'dQw4w9WgXcQ'
    },
    {
      title: 'Meditatívne dychové techniky',
      description: 'Techniky pre zníženie stresu a napätia, ktoré môžu prispievať k centrálnej senzitizácii bolesti.',
      videoId: 'dQw4w9WgXcQ'
    }
  ],

  // Default exercises for when specific combinations aren't found
  'nociceptive-default-neck': [
    {
      title: 'Základné cvičenia pre krčnú chrbticu',
      description: 'Všeobecné cvičenia na posilnenie a mobilizáciu krčnej chrbtice.',
      videoId: 'dQw4w9WgXcQ'
    }
  ],
  'nociceptive-default-middle back': [
    {
      title: 'Základné cvičenia pre hrudnú chrbticu',
      description: 'Všeobecné cvičenia na posilnenie a mobilizáciu hrudnej chrbtice.',
      videoId: 'dQw4w9WgXcQ'
    }
  ],
  'nociceptive-default-lower back': [
    {
      title: 'Základné cvičenia pre driekovú chrbticu',
      description: 'Všeobecné cvičenia na posilnenie a mobilizáciu driekovej chrbtice.',
      videoId: 'dQw4w9WgXcQ'
    }
  ],
  'neuropathic-default-neck': [
    {
      title: 'Základné neuropatické cvičenia pre krk',
      description: 'Všeobecné cvičenia na mobilizáciu nervových štruktúr v krčnej oblasti.',
      videoId: 'dQw4w9WgXcQ'
    }
  ],
  'neuropathic-default-middle back': [
    {
      title: 'Základné neuropatické cvičenia pre hrudník',
      description: 'Všeobecné cvičenia na mobilizáciu nervových štruktúr v hrudnej oblasti.',
      videoId: 'dQw4w9WgXcQ'
    }
  ],
  'neuropathic-default-lower back': [
    {
      title: 'Základné neuropatické cvičenia pre driek',
      description: 'Všeobecné cvičenia na mobilizáciu nervových štruktúr v driekovej oblasti.',
      videoId: 'dQw4w9WgXcQ'
    }
  ],
  'central-default-neck': [
    {
      title: 'Základné cvičenia pre centrálnu senzitizáciu - krk',
      description: 'Relaxačné a dychové cvičenia pre zníženie citlivosti na bolesť v krčnej oblasti.',
      videoId: 'dQw4w9WgXcQ'
    }
  ],
  'central-default-middle back': [
    {
      title: 'Základné cvičenia pre centrálnu senzitizáciu - hrudník',
      description: 'Relaxačné a dychové cvičenia pre zníženie citlivosti na bolesť v hrudnej oblasti.',
      videoId: 'dQw4w9WgXcQ'
    }
  ],
  'central-default-lower back': [
    {
      title: 'Základné cvičenia pre centrálnu senzitizáciu - driek',
      description: 'Relaxačné a dychové cvičenia pre zníženie citlivosti na bolesť v driekovej oblasti.',
      videoId: 'dQw4w9WgXcQ'
    }
  ]
};

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
                      videoId: 'dQw4w9WgXcQ'
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
      'red flag': 'Závažný stav vyžadujúci pozornosť',
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
      'neck': 'krčnej chrbtice',
      'middle back': 'hrudnej chrbtice',
      'lower back': 'driekovej chrbtice'
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
              Oblasť: {formatPainArea(painArea)}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          {exercises.map((exercise, index) => (
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
