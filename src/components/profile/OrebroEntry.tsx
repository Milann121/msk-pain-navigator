import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, CheckCircle, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { format, differenceInMonths } from 'date-fns';

export const OrebroEntry = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [hasCompletedRecently, setHasCompletedRecently] = useState(false);
  const [lastCompletionDate, setLastCompletionDate] = useState<Date | null>(null);
  const [showReminder, setShowReminder] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const navigate = useNavigate();

  const handleTakeQuestionnaire = () => {
    navigate('/orebro');
  };

  if (loading) {
    return null;
  }

  return (
    <Card className="mb-6 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardContent className="pt-6">
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
                <CheckCircle className="h-5 w-5 text-green-600" />
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

            <div className="flex items-center gap-3">
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