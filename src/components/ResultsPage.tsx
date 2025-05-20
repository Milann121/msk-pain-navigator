
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AssessmentResults, PainMechanism, SINGroup, Differential } from '@/utils/types';
import { painMechanismDescriptions, sinGroupDescriptions, differentialDescriptions } from '@/utils/scoreHelpers';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface ResultsPageProps {
  results: AssessmentResults;
  onRestart: () => void;
  assessmentId?: string | null;
  assessmentSaved?: boolean;
}

const ResultsPage = ({ results, onRestart, assessmentId, assessmentSaved = false }: ResultsPageProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(assessmentSaved);
  const { userInfo, primaryMechanism, sinGroup, primaryDifferential } = results;
  
  const getMechanismLabel = (mechanism: PainMechanism): string => {
    const labels: Record<PainMechanism, string> = {
      'nociceptive': 'Nociceptívna bolesť',
      'neuropathic': 'Neuropatická bolesť',
      'central': 'Centrálna senzitizácia',
      'none': 'Nedefinovaný mechanizmus bolesti'
    };
    return labels[mechanism] || 'Neznámy';
  };
  
  const getSINLabel = (sin: SINGroup): string => {
    const labels: Record<SINGroup, string> = {
      'low SIN': 'Nízka závažnosť, dráždivosť a povaha',
      'mid SIN': 'Stredná závažnosť, dráždivosť a povaha',
      'high SIN': 'Vysoká závažnosť, dráždivosť a povaha',
      'none': 'Nedefinovaná úroveň SIN'
    };
    return labels[sin] || 'Neznámy';
  };
  
  const formatDifferential = (differential: Differential): string => {
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
      'Radicular Pain': 'Radikulárna bolesť',
      'Radiculopathy': 'Radikulopatia',
      'Central Sensitisation': 'Centrálna senzitizácia',
      'Central Sensitisation - Allodynia': 'Centrálna senzitizácia - Alodýnia',
      'Central Sensitisation - Sensory Hypersensitivity': 'Centrálna senzitizácia - Zmyslová precitlivenosť',
      'Central Sensitisation - Cognitive Symptoms': 'Centrálna senzitizácia - Kognitívne symptómy'
    };
    
    return translations[differential] || differential;
  };

  const handleExerciseClick = () => {
    navigate('/exercise-plan', { 
      state: { 
        mechanism: primaryMechanism,
        differential: primaryDifferential,
        painArea: userInfo.painArea,
        assessmentId
      } 
    });
  };

  const saveResultsToDatabase = async () => {
    // Skip saving if we already have an assessment ID or if it's already saved
    if (!user || isSaved || assessmentId) return;
    
    try {
      setIsSaving(true);
      
      const { error } = await supabase
        .from('user_assessments')
        .insert([
          { 
            user_id: user.id,
            primary_mechanism: primaryMechanism,
            sin_group: sinGroup,
            primary_differential: primaryDifferential,
            pain_area: userInfo.painArea
          }
        ]);
        
      if (error) throw error;
      
      setIsSaved(true);
      toast({
        title: 'Výsledky boli uložené',
        description: 'Vaše hodnotenie bolo úspešne uložené a nájdete ho v sekcii "Moje cviky".',
      });
    } catch (error) {
      console.error('Error saving results:', error);
      toast({
        title: 'Chyba pri ukladaní',
        description: 'Nepodarilo sa uložiť výsledky hodnotenia.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Only save results if no assessment ID was provided and not already saved
  useEffect(() => {
    if (user && !isSaved && !isSaving && !assessmentId) {
      saveResultsToDatabase();
    } else if (assessmentId) {
      // If we already have an assessment ID, mark as saved
      setIsSaved(true);
    }
  }, [user, assessmentId]);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center bg-blue-50">
        <CardTitle className="text-2xl font-bold text-blue-700">Výsledky hodnotenia</CardTitle>
        <CardDescription>
          Ďakujeme za vyplnenie MSK Navigátora bolesti
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 py-6">
        <div className="space-y-1">
          <h3 className="text-lg font-medium">Dobrý deň, {userInfo.firstName}</h3>
          <p className="text-gray-500">Analyzovali sme vaše odpovede ohľadom bolesti {userInfo.painArea}.</p>
        </div>
        
        <div className="space-y-4 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800">Primárny mechanizmus bolesti</h4>
            <p className="text-blue-700 font-medium">{getMechanismLabel(primaryMechanism)}</p>
            <p className="text-blue-600 mt-2 text-sm">{painMechanismDescriptions[primaryMechanism]}</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800">Úroveň citlivosti na bolesť</h4>
            <p className="text-green-700 font-medium">{getSINLabel(sinGroup)}</p>
            <p className="text-green-600 mt-2 text-sm">{sinGroupDescriptions[sinGroup]}</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800">Diferenciálne hodnotenie</h4>
            <p className="text-purple-700 font-medium">{formatDifferential(primaryDifferential)}</p>
            <p className="text-purple-600 mt-2 text-sm">{differentialDescriptions[primaryDifferential]}</p>
          </div>
        </div>
        
        <div className="mt-8 p-4 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-700 mb-2">Váš personalizovaný cvičebný plán</h3>
          <p className="mb-4">
            Na základe vášho hodnotenia sme pripravili personalizovaný cvičebný program
            špeciálne navrhnutý pre váš stav. Prosím, berte na vedomie, že tento program aj tak nemusí byť pre vás vhodný a v žiadnom prípade nenahrádza návštevu lekára alebo fyzioterapeuta. V prípade akéhokoľvek pocitu diskomfortu alebo zhoršenia stavu, okamžite prestaňte s cvičením!
          </p>
          
          <Button 
            onClick={handleExerciseClick}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            OTVORIŤ CVIČEBNÝ PROGRAM
          </Button>
        </div>
        
        <div className="text-sm text-gray-500 mt-6">
          <p>Toto hodnotenie nenahrádza odbornú lekársku pomoc. Pre kompletnú diagnózu a liečebný plán sa prosím poraďte so zdravotníckym pracovníkom.</p>
          {user && (
            <p className="mt-2">
              {isSaved ? 
                '✓ Výsledky boli automaticky uložené. Nájdete ich v sekcii "Moje cviky".' : 
                isSaving ? 
                  'Ukladanie výsledkov...' : 
                  'Automatické ukladanie výsledkov zlyhalo.'}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        <Button 
          onClick={onRestart} 
          variant="outline" 
          className="flex-1"
        >
          Začať nové hodnotenie
        </Button>
        {user && (
          <Button 
            onClick={() => navigate('/my-exercises')} 
            variant="secondary"
            className="flex-1"
          >
            Moje cviky
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ResultsPage;
