
import { PainMechanism } from '@/utils/types';
import { useTranslation } from 'react-i18next';

// Helper function to format mechanism for display
export const getMechanismLabel = (mechanism: PainMechanism, t: any): string => {
  // Map pain mechanisms to readable labels
  const mechanismLabels: Record<PainMechanism, string> = {
    'nociceptive': t('painMechanisms.nociceptive') || 'Nociceptive',
    'neuropathic': t('painMechanisms.neuropathic') || 'Neuropathic', 
    'central': t('painMechanisms.central') || 'Central',
    'red-flag': t('painMechanisms.red-flag') || 'Red Flag',
    'none': t('painMechanisms.none') || 'None'
  };
  
  return mechanismLabels[mechanism] || mechanism;
};

// Helper function to format differential for display
export const formatDifferential = (differential: string, t: any): string => {
  if (differential === 'none') return t('differentials.none') || 'None';
  
  return t(`differentials.${differential}`) || differential;
};

// Format pain area for display
export const formatPainArea = (area: string, t: any): string => {
  return t(`bodyParts.${area}`) || area;
};

// Helper function to get sub-area for upper limb assessments
export const getUpperLimbSubArea = (differential: string, t: any): string | null => {
  const shoulderDifferentials = [
    'frozen-shoulder',
    'slap-tear', 
    'subacromional-impingement-syndrome',
    'stiff-shoulder',
    'shoulder-bursa',
    'rotator-cuff-tear',
    'rotator-cuff-tendinopathy',
    'biceps-tendinopathy',
    'biceps-tear-long-head',
    'shoulder-dislocation',
    'unstable-shoulder',
    'labral-leason'
  ];
  
  if (shoulderDifferentials.includes(differential)) {
    return t('bodyParts.shoulder');
  }
  
  return null;
};

// Helper function to format pain area with sub-area
export const formatPainAreaWithSubArea = (painArea: string, differential: string, t: any): string => {
  let formattedArea = '';
  
  if (painArea === 'upper limb') {
    const subArea = getUpperLimbSubArea(differential, t);
    if (subArea) {
      formattedArea = `${t('bodyParts.upper limb')} / ${subArea}`;
    } else {
      formattedArea = t('bodyParts.upper limb');
    }
  } else {
    formattedArea = formatPainArea(painArea, t);
  }
  
  // Add OREBRO suffix for OREBRO programs
  if (differential === 'orebro-program') {
    formattedArea += ' - OREBRO';
  }
  
  return formattedArea;
};
