import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, CheckCircle, Clock, ChevronRight, ChevronDown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { format, differenceInMonths } from 'date-fns';

export const OrebroEntry = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [hasCompletedRecently, setHasCompletedRecently] = useState(false);
  const [lastCompletionDate, setLastCompletionDate] = useState<Date | null>(null);
  const [showReminder, setShowReminder] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (user) {
      checkOrebroCompletion();
    }
  }, [user]);

  const checkOrebroCompletion = async () => {
    if (!user) return;

    try {
      // Check for OREBRO completion in the last 3 months
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

      const { data, error } = await supabase
        .from('orebro_responses')
        .select('created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking OREBRO completion:', error);
        return;
      }

      if (data && data.length > 0) {
        const lastCompletion = new Date(data[0].created_at);
        setLastCompletionDate(lastCompletion);
        
        const monthsSinceCompletion = differenceInMonths(new Date(), lastCompletion);
        
        if (monthsSinceCompletion < 3) {
          setHasCompletedRecently(true);
        } else {
          setShowReminder(true);
        }
      } else {
        setShowReminder(true);
      }
    } catch (error) {
      console.error('Error checking OREBRO completion:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTakeQuestionnaire = () => {
    navigate('/orebro-questionnaire');
  };

  const handleViewResults = async () => {
    if (!user) return;
    
    try {
      // Get the latest OREBRO response
      const { data, error } = await supabase
        .from('orebro_responses')
        .select('risk_level, responses')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching OREBRO result:', error);
        return;
      }

      if (data) {
        // Extract pain locations from responses
        const responses = data.responses as any;
        const painLocations = responses?.painLocation || [];
        
        navigate('/orebro-result', { 
          state: { 
            riskLevel: data.risk_level, 
            painLocations 
          } 
        });
      }
    } catch (error) {
      console.error('Error navigating to OREBRO result:', error);
    }
  };

  if (loading) {
    return null;
  }

  // If completed recently and not expanded, show collapsed view
  if (hasCompletedRecently && !isExpanded) {
    return (
      <Card className="mb-6 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="pt-4 pb-4">
          <div 
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => setIsExpanded(true)}
          >
            <div className="flex-shrink-0">
              <Brain className="h-6 w-6 text-blue-600" />
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                {t('home.orebro.title')}
                <CheckCircle className="h-4 w-4 text-green-600" />
              </h3>
            </div>
            
            <ChevronRight className="h-5 w-5 text-gray-500" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 h-full">
      <CardContent className="pt-6 h-full flex flex-col">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <Brain className="h-8 w-8 text-blue-600" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-gray-900">
                {t('home.orebro.title')}
              </h3>
              {hasCompletedRecently && (
                <>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="ml-auto text-gray-500 hover:text-gray-700"
                  >
                    <ChevronDown className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              {hasCompletedRecently 
                ? t('home.orebro.completedMessage', { 
                    date: lastCompletionDate ? format(lastCompletionDate, 'dd.MM.yyyy') : '' 
                  })
                : showReminder 
                  ? t('home.orebro.reminderMessage')
                  : t('home.orebro.description')
              }
            </p>

            <div className="flex items-center gap-3 mb-4">
              {!hasCompletedRecently && (
                <Button 
                  onClick={handleTakeQuestionnaire}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  size="sm"
                >
                  <Brain className="h-4 w-4 mr-2" />
                  {t('home.orebro.takeTest')}
                </Button>
              )}
              
              {hasCompletedRecently && (
                <Button 
                  onClick={handleViewResults}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  size="sm"
                >
                  Otvoriť výsledok
                </Button>
              )}
              
              {showReminder && (
                <div className="flex items-center gap-1 text-xs text-amber-600">
                  <Clock className="h-4 w-4" />
                  <span>{t('home.orebro.reminderText')}</span>
                </div>
              )}
            </div>

            <div className="mt-3 text-xs text-gray-500 flex items-center gap-1">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
              <span>{t('home.orebro.anonymous')}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};