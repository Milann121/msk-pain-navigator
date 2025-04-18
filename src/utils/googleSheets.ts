
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { AssessmentResults, UserInfo, PainMechanism, SINGroup, Differential } from './types';

// The client email and private key would typically come from environment variables
// For this example, we'll use placeholders that should be replaced later
const GOOGLE_SERVICE_ACCOUNT_EMAIL = 'your-service-account-email@example.com';
const GOOGLE_PRIVATE_KEY = 'your-private-key';
const SPREADSHEET_ID = 'your-spreadsheet-id';

// Initialize the Google Spreadsheet
const initializeSheet = async () => {
  try {
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
    
    await doc.useServiceAccountAuth({
      client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: GOOGLE_PRIVATE_KEY,
    });
    
    await doc.loadInfo();
    return doc;
  } catch (error) {
    console.error('Error initializing Google Sheet:', error);
    throw error;
  }
};

// Save results to Google Sheets
export const saveResultsToSheet = async (results: AssessmentResults): Promise<boolean> => {
  try {
    const doc = await initializeSheet();
    const sheet = doc.sheetsByIndex[0]; // assuming we're using the first sheet
    
    // Format the data for the sheet
    await sheet.addRow({
      timestamp: results.timestamp,
      firstName: results.userInfo.firstName,
      email: results.userInfo.email,
      age: results.userInfo.age,
      painArea: results.userInfo.painArea,
      primaryMechanism: results.primaryMechanism,
      sinGroup: results.sinGroup,
      primaryDifferential: results.primaryDifferential,
      nociceptiveScore: results.scores.nociceptive,
      neuropathicScore: results.scores.neuropathic,
      centralScore: results.scores.central,
      lowSINScore: results.scores.lowSIN,
      midSINScore: results.scores.midSIN,
      highSINScore: results.scores.highSIN,
      // Add flattened differentials scores
      differentials: JSON.stringify(results.scores.differentials)
    });
    
    return true;
  } catch (error) {
    console.error('Error saving to Google Sheet:', error);
    return false;
  }
};

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
  mechanism: PainMechanism, 
  sinGroup: SINGroup,
  differential: Differential, 
  painArea: string
): string => {
  // This would be replaced with a proper mapping in production
  // For now, we'll return a placeholder link
  
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
