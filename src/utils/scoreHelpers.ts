
import { Differential, PainMechanism, SINGroup } from './types';

// Helper function to map pain intensity to SIN group
export const mapPainIntensityToSIN = (intensity: number): SINGroup => {
  if (intensity >= 0 && intensity <= 4) return 'low SIN';
  if (intensity >= 5 && intensity <= 7) return 'mid SIN';
  if (intensity >= 8 && intensity <= 10) return 'high SIN';
  return 'none';
};

// Human-readable mechanism descriptions
export const painMechanismDescriptions: Record<PainMechanism, string> = {
  'nociceptive': 'Your pain appears to be primarily nociceptive, which means it originates from tissue damage or inflammation in muscles, joints, or other tissues.',
  'neuropathic': 'Your pain appears to be primarily neuropathic, which means it is related to damage or dysfunction in your nervous system.',
  'central': 'Your pain appears to involve central sensitization, which means your nervous system has become more sensitive to pain signals.',
  'none': 'We were unable to determine a clear pain mechanism from your responses.'
};

// Human-readable SIN descriptions
export const sinGroupDescriptions: Record<SINGroup, string> = {
  'low SIN': 'Your pain has low severity, irritability, and nature, meaning it is generally mild, not easily provoked, and resolves quickly when aggravating factors are removed.',
  'mid SIN': 'Your pain has moderate severity, irritability, and nature, meaning it is somewhat intense, can be provoked with specific activities, and takes some time to resolve.',
  'high SIN': 'Your pain has high severity, irritability, and nature, meaning it is intense, easily provoked, and takes longer to resolve once triggered.',
  'none': 'We were unable to determine the severity, irritability, and nature of your pain from your responses.'
};

// Human-readable differential descriptions
export const differentialDescriptions: Record<Differential, string> = {
  'disc herniation': 'Your symptoms are consistent with a disc herniation, which involves protrusion of spinal disc material that may put pressure on nearby nerves.',
  'facet joint syndrome': 'Your symptoms suggest facet joint syndrome, which involves inflammation or irritation of the small joints in your spine.',
  'SIJ syndrome': 'Your symptoms align with sacroiliac joint (SIJ) syndrome, which involves dysfunction of the joint connecting your spine to your pelvis.',
  'muscle pain': 'Your symptoms are consistent with muscle-related pain, which may involve strain, spasm, or tension in the muscles supporting your spine.',
  'red flag': 'Some of your symptoms may require urgent medical attention. Please consult with a healthcare provider as soon as possible.',
  'ventral spondylolisthesis': 'Your symptoms suggest ventral spondylolisthesis, where a vertebra slips forward relative to the vertebra below it.',
  'dorsal spondylolisthesis': 'Your symptoms suggest dorsal spondylolisthesis, where a vertebra slips backward relative to the vertebra below it.',
  'costovertebral joint syndrome': 'Your symptoms align with costovertebral joint syndrome, which involves dysfunction of the joints where your ribs connect to your spine.',
  'Radicular Pain': 'Your symptoms suggest radicular pain, which is pain that radiates along the path of a nerve due to inflammation or irritation.',
  'Radiculopathy': 'Your symptoms are consistent with radiculopathy, which is dysfunction of a nerve root resulting in weakness, altered sensation, or reflexes.',
  'Central Sensitisation': 'Your symptoms suggest central sensitization, where your central nervous system has become hypersensitive to pain signals.',
  'Central Sensitisation - Allodynia': 'Your symptoms include allodynia, which is pain from stimuli that would not normally cause pain, indicating central sensitization.',
  'Central Sensitisation - Sensory Hypersensitivity': 'Your symptoms include sensory hypersensitivity, where environmental stimuli like light or sound become bothersome.',
  'Central Sensitisation - Cognitive Symptoms': 'Your symptoms include cognitive effects like brain fog or fatigue, which can accompany central sensitization.',
  'none': 'We were unable to identify a specific differential diagnosis from your responses.'
};

// Exercise recommendations based on pain mechanism, SIN, and differential
export const getExerciseRecommendation = (
  mechanism: PainMechanism,
  sinGroup: SINGroup,
  differential: Differential,
  painArea: string
): string => {
  // This would ideally be a more comprehensive mapping
  // For now, returning general advice based on mechanism and SIN
  
  const areaSpecific = painArea === 'neck' 
    ? 'neck and upper back' 
    : painArea === 'middle back' 
      ? 'mid-back' 
      : 'lower back and core';
  
  if (mechanism === 'nociceptive') {
    if (sinGroup === 'high SIN') {
      return `Rest and very gentle movement for your ${areaSpecific}. Focus on positions that reduce pain.`;
    } else if (sinGroup === 'mid SIN') {
      return `Gentle strengthening and mobility exercises for your ${areaSpecific}, staying within pain-free ranges.`;
    } else {
      return `Progressive strengthening and mobility exercises for your ${areaSpecific} to improve function and prevent recurrence.`;
    }
  }
  
  if (mechanism === 'neuropathic') {
    if (sinGroup === 'high SIN') {
      return `Nerve gliding exercises and gentle positioning for your ${areaSpecific} to reduce nerve irritation.`;
    } else {
      return `Nerve mobilization exercises and targeted strengthening for your ${areaSpecific} to support nerve health.`;
    }
  }
  
  if (mechanism === 'central') {
    return `Graded exposure to movement, relaxation techniques, and paced activity for your ${areaSpecific} to desensitize your nervous system.`;
  }
  
  return `Consult with a physical therapist for personalized guidance on exercises for your ${areaSpecific}.`;
};
