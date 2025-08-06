import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useFavoriteActivities } from "@/hooks/useFavoriteActivities";
import { cn } from "@/lib/utils";

// Sample activities data (images will be added later)
const ACTIVITIES = [
  { name: "Walking", image: null },
  { name: "Swimming", image: null },
  { name: "Cycling", image: null },
  { name: "Yoga", image: null },
];

interface ActivityCardProps {
  activity: { name: string; image: string | null };
  isSelected: boolean;
  onClick: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md",
        isSelected 
          ? "border-primary bg-primary/10 shadow-md" 
          : "border-border hover:border-primary/50"
      )}
    >
      <div className="flex flex-col items-center space-y-2">
        {/* Placeholder for image */}
        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
          <span className="text-2xl text-muted-foreground">📋</span>
        </div>
        <span className={cn(
          "text-sm font-medium text-center",
          isSelected ? "text-primary" : "text-foreground"
        )}>
          {activity.name}
        </span>
      </div>
    </div>
  );
};

export const FavoriteActivitiesSection: React.FC = () => {
  const { t } = useTranslation();
  const { isActivityFavorite, addFavoriteActivity, removeFavoriteActivity } = useFavoriteActivities();
  const [accordionValue, setAccordionValue] = useState<string>("");

  const handleActivityClick = async (activityName: string) => {
    if (isActivityFavorite(activityName)) {
      await removeFavoriteActivity(activityName);
    } else {
      // For now, we'll use null for pain_area, it will be updated based on user selection in future
      await addFavoriteActivity(activityName, null);
    }
  };

  const handleNextClick = () => {
    // Placeholder for future functionality
    console.log("Next button clicked");
  };

  return (
    <Card className="mb-6 px-0">
      <CardHeader>
        <CardTitle>{t("myExercises.favoriteActivities.title")}</CardTitle>
        <CardDescription>
          {t("myExercises.favoriteActivities.description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion 
          type="single" 
          collapsible 
          className="w-full"
          value={accordionValue}
          onValueChange={setAccordionValue}
        >
          <AccordionItem value="activities" className="border-b-0">
            <AccordionTrigger className="hover:no-underline py-3">
              <div className="flex items-center justify-center w-full">
                <span className="text-sm font-medium">
                  {accordionValue === "activities" 
                    ? t("myExercises.favoriteActivities.collapse")
                    : t("myExercises.favoriteActivities.expand")
                  }
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              {/* Activities Grid - 2x2 layout */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {ACTIVITIES.map((activity) => (
                  <ActivityCard
                    key={activity.name}
                    activity={activity}
                    isSelected={isActivityFavorite(activity.name)}
                    onClick={() => handleActivityClick(activity.name)}
                  />
                ))}
              </div>
              
              {/* Next Button */}
              <div className="flex justify-end">
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