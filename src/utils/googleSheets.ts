
import { AssessmentResults } from './types';

// For development/testing purposes only - this simulates saving to a spreadsheet
export const mockSaveResults = (results: AssessmentResults): Promise<boolean> => {
  return new Promise((resolve) => {
    console.log('Saving results to mock Google Sheet:', results);
    // Simulate a successful API call
    setTimeout(() => resolve(true), 1000);
  });
};

// Map pain mechanism and differential to exercise link
export const getExerciseLink = (
  mechanism: string, 
  sinGroup: string,
  differential: string, 
  painArea: string
): string => {
  // Structure follows: painArea/mechanism/differential
  const linkMap: Record<string, string> = {
    // Neck pain exercises
    'nociceptive-neck-disc herniation': 'https://drive.google.com/drive/folders/neck-nociceptive-disc',
    'nociceptive-neck-facet joint syndrome': 'https://drive.google.com/drive/folders/neck-nociceptive-facet',
    'neuropathic-neck-Radicular Pain': 'https://drive.google.com/drive/folders/neck-neuropathic-radicular',
    'neuropathic-neck-Radiculopathy': 'https://drive.google.com/drive/folders/neck-neuropathic-radiculopathy',
    'central-neck-Central Sensitisation': 'https://drive.google.com/drive/folders/neck-central',
    
    // Middle back exercises
    'nociceptive-middle back-disc herniation': 'https://drive.google.com/drive/folders/mid-nociceptive-disc',
    'nociceptive-middle back-facet joint syndrome': 'https://drive.google.com/drive/folders/mid-nociceptive-facet',
    'nociceptive-middle back-costovertebral joint syndrome': 'https://drive.google.com/drive/folders/mid-nociceptive-costo',
    'neuropathic-middle back-Radicular Pain': 'https://drive.google.com/drive/folders/mid-neuropathic-radicular',
    'central-middle back-Central Sensitisation': 'https://drive.google.com/drive/folders/mid-central',
    
    // Lower back exercises
    'nociceptive-lower back-disc herniation': 'https://drive.google.com/drive/folders/low-nociceptive-disc',
    'nociceptive-lower back-facet joint syndrome': 'https://drive.google.com/drive/folders/low-nociceptive-facet',
    'nociceptive-lower back-SIJ syndrome': 'https://drive.google.com/drive/folders/low-nociceptive-sij',
    'neuropathic-lower back-Radicular Pain': 'https://drive.google.com/drive/folders/low-neuropathic-radicular',
    'neuropathic-lower back-Radiculopathy': 'https://drive.google.com/drive/folders/low-neuropathic-radiculopathy',
    'central-lower back-Central Sensitisation': 'https://drive.google.com/drive/folders/low-central',
    
    // Default fallback links for each area
    'default-neck': 'https://drive.google.com/drive/folders/neck-general',
    'default-middle back': 'https://drive.google.com/drive/folders/mid-general',
    'default-lower back': 'https://drive.google.com/drive/folders/low-general'
  };
  
  // Create the key for lookup
  const primaryKey = `${mechanism}-${painArea}-${differential}`;
  
  // First try to find a specific exercise program
  if (linkMap[primaryKey]) {
    return linkMap[primaryKey];
  }
  
  // If no specific program is found, return the default for that body area
  const defaultKey = `default-${painArea}`;
  return linkMap[defaultKey] || linkMap['default-neck']; // Final fallback
};

