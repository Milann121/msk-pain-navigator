
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AssessmentResults, PainMechanism, SINGroup, Differential } from '@/utils/types';
import { painMechanismDescriptions, sinGroupDescriptions, differentialDescriptions, getExerciseRecommendation } from '@/utils/scoreHelpers';

interface ResultsPageProps {
  results: AssessmentResults;
  exerciseLink: string;
  onRestart: () => void;
}

const ResultsPage = ({ results, exerciseLink, onRestart }: ResultsPageProps) => {
  const { userInfo, primaryMechanism, sinGroup, primaryDifferential } = results;
  
  const getMechanismLabel = (mechanism: PainMechanism): string => {
    const labels: Record<PainMechanism, string> = {
      'nociceptive': 'Nociceptive Pain',
      'neuropathic': 'Neuropathic Pain',
      'central': 'Central Sensitization',
      'none': 'Undefined Pain Mechanism'
    };
    return labels[mechanism] || 'Unknown';
  };
  
  const getSINLabel = (sin: SINGroup): string => {
    const labels: Record<SINGroup, string> = {
      'low SIN': 'Low Severity, Irritability, and Nature',
      'mid SIN': 'Moderate Severity, Irritability, and Nature',
      'high SIN': 'High Severity, Irritability, and Nature',
      'none': 'Undefined SIN Level'
    };
    return labels[sin] || 'Unknown';
  };
  
  const formatDifferential = (differential: Differential): string => {
    if (differential === 'none') return 'No specific differential identified';
    return differential.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
  };
  
  const getDescription = (): string => {
    return getExerciseRecommendation(primaryMechanism, sinGroup, primaryDifferential, userInfo.painArea);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center bg-blue-50">
        <CardTitle className="text-2xl font-bold text-blue-700">Assessment Results</CardTitle>
        <CardDescription>
          Thank you for completing the MSK Pain Navigator assessment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 py-6">
        <div className="space-y-1">
          <h3 className="text-lg font-medium">Hello, {userInfo.firstName}</h3>
          <p className="text-gray-500">We've analyzed your responses for your {userInfo.painArea} pain.</p>
        </div>
        
        <div className="space-y-4 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800">Primary Pain Mechanism</h4>
            <p className="text-blue-700 font-medium">{getMechanismLabel(primaryMechanism)}</p>
            <p className="text-blue-600 mt-2 text-sm">{painMechanismDescriptions[primaryMechanism]}</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800">Pain Sensitivity Level</h4>
            <p className="text-green-700 font-medium">{getSINLabel(sinGroup)}</p>
            <p className="text-green-600 mt-2 text-sm">{sinGroupDescriptions[sinGroup]}</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800">Differential Assessment</h4>
            <p className="text-purple-700 font-medium">{formatDifferential(primaryDifferential)}</p>
            <p className="text-purple-600 mt-2 text-sm">{differentialDescriptions[primaryDifferential]}</p>
          </div>
        </div>
        
        <div className="mt-8 p-4 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-700 mb-2">Your Personalized Exercise Plan</h3>
          <p className="mb-4">
            Based on your assessment, we've prepared a personalized exercise program specifically 
            designed for your condition.
          </p>
          
          <div className="bg-blue-50 p-3 rounded-md mb-4">
            <p className="text-blue-700">{getDescription()}</p>
          </div>
          
          <a 
            href={exerciseLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Access Your Complete Exercise Program
          </a>
        </div>
        
        <div className="text-sm text-gray-500 mt-6">
          <p>This assessment is not a substitute for professional medical advice. Please consult with a healthcare provider for a complete diagnosis and treatment plan.</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onRestart} 
          variant="outline" 
          className="w-full"
        >
          Start a New Assessment
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResultsPage;
