
import { PainMechanism } from '@/utils/types';

// Helper function to format mechanism for display
export const getMechanismLabel = (mechanism: PainMechanism): string => {
  const labels: Record<PainMechanism, string> = {
    'nociceptive': 'Nociceptívna bolesť',
    'neuropathic': 'Neuropatická bolesť',
    'central': 'Centrálna senzitizácia',
    'none': 'Nedefinovaný mechanizmus bolesti',
    'red-flag': 'Symptómy vyžadujúce návštevu lekára'
  };
  return labels[mechanism as PainMechanism] || 'Neznámy';
};

// Helper function to format differential for display
export const formatDifferential = (differential: string): string => {
  if (differential === 'none') return 'Nebola identifikovaná žiadna špecifická diagnóza';
  
  const translations: Record<string, string> = {
    'disc herniation': 'Hernia medzistavcovej platničky',
    'facet joint syndrome': 'Syndróm facetových kĺbov',
    'SIJ syndrome': 'Syndróm SI kĺbu',
    'muscle pain': 'Svalová bolesť',
    'red flag': 'Symptómy vyžadujúce návštevu lekára',
    'ventral spondylolisthesis': 'Ventrálna spondylolistéza',
    'dorsal spondylolisthesis': 'Dorzálna spondylolistéza',
    'costovertebral joint syndrome': 'Syndróm kostovertebrálneho kĺbu',
    'Radicular Pain': 'Radikulárna bolesť',
    'Radiculopathy': 'Radikulopatia',
    'Central Sensitisation': 'Centrálna senzitizácia',
    'Central Sensitisation - Allodynia': 'Centrálna senzitizácia - Alodýnia',
    'Central Sensitisation - Sensory Hypersensitivity': 'Centrálna senzitizácia - Zmyslová precitlivenosť',
    'Central Sensitisation - Cognitive Symptoms': 'Centrálna senzitizácia - Kognitívne symptómy',
    'cervical-radiculopathy': 'Cervikalna radikulopatia'
  };
  
  return translations[differential] || differential;
};

// Format pain area for display
export const formatPainArea = (area: string): string => {
  const translations: Record<string, string> = {
    'neck': 'Krčná chrbtica',
    'middle back': 'Hrudná chrbtica',
    'lower back': 'Driekova chrbtica'
  };
  
  return translations[area] || area;
};
