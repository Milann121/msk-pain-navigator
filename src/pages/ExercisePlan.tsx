import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Differential, PainMechanism } from '@/utils/types';
import { Description, Title } from '@radix-ui/react-toast';

interface Exercise {
  title: string;
  description: string;
  videos: Array<{
    videoId: string;
    title?: string;
    description?: string;
  }>;
}

// Updated exercises data structure with multiple videos per exercise
const exercisesByDifferential: Record<string, Exercise[]> = {
  // Nociceptive - Disc Herniation
  'nociceptive-disc herniation-neck': [
    {
      title: 'Program 0-3 týždeň',
      description: 'Jemné cvičenia na posilnenie hlbokých krčných svalov, ktoré pomáhajú stabilizovať krčnú chrbticu a znížiť tlak na medzistavcové platničky.',
      videos: [
        {
          videoId: 'eL5KxSe3c1g',
          title: 'McKenzie záklony krčnej chrbtice',
          description: 'Postup:\n➜ posaďte sa a uvoľnite trapézy\n➜ vtiahnite bradu dnu (zásuvka), ale nezdvíhajte pri tom plecia, ani hlavu nepredkláňajte\n➜ zakloňte hlavu do rozsahu, ktorý je vám komfortný a nespôsobuje veľa bolesti\n➜ v záklone urobte krátke rotácie hlavy do oboch strán\n➜ OPAKOVANIA: záklon opakujte 5-10x za sebou s 3-5 rotáciami do každej strany ➜ 5x denne. '
        },
        {
          videoId: '7WAoHWIxgEI',
          title: 'Neurodynamika horných končatín',
          description: 'Postup:\n➜posaďte sa a uvoľnite trapézy\n➜ upažte ruku s dlaňou smerujúcou hore\n➜ ohnite dlaň do polohy od seba, spolu s vystretými prstami\n➜ vráťte dlaň naspäť a pokrčte lakeť do 90 stupňov\n ➜ pohyb zopakujte \n➜ OPAKOVANIA: zopakujte 10-15 x /5x denne'
        },
        {
          videoId: ' ',
          title: '...',
          description: '...'
        }
      ]
    },
    {
      title: 'Trakčné cvičenia pre krčnú chrbticu',
      description: 'Cvičenia zamerané na jemné natiahnutie krčnej chrbtice na zníženie tlaku na nervové korene a zlepšenie mobility.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Trakčné cvičenie v ľahu',
          description: 'Vykonávajte toto cvičenie v ľahu na chrbte.'
        },
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Trakčné cvičenie v sede',
          description: 'Alternatívna verzia cvičenia v sede.'
        }
      ]
    }
  ],
  'nociceptive-disc herniation-lower back': [
    {
      title: 'Pogram cvičení 0-3 týždeň',
      description: 'Základné cvičenia pri pravdepodobnom poškodení platničiek s cieľom redukovať bolesť a zabrániť ďaľšiemu poškodeniu.',
      videos: [
        {
          videoId: 'tIZppe-RB0g',
          title: 'McKenzie záklony',
          description: 'Postup:\n➜ uložte sa na brucho s rukami podľa videa\n➜ dlaňami odtlačte trup od podložky do záklonu\n➜ upozornenie: držte zadok uvoľnený, nezatínajte sedacie svaly!\n➜ zakláňajte sa iba do bodu, pokiaľ je pohyb komfortný a nespôsobuje vám viac bolesti\nOPAKOVANIA: 10x / 4-5x denne'
        },
        {
          videoId: '3A27NLPe2bs',
          title: 'Neurodynamika sedacieho nervu',
          description: 'Popis vo videu.\nOPAKOVANIA: 15x / 3-5x denne\nUPOZORNENIE: ihneď po cvičení môžete pociťovať mierne trnutie nohy. Malo by prejsť do pól minúty, v opačnom prípade znížte počet opakovaní alebo cvik vynechajte.'
        },
        {
          videoId: 'PMJsVceAnnY',
          title:'Strečing sedacích svalov.',
          description: 'Popis vo videu.\nOPAKOVANIA: 5x denne.'
        }
      ]
    }
  ],

  // NOCICEPTIVE - Facet Joint Syndrome
  'nociceptive-facet joint syndrome-neck': [
    {
      title: 'Jemná rotácia krku',
      description: 'Cvičenie na zlepšenie mobility facetových kĺbov v krčnej oblasti pri minimálnom zaťažení.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        },
      ]
    }
  ],
  'nociceptive-facet joint syndrome-middle back': [
    {
      title: 'Rotačné cvičenia pre hrudnú chrbticu',
      description: 'Jemné rotačné pohyby pre zlepšenie mobility facetových kĺbov v hrudnej oblasti.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    }
  ],
  'nociceptive-facet joint syndrome-lower back': [
    {
      title: 'Rotačné cvičenia pre driek',
      description: 'Cvičenia zamerané na mobilizáciu facetových kĺbov v driekovej oblasti s dôrazom na kontrolovaný pohyb.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    }
  ],

  // Nociceptive - SIJ Syndrome
  'nociceptive-SIJ syndrome-lower back': [
    {
      title: 'Stabilizačné cvičenia pre SI kĺb',
      description: 'Cvičenia zamerané na stabilizáciu sakroiliakálneho kĺbu a zlepšenie jeho funkcie.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    },
    {
      title: 'Mobilizácia panvy',
      description: 'Jemné cvičenia na zlepšenie mobility panvy a sakroiliakálneho kĺbu.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    }
  ],

  // NEUROPATHIC - Radicular Pain
  'neuropathic-Radicular Pain-neck': [
    {
      title: 'Nervové napínacie cvičenia pre krk',
      description: 'Jemné cvičenia na uvoľnenie nervových koreňov v krčnej oblasti a zníženie neurologických príznakov.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    }
  ],
  'neuropathic-Radicular Pain-middle back': [
    {
      title: 'Nervové mobilizačné cvičenia pre hrudnú chrbticu',
      description: 'Cvičenia zamerané na mobilizáciu nervových koreňov v hrudnej oblasti.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    }
  ],
  'neuropathic-Radicular Pain-lower back': [
    {
      title: 'Nervové napínacie cvičenia pre driek',
      description: 'Cvičenia zamerané na jemnú mobilizáciu nervových štruktúr v driekovej oblasti.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    }
  ],

  // NEUROPAHIC - Radiculopathy
  'neuropathic-Radiculopathy-neck': [
    {
      title: 'Cvičenia na posilnenie krčných svalov',
      description: 'Cvičenia zamerané na posilnenie svalov, ktoré podporujú krčnú chrbticu a znižujú tlak na nervové korene.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    }
  ],
  'neuropathic-Radiculopathy-lower back': [
    {
      title: 'Cvičenia na posilnenie core',
      description: 'Cvičenia zamerané na posilnenie core svalov na podporu driekovej chrbtice a zníženie tlaku na nervové korene.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    }
  ],

  // CENTRAL - Central Sensitisation
  'central-Central Sensitisation-neck': [
    {
      title: 'Relaxačné cvičenia pre krk',
      description: 'Jemné cvičenia zamerané na relaxáciu a zníženie napätia v krčnej oblasti.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    },
    {
      title: 'Dychové cvičenia',
      description: 'Cvičenia zamerané na dychové techniky pomáhajúce znížiť stres a napätie, ktoré môžu prispievať k centrálnej senzitizácii.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    }
  ],
  'central-Central Sensitisation-middle back': [
    {
      title: 'Joga pre hrudnú chrbticu',
      description: 'Jemné jogové cvičenia pre relaxáciu hrudnej chrbtice a zníženie celkového napätia v tele.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    }
  ],
  'central-Central Sensitisation-lower back': [
    {
      title: 'Relaxačné cvičenia pre driek',
      description: 'Jemné cvičenia zamerané na relaxáciu a zníženie napätia v driekovej oblasti.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    },
    {
      title: 'Meditatívne dychové techniky',
      description: 'Techniky pre zníženie stresu a napätia, ktoré môžu prispievať k centrálnej senzitizácii bolesti.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    }
  ],

  // DEFAULT exercises for when specific combinations aren't found
  'nociceptive-default-neck': [
    {
      title: 'Základné cvičenia pre krčnú chrbticu',
      description: 'Všeobecné cvičenia na posilnenie a mobilizáciu krčnej chrbtice.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    }
  ],
  'nociceptive-default-middle back': [
    {
      title: 'Základné cvičenia pre hrudnú chrbticu',
      description: 'Všeobecné cvičenia na posilnenie a mobilizáciu hrudnej chrbtice.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    }
  ],

  'nociceptive-default-lower back': [
    {
      title: 'Pogram cvičení 0-3 týždeň',
      description: 'Základné cvičenia pri pravdepodobnom poškodení platničiek s cieľom redukovať bolesť a zabrániť ďaľšiemu poškodeniu.',
      videos: [
        {
          videoId: 'tIZppe-RB0g',
          title: 'McKenzie záklony',
          description: 'Postup:\n➜ uložte sa na brucho s rukami podľa videa\n➜ dlaňami odtlačte trup od podložky do záklonu\n➜ upozornenie: držte zadok uvoľnený, nezatínajte sedacie svaly!\n➜ zakláňajte sa iba do bodu, pokiaľ je pohyb komfortný a nespôsobuje vám viac bolesti\nOPAKOVANIA: 10x / 4-5x denne'
        },
        {
          videoId: '3A27NLPe2bs',
          title: 'Neurodynamika sedacieho nervu',
          description: 'Popis vo videu.\nOPAOVANIA: 15x / 3-5x denne\nUPOZORNENIE: ihneď po cvičení môžete pociťovať mierne trnutie nohy. Malo by prejsť do pól minúty, v opačnom prípade znížte počet opakovaní alebo cvik vynechajte.'
        },
        {
          videoId: 'PMJsVceAnnY',
          title:'Strečing sedacích svalov.',
          description: 'Popis vo videu.\nOPAKOVANIA: 5x denne.'
        }
      ]
    }
  ],
  'neuropathic-default-neck': [
    {
      title: 'Základné neuropatické cvičenia pre krk',
      description: 'Všeobecné cvičenia na mobilizáciu nervových štruktúr v krčnej oblasti.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    }
  ],
  'neuropathic-default-middle back': [
    {
      title: 'Základné neuropatické cvičenia pre hrudník',
      description: 'Všeobecné cvičenia na mobilizáciu nervových štruktúr v hrudnej oblasti.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    }
  ],
  'neuropathic-default-lower back': [
    {
      title: 'Základné neuropatické cvičenia pre driek',
      description: 'Všeobecné cvičenia na mobilizáciu nervových štruktúr v driekovej oblasti.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    }
  ],
  'central-default-neck': [
    {
      title: 'Základné cvičenia pre centrálnu senzitizáciu - krk',
      description: 'Relaxačné a dychové cvičenia pre zníženie citlivosti na bolesť v krčnej oblasti.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    }
  ],
  'central-default-middle back': [
    {
      title: 'Základné cvičenia pre centrálnu senzitizáciu - hrudník',
      description: 'Relaxačné a dychové cvičenia pre zníženie citlivosti na bolesť v hrudnej oblasti.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    }
  ],
  'central-default-lower back': [
    {
      title: 'Základné cvičenia pre centrálnu senzitizáciu - driek',
      description: 'Relaxačné a dychové cvičenia pre zníženie citlivosti na bolesť v driekovej oblasti.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
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
                      videos: [
                        {
                          videoId: 'dQw4w9WgXcQ',
                          title: 'Základné cvičenie',
                          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
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
