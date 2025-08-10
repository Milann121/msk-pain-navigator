import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play } from 'lucide-react';
import { useHomeFavoriteActivities } from '@/hooks/useHomeFavoriteActivities';

export const HomeFavoriteActivitiesOverview = () => {
  const { t } = useTranslation();
  const { 
    favoriteActivities, 
    isEligible, 
    loading, 
    openProgram 
  } = useHomeFavoriteActivities();

  // Visibility signal for Favorite Activities container
  useEffect(() => {
    const visible = !loading && isEligible;
    window.__favContainerVisible = visible;
    window.dispatchEvent(new CustomEvent('favActivitiesContainerVisibility', { detail: { visible } }));
  }, [loading, isEligible]);

  useEffect(() => {
    return () => {
      
      window.__favContainerVisible = false;
      window.dispatchEvent(new CustomEvent('favActivitiesContainerVisibility', { detail: { visible: false } }));
    };
  }, []);

  // Don't render if not eligible or still loading
  if (loading || !isEligible) {
    return null;
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Left side - Activities */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <CardTitle className="text-lg">
                {t('home.favoriteActivitiesOverview.title')}
              </CardTitle>
              <Badge variant="secondary" className="text-xs">
                {t('home.favoriteActivitiesOverview.completed')}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {favoriteActivities.map((activity, index) => (
                <div 
                  key={activity.id} 
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border"
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={activity.image} 
                      alt={t(`myExercises.favoriteActivities.activities.${activity.activity}`)}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {t(`myExercises.favoriteActivities.activities.${activity.activity}`)}
                    </p>
                    {activity.pain_area && (
                      <p className="text-xs text-muted-foreground">
                        {t(`bodyParts.${activity.pain_area}`)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Open Program Button */}
          <div className="flex-shrink-0">
            <Button 
              onClick={openProgram}
              size="lg"
              className="flex items-center gap-2 px-6"
            >
              <Play className="w-4 h-4" />
              {t('home.favoriteActivitiesOverview.openProgram')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};