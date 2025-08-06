import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useFavoriteActivities } from "@/hooks/useFavoriteActivities";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

// Activities data with images and translation keys
const ACTIVITIES = [
  { key: "careOfFamily", image: "public/lovable-uploads/psfsImages/psfsCareFamilyImage.png" },
  { key: "carryItems", image: "public/lovable-uploads/psfsImages/psfsHeavyLoadsImage.png" },
  { key: "householdWorks", image: "public/lovable-uploads/psfsImages/psfsHouseHoldImage.png" },
  { key: "hiking", image: "public/lovable-uploads/psfsImages/psfsManHikingImage.png" },
  { key: "jogging", image: "public/lovable-uploads/psfsImages/psfsManJoggingImage.png" },
  { key: "walking", image: "public/lovable-uploads/psfsImages/psfsPairStrollImage.png" },
  { key: "walkingStairs", image: "public/lovable-uploads/psfsImages/psfsWalkingStairsImage.png" },
  { key: "cycling", image: "public/lovable-uploads/psfsImages/psfsWomanCyclingImage.png" },
  { key: "weightlifting", image: "public/lovable-uploads/psfsImages/psfsWomanDeadLiftImage.png" },
  { key: "swimming", image: "public/lovable-uploads/psfsImages/psfsWomanSwimImage.png" },
];

interface ActivityCardProps {
  activity: { key: string; image: string | null };
  isSelected: boolean;
  onClick: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, isSelected, onClick }) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md overflow-hidden",
        isSelected 
          ? "bg-primary/10 shadow-md" 
          : "hover:shadow-sm"
      )}
    >
      <div className={cn(
        isMobile ? "flex-col" : "flex"
      )}>
        {/* Image */}
        <div className={cn(
          "bg-muted flex-shrink-0 aspect-square",
          isMobile ? "w-full" : "w-1/2"
        )}>
          {activity.image ? (
            <img
              src={activity.image}
              alt={t(`myExercises.favoriteActivities.activities.${activity.key}`)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-xl text-muted-foreground">📋</span>
            </div>
          )}
        </div>
        {/* Text */}
        <div className={cn(
          "flex items-center justify-center",
          isMobile ? "p-2" : "flex-1 p-3"
        )}>
          <span className={cn(
            "text-sm font-medium text-center",
            isSelected ? "text-primary" : "text-foreground"
          )}>
            {t(`myExercises.favoriteActivities.activities.${activity.key}`)}
          </span>
        </div>
      </div>
    </div>
  );
};

export const FavoriteActivitiesSection: React.FC = () => {
  const { t } = useTranslation();
  const { isActivityFavorite, addFavoriteActivity, removeFavoriteActivity, favoriteActivities } = useFavoriteActivities();
  const [accordionValue, setAccordionValue] = useState<string>("");

  const handleActivityClick = async (activityKey: string) => {
    const activityName = t(`myExercises.favoriteActivities.activities.${activityKey}`);
    if (isActivityFavorite(activityName)) {
      await removeFavoriteActivity(activityName);
    } else {
      // Only allow adding if less than 3 activities are selected
      if (favoriteActivities.length < 3) {
        await addFavoriteActivity(activityName, null);
      }
    }
  };

  const handleNextClick = () => {
    // Placeholder for future functionality
    console.log("Next button clicked");
  };

  return (
    <Card className="mb-6 px-0">
      <CardContent className="p-6">
        <Accordion 
          type="single" 
          collapsible 
          className="w-full"
          value={accordionValue}
          onValueChange={setAccordionValue}
        >
          <AccordionItem value="activities" className="border-b-0">
            <div className="flex items-center justify-between mb-4">
              <CardTitle>{t("myExercises.favoriteActivities.title")}</CardTitle>
              <AccordionTrigger className="hover:no-underline p-0 border-0">
              </AccordionTrigger>
            </div>
            
            <AccordionContent className="pt-0">
              {/* Description - only shown when expanded */}
              <CardDescription className="mb-6">
                {t("myExercises.favoriteActivities.description")}
              </CardDescription>
              
              {/* Activities Grid - 2 columns layout */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {ACTIVITIES.map((activity) => {
                  const activityName = t(`myExercises.favoriteActivities.activities.${activity.key}`);
                  return (
                    <ActivityCard
                      key={activity.key}
                      activity={activity}
                      isSelected={isActivityFavorite(activityName)}
                      onClick={() => handleActivityClick(activity.key)}
                    />
                  );
                })}
              </div>
              
              {/* Next Button */}
              <div className="flex justify-center">
                <Button onClick={handleNextClick} className="px-8">
                  {t("myExercises.favoriteActivities.next")}
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};