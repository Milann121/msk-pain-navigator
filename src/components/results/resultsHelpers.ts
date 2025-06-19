
import { Differential, PainMechanism, SINGroup } from '@/utils/types';

export const getMechanismLabel = (mechanism: PainMechanism): string => {
  const labels: Record<PainMechanism, string> = {
    'nociceptive': 'Nociceptívna bolesť',
    'neuropathic': 'Neuropatická bolesť',
    'central': 'Centrálna senzitizácia',
    'none': 'Nedefinovaný mechanizmus bolesti'
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
    'red flag': 'Závažný stav vyžadujúci pozornosť',
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
