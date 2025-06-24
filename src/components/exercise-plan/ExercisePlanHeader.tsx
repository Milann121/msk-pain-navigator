
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PainMechanism } from '@/utils/types';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  
  // Helper function to format mechanism for display
  const getMechanismLabel = (mechanism: PainMechanism): string => {
    const labels: Record<PainMechanism, string> = {
      'nociceptive': 'Nociceptívna bolesť',
      'neuropathic': 'Neuropatická bolesť',
      'central': 'Centrálna senzitizácia',
      'none': 'Nedefinovaný mechanizmus bolesti',
      'red-flag': 'Symptómy vyžadujúce návštevu lekára',
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
      'red-flag': 'Symptómy vyžadujúce návštevu lekára',
      'ventral spondylolisthesis': 'Ventrálna spondylolistéza',
      'dorsal spondylolisthesis': 'Dorzálna spondylolistéza',
      'costovertebral joint syndrome': 'Syndróm kostovertebrálneho kĺbu',
      'Radicular Pain': 'Radikulárna bolesť',
      'Radiculopathy': 'Radikulopatia',
      'Central Sensitisation': 'Centrálna senzitizácia',
      'Central Sensitisation - Allodynia': 'Centrálna senzitizácia - Alodýnia',
      'Central Sensitisation - Sensory Hypersensitivity': 'Centrálna senzitizácia - Zmyslová precitlivenosť',
      'Central Sensitisation - Cognitive Symptoms': 'Centrálna senzitizácia - Kognitívne symptómy',
      'cervical-radiculopathy': 'Cervikalna radikulopatia',
      
      // Upper limb diagnoses - Slovak translations
      'frozen-shoulder': 'Zmrznuté rameno',
      'slap-tear': 'Lézia labra',
      'subacromional-impingement-syndrome': 'Impingement syndróm ramena',
      'stiff-shoulder': 'Syndróm stuhnutého ramena',
      'shoulder-bursa': 'Burzitída',
      'rotator-cuff-tear': 'Porucha rotátorovej manžety',
      'rotator-cuff-tendinopathy': 'Porucha rotátorovej manžety',
      'biceps-tendinopathy': 'Porucha bicepsovej šľachy',
      'biceps-tear-long-head': 'Porucha bicepsovej šľachy',
      'shoulder-dislocation': 'Dislokácia ramena',
      'unstable-shoulder': 'Nestabilné rameno',
      'labral-leason': 'Lézia labra'
    };
    
    return translations[differential] || differential;
  };

  // Format pain area for display
  const formatPainArea = (area: string): string => {
    const translations: Record<string, string> = {
      'neck': 'Krčná chrbtica',
      'middle back': 'Hrudná chrbtica',
      'lower back': 'Driekova chrbtica',
      'upper limb': 'Horná končatina'
    };
    
    return translations[area] || area;
  };

  return (
    <CardHeader>
      <CardTitle>
        {showGeneral ? t('exercisePlanPage.generalTitle') : t('exercisePlanPage.title')}
      </CardTitle>
      <CardDescription>
        {showGeneral 
          ? t('exercisePlanPage.generalDescription')
          : t('exercisePlanPage.specificDescription', { 
              diagnosis: formatDifferential(differential), 
              painArea: formatPainArea(painArea) 
            })
        }
      </CardDescription>
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
