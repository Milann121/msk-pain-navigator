
import { AssessmentResults, PainMechanism, SINGroup, Differential } from './types';

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
  // Use a single valid Google Drive folder as fallback
  const defaultDriveLink = "https://drive.google.com/drive/folders/1yDN14x8kyOfIA5upAijGPp60Mipfby0Q";
  
  // Create mapping of specific combinations to real Google Drive folders
  // Since we need working links, we'll use the default link for all combinations for now
  // In a real implementation, you would replace these with actual folder URLs
  const linkMap: Record<string, string> = {
    // Neck pain exercises
    'nociceptive-neck-disc herniation': defaultDriveLink,
    'nociceptive-neck-facet joint syndrome': defaultDriveLink,
    'neuropathic-neck-Radicular Pain': defaultDriveLink,
    'neuropathic-neck-Radiculopathy': defaultDriveLink,
    'central-neck-Central Sensitisation': defaultDriveLink,
    
    // Middle back exercises
    'nociceptive-middle back-disc herniation': defaultDriveLink,
    'nociceptive-middle back-facet joint syndrome': defaultDriveLink,
    'nociceptive-middle back-costovertebral joint syndrome': defaultDriveLink,
    'neuropathic-middle back-Radicular Pain': defaultDriveLink,
    'central-middle back-Central Sensitisation': defaultDriveLink,
    
    // Lower back exercises
    'nociceptive-lower back-disc herniation': defaultDriveLink,
    'nociceptive-lower back-facet joint syndrome': defaultDriveLink,
    'nociceptive-lower back-SIJ syndrome': defaultDriveLink,
    'neuropathic-lower back-Radicular Pain': defaultDriveLink,
    'neuropathic-lower back-Radiculopathy': defaultDriveLink,
    'central-lower back-Central Sensitisation': defaultDriveLink,
    
    // Default fallback links for each area
    'default-neck': defaultDriveLink,
    'default-middle back': defaultDriveLink,
    'default-lower back': defaultDriveLink
  };
  
  // Create the key for lookup
  const primaryKey = `${mechanism}-${painArea}-${differential}`;
  
  // First try to find a specific exercise program
  if (linkMap[primaryKey]) {
    return linkMap[primaryKey];
  }
  
  // If no specific program is found, return the default for that body area
  const defaultKey = `default-${painArea}`;
  return linkMap[defaultKey] || defaultDriveLink; // Final fallback
};
