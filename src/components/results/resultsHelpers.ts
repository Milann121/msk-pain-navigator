 
import { Differential, PainMechanism, SINGroup } from '@/utils/types';

export const getMechanismLabel = (mechanism: PainMechanism): string => {
  const labels: Record<PainMechanism, string> = {
    'nociceptive': 'Nociceptívna bolesť',
    'neuropathic': 'Neuropatická bolesť',
    'central': 'Centrálna senzitizácia',
    'none': 'Nedefinovaný mechanizmus bolesti',
    'red-flag': 'Symptómy vyžadujúce návštevu lekára'
  };
  return labels[mechanism] || 'Neznámy';
};

export const getSINLabel = (sin: SINGroup): string => {
  const labels: Record<SINGroup, string> = {
    'low SIN': 'Nízka závažnosť, dráždivosť a povaha',
    'mid SIN': 'Stredná závažnosť, dráždivosť a povaha',
    'high SIN': 'Vysoká závažnosť, dráždivosť a povaha',
    'none': 'Nedefinovaná úroveň SIN'
  };
  return labels[sin] || 'Neznámy';
};

export const formatDifferential = (differential: Differential): string => {
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
    'Central Sensitisation - Cognitive Symptoms': 'Centrálna senzitizácia - Kognitívne symptómy'
  };
  
  return translations[differential] || differential;
};
