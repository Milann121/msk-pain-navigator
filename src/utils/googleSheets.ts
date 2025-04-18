
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
    'nociceptive-neck-disc herniation': 'https://drive.google.com/drive/folders/1Q58icgEte4FM0l8Z4pner6qDms6CSHUc?usp=sharing',
    'nociceptive-neck-facet joint syndrome': 'https://drive.google.com/drive/folders/165Z41Zw_hh8J1EchJN9iszRs577sQrKI?usp=sharing',
    'neuropathic-neck-Radicular Pain': 'https://drive.google.com/drive/folders/1-iTie4V4CmJPAeaaQGHQcvm55cCFNUKO?usp=sharing',
    'neuropathic-neck-Radiculopathy': 'https://drive.google.com/drive/folders/11mUeTF7WHQeO0tl0oi9JY1u-Idzibo-f?usp=sharing',
    'central-neck-Central Sensitisation': 'https://drive.google.com/drive/folders/1UoOptmwZBUO3y1-MfZTopo94DFVPRmTx?usp=sharing',
    
    // Middle back exercises
    'nociceptive-middle back-disc herniation': 'https://drive.google.com/drive/folders/1AGWH_6XlJCKqF0U8rYWEk8wkvN_KYI5d?usp=sharing',
    'nociceptive-middle back-facet joint syndrome': 'https://drive.google.com/drive/folders/1S7rq1G8LCvsLmStmuRn9EUGtN0_paAUj?usp=sharing',
    'nociceptive-middle back-costovertebral joint syndrome': 'https://drive.google.com/drive/folders/1hNo_JgQHmsiORMLCwNzvCQPQrCsEUKjW?usp=sharing',
    'neuropathic-middle back-Radicular Pain': 'https://drive.google.com/drive/folders/1LjI40Sg4kqXNMWiuLjizsrrsKhMsp2Ap?usp=sharing',
    'central-middle back-Central Sensitisation': 'https://drive.google.com/drive/folders/1OooL8q38JF0fg6A4L4p2DaLq_W9dhJ1e?usp=sharing',
    
    // Lower back exercises
    'nociceptive-lower back-disc herniation': 'https://drive.google.com/drive/folders/1ghrF0qTq5aGnycyxS6f3q26jIkf56g9M?usp=sharing',
    'nociceptive-lower back-facet joint syndrome': 'https://drive.google.com/drive/folders/16UVasCLPIR1JRPs9I4oPmTkjeD_K1w68?usp=sharing',
    'nociceptive-lower back-SIJ syndrome': 'https://drive.google.com/drive/folders/11WFsGMaKBp4pVvNbu5NXM3O8jbLrFBwn?usp=sharing',
    'neuropathic-lower back-Radicular Pain': 'https://drive.google.com/drive/folders/1g9oC6LfpecUBa-ziAIeo7A-GNviU5m3F?usp=sharing',
    'neuropathic-lower back-Radiculopathy': 'https://drive.google.com/drive/folders/1-adSblKReZxQthQvwZve5YHyUYRedUwr?usp=sharing',
    'central-lower back-Central Sensitisation': 'https://drive.google.com/drive/folders/1npDEXKC0E5hGLGo2i0KsDG_Kkv7L6qcu?usp=sharing',
    
    // Default fallback links for each area
    'default-neck': 'https://drive.google.com/drive/folders/1yDN14x8kyOfIA5upAijGPp60Mipfby0Q?usp=sharing',
    'default-middle back': 'https://drive.google.com/drive/folders/1smFvRus_lm1tjoWIS51fNjM_V0byvzPx?usp=sharing',
    'default-lower back': 'https://drive.google.com/drive/folders/1X4pmVOKvpdMGlVb9wrFpycx1SY0uSQN_?usp=sharing'
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
