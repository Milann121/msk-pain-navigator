
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PainMechanism } from '@/utils/types';
import { PlayCircle } from 'lucide-react';

interface ExercisePlanHeaderProps {
  showGeneral: boolean;
  differential: string;
  painArea: string;
  mechanism: PainMechanism;
}

export const ExercisePlanHeader = ({ 
  showGeneral, 
  differential, 
  painArea, 
  mechanism 
}: ExercisePlanHeaderProps) => {
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
    <CardHeader className={showGeneral ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200' : ''}>
      <CardTitle className={showGeneral ? 'text-blue-800' : ''}>
        {showGeneral && (
          <div className="flex items-center gap-2 mb-2">
            <PlayCircle className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-semibold text-blue-600">Všeobecný program</span>
          </div>
        )}
        {showGeneral ? 'Personalizovaný cvičebný plán' : 'Váš cvičebný plán'}
      </CardTitle>
      <CardDescription className={showGeneral ? 'text-blue-700' : ''}>
        {showGeneral 
          ? 'Personalizovaný program s najdôležitejšími cvičeniami z vašich programov. Postupujte podľa inštrukcií a v prípade bolesti cvičenie prerušte.'
          : `Cvičenia špecifické pre ${formatDifferential(differential)} v oblasti ${formatPainArea(painArea)}. Postupujte podľa inštrukcií a v prípade bolesti cvičenie prerušte.`
        }
      </CardDescription>
      {showGeneral && (
        <div className="mt-3 p-3 bg-blue-100 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800 font-medium">
            ✨ Tento program kombinuje najdôležitejšie cvičenia z vašich hodnotení pre maximálny efekt
          </p>
        </div>
      )}
      {!showGeneral && (
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
      )}
    </CardHeader>
  );
};
