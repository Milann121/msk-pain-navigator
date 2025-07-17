import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import PSFSQuestion from '@/components/questionnaire/PSFSQuestion';
import { psfsQuestion } from '@/data/questionnaires/general/psfs';
import { ArrowLeft, Send } from 'lucide-react';

const PsfsQuestionnaire = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [values, setValues] = useState<Record<string, number>>({});

  const handleValueChange = (questionId: string, value: number) => {
    setValues(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = () => {
    // Here you would typically save the PSFS responses to the database
    console.log('PSFS responses:', values);
    
    // For now, just navigate back to home
    navigate('/domov');
  };

  const isComplete = psfsQuestion.psfs?.questions.every(q => values[q.id] !== undefined) || false;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/domov')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('common.back')}
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
                {t('common.submit')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PsfsQuestionnaire;