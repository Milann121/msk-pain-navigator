import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PSFSQuestion from '@/components/questionnaire/PSFSQuestion';
import { psfsQuestion } from '@/data/questionnaires/general/psfs';
import { ArrowLeft, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { loadDraft, saveDraft, clearDraft } from '@/lib/drafts';

const PsfsQuestionnaire = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [values, setValues] = useState<Record<string, number>>({});

  const DRAFT_KEY = 'pebee:draft:psfs';

  // Load draft on mount
  useEffect(() => {
    const draft = loadDraft<Record<string, number>>(DRAFT_KEY);
    if (draft && typeof draft === 'object') {
      setValues(draft);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Autosave on changes
  useEffect(() => {
    saveDraft(DRAFT_KEY, values);
  }, [values]);

  const handleValueChange = (questionId: string, value: number) => {
    setValues(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error(t('error'));
        return;
      }

      // Save PSFS responses to database
      const { error } = await supabase
        .from('psfs_assessment')
        .insert({
          user_id: user.id,
          responses: values
        });

      if (error) {
        console.error('Error saving PSFS responses:', error);
        toast.error(t('error'));
        return;
      }

      toast.success(t('success'));
      clearDraft(DRAFT_KEY);
      navigate('/domov');
    } catch (error) {
      console.error('Error submitting PSFS:', error);
      toast.error(t('error'));
    }
  };

  const isComplete = psfsQuestion.psfs?.questions.every(q => values[q.id] !== undefined) || false;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/domov')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('back')}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {t('home.psfs.title')}
            </CardTitle>
            <p className="text-center text-muted-foreground">
              {t('home.psfs.description')}
            </p>
          </CardHeader>
          
          <CardContent>
            <PSFSQuestion
              question={psfsQuestion}
              values={values}
              onChange={handleValueChange}
            />
            
            <div className="mt-8 flex justify-center">
              <Button 
                onClick={handleSubmit}
                disabled={!isComplete}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Send className="h-4 w-4 mr-2" />
                {t('submit')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default PsfsQuestionnaire;