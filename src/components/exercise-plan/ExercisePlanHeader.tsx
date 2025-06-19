
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PainMechanism } from '@/utils/types';

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
    return labels[mechanism] || 'Neznámy';
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
      'radicular pain': 'Radikulárna bolesť',
      'radiculopathy': 'Radikulopatia',
      'central sensitisation': 'Centrálna senzitizácia',
      'central sensitisation - allodynia': 'Centrálna senzitizácia - Alodýnia',
      'central sensitisation - sensory hypersensitivity': 'Centrálna senzitizácia - Zmyslová precitlivenosť',
      'central sensitisation - cognitive symptoms': 'Centrálna senzitizácia - Kognitívne symptómy'
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
    <CardHeader>
      <CardTitle>
        {showGeneral ? 'Všeobecný cvičebný plán' : 'Váš cvičebný plán'}
      </CardTitle>
      <CardDescription>
        {showGeneral 
          ? 'Personalizovaný program s najdôležitejšími cvičeniami z vašich programov. Postupujte podľa inštrukcií a v prípade bolesti cvičenie prerušte.'
          : `Cvičenia špecifické pre ${formatDifferential(differential)} v oblasti ${formatPainArea(painArea)}. Postupujte podľa inštrukcií a v prípade bolesti cvičenie prerušte.`
        }
      </CardDescription>
      {!showGeneral && (
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {getMechanismLabel(mechanism)}
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
