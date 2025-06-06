
import { format } from 'date-fns';

export const formatDate = (dateString: string): string => {
  return format(new Date(dateString), 'dd.MM.yyyy HH:mm');
};

export const formatMechanism = (mechanism: string): string => {
  const mechanisms: Record<string, string> = {
    'nociceptive': 'Nociceptívna',
    'neuropathic': 'Neuropatická', 
    'central': 'Centrálna senzitizácia',
    'none': 'Nedefinovaný'
  };
  return mechanisms[mechanism] || mechanism;
};

export const formatDifferential = (differential: string): string => {
  if (differential === 'none') return 'Bez špecifickej diagnózy';
  
  const differentials: Record<string, string> = {
    'disc herniation': 'Hernia platničky',
    'facet joint syndrome': 'Syndróm facetových kĺbov',
    'SIJ syndrome': 'Syndróm SI kĺbu',
    'muscle pain': 'Svalová bolesť',
    'red flag': 'Vyžaduje kontrolu',
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
  
  return differentials[differential] || differential;
};

export const formatPainArea = (area: string): string => {
  const areas: Record<string, string> = {
    'neck': 'Krčná chrbtica',
    'middle back': 'Hrudná chrbtica', 
    'lower back': 'Driekova chrbtica'
  };
  
  return areas[area] || area;
};
