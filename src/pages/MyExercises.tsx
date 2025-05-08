
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';

interface UserAssessment {
  id: string;
  primary_mechanism: string;
  sin_group: string;
  primary_differential: string;
  pain_area: string;
  timestamp: string;
}

const MyExercises = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [assessments, setAssessments] = useState<UserAssessment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAssessments = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('user_assessments')
          .select('*')
          .order('timestamp', { ascending: false });

        if (error) throw error;
        setAssessments(data || []);
      } catch (error) {
        console.error('Error fetching user assessments:', error);
        toast({
          title: 'Chyba pri načítaní cvikov',
          description: 'Nepodarilo sa načítať vaše hodnotenia a cviky.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserAssessments();
  }, [user, toast]);

  // Helper functions for formatting data
  const formatPainArea = (area: string): string => {
    const translations: Record<string, string> = {
      'neck': 'krčnej chrbtice',
      'middle back': 'hrudnej chrbtice',
      'lower back': 'driekovej chrbtice'
    };
    
    return translations[area] || area;
  };

  const formatMechanism = (mechanism: string): string => {
    const translations: Record<string, string> = {
      'nociceptive': 'Nociceptívna bolesť',
      'neuropathic': 'Neuropatická bolesť',
      'central': 'Centrálna senzitizácia',
      'none': 'Nedefinovaný mechanizmus bolesti'
    };
    return translations[mechanism] || mechanism;
  };

  const formatDifferential = (differential: string): string => {
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

  const handleViewExercises = (assessment: UserAssessment) => {
    navigate('/exercise-plan', { 
      state: { 
        mechanism: assessment.primary_mechanism,
        differential: assessment.primary_differential,
        painArea: assessment.pain_area
      } 
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 bg-gradient-to-b from-blue-50 to-white py-10 px-4 flex items-center justify-center">
          <div className="text-blue-600">Načítava sa...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gradient-to-b from-blue-50 to-white py-10 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold text-blue-800 mb-6">Moje cviky</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>História hodnotení bolesti</CardTitle>
              <CardDescription>
                Nižšie nájdete všetky vaše dokončené hodnotenia a ich cvičebné programy
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">Načítavanie hodnotení...</div>
              ) : assessments.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Zatiaľ nemáte žiadne uložené hodnotenia.</p>
                  <Button onClick={() => navigate('/assessment')}>
                    Vytvoriť nové hodnotenie
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Dátum</TableHead>
                        <TableHead>Oblasť</TableHead>
                        <TableHead>Mechanizmus</TableHead>
                        <TableHead>Diagnóza</TableHead>
                        <TableHead>Akcie</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {assessments.map((assessment) => (
                        <TableRow key={assessment.id}>
                          <TableCell className="font-medium">
                            {format(new Date(assessment.timestamp), 'dd.MM.yyyy')}
                          </TableCell>
                          <TableCell>{formatPainArea(assessment.pain_area)}</TableCell>
                          <TableCell>{formatMechanism(assessment.primary_mechanism)}</TableCell>
                          <TableCell>{formatDifferential(assessment.primary_differential)}</TableCell>
                          <TableCell>
                            <Button 
                              onClick={() => handleViewExercises(assessment)}
                              size="sm"
                            >
                              Zobraziť cviky
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => navigate('/')}>
                Späť na úvod
              </Button>
              <Button onClick={() => navigate('/assessment')}>
                Nové hodnotenie
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MyExercises;
