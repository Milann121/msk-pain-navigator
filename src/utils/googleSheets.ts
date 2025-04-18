
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
  // This would be replaced with a proper mapping in production
  // For now, we'll return placeholder links
  
  const linkMap: Record<string, string> = {
    // Nociceptive links
    'nociceptive-low SIN-disc herniation-neck': 'https://drive.google.com/drive/folders/example1',
    'nociceptive-mid SIN-disc herniation-neck': 'https://drive.google.com/drive/folders/example2',
    'nociceptive-high SIN-disc herniation-neck': 'https://drive.google.com/drive/folders/example3',
    
    // Add more mappings for each combination as needed
    
    // Default fallback link
    'default': 'https://drive.google.com/drive/folders/default'
  };
  
  const key = `${mechanism}-${sinGroup}-${differential}-${painArea}`;
  return linkMap[key] || linkMap['default'];
};

