import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { useFavoriteActivities } from "@/hooks/useFavoriteActivities";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

// Activities data with images and translation keys (reused from My Exercises)
const ACTIVITIES = [
  { key: "careOfFamily", image: "/lovable-uploads/psfsImages/psfsCareFamilyImage.png" },
  { key: "carryItems", image: "/lovable-uploads/psfsImages/psfsHeavyLoadsImage.png" },
  { key: "householdWorks", image: "/lovable-uploads/psfsImages/psfsHouseHoldImage.png" },
  { key: "hiking", image: "/lovable-uploads/psfsImages/psfsManHikingImage.png" },
  { key: "jogging", image: "/lovable-uploads/psfsImages/psfsManJoggingImage.png" },
  { key: "walking", image: "/lovable-uploads/psfsImages/psfsPairStrollImage.png" },
  { key: "walkingStairs", image: "/lovable-uploads/psfsImages/psfsWalkingStairsImage.png" },
  { key: "cycling", image: "/lovable-uploads/psfsImages/psfsWomanCyclingImage.png" },
  { key: "weightlifting", image: "/lovable-uploads/psfsImages/psfsWomanDeadLiftImage.png" },
  { key: "swimming", image: "/lovable-uploads/psfsImages/psfsWomanSwimImage.png" },
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
        "rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md overflow-hidden relative",
        isSelected
          ? "bg-primary/20 shadow-lg border-2 border-primary ring-2 ring-primary/20"
          : "hover:shadow-sm border-2 border-transparent"
      )}
    >
      {isSelected && (
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center z-10">
          <span className="text-xs font-bold">✓</span>
        </div>
      )}

      <div className={cn(isMobile ? "flex-col" : "flex")}> 
        <div className={cn("bg-muted flex-shrink-0 aspect-square relative", isMobile ? "w-full" : "w-1/2")}> 
          {activity.image ? (
            <img
              src={activity.image}
              alt={t(`myExercises.favoriteActivities.activities.${activity.key}`)}
              className={cn("w-full h-full object-cover", isSelected && "brightness-110")}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-xl text-muted-foreground">📋</span>
            </div>
          )}
        </div>
        <div className={cn("flex items-center justify-center", isMobile ? "p-2" : "flex-1 p-3")}> 
          <span className={cn("text-sm text-center transition-all duration-200", isSelected ? "text-primary font-bold text-base" : "text-foreground font-medium")}>
            {t(`myExercises.favoriteActivities.activities.${activity.key}`)}
          </span>
        </div>
      </div>
    </div>
  );
};

export const ProfileFavoriteActivitiesAccordion: React.FC = () => {
  const { t } = useTranslation();
  const { addFavoriteActivity, removeFavoriteActivity, favoriteActivities, updateFavoriteActivity } = useFavoriteActivities();

  const [accordionValue, setAccordionValue] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [bodyAreaSelections, setBodyAreaSelections] = useState<Record<string, string>>({});

  const isCardSelected = (activityKey: string) => {
    const translatedName = t(`myExercises.favoriteActivities.activities.${activityKey}`);
    return favoriteActivities.some((item) => item.activity === activityKey || item.activity === translatedName);
  };

  const handleActivityClick = async (activityKey: string) => {
    const translatedName = t(`myExercises.favoriteActivities.activities.${activityKey}`);
    const existingActivity = favoriteActivities.find(
      (item) => item.activity === activityKey || item.activity === translatedName
    );

    if (existingActivity) {
      await removeFavoriteActivity(existingActivity.activity);
    } else if (favoriteActivities.length < 3) {
      await addFavoriteActivity(activityKey, null);
    }
  };

  const handleNextClick = () => {
    if (currentStep === 1 && favoriteActivities.length >= 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(2);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handlePreviousClick = () => {
    if (currentStep === 2) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleBodyAreaSelection = async (activityKey: string, bodyArea: string, activityId?: string) => {
    setBodyAreaSelections((prev) => ({ ...prev, [activityKey]: bodyArea }));
    try {
      await updateFavoriteActivity(activityKey, bodyArea, activityId);
    } catch (error) {
      console.error('Failed to save body area:', error);
    }
  };

  // 4 main body parts used in PSFS flow for consistency
  const bodyParts = ["neck", "middle back", "lower back", "upper limb"];

  return (
    <Card className="mb-6 px-0">
      <CardContent className="p-0">
        <Accordion type="single" collapsible className="w-full" value={accordionValue} onValueChange={setAccordionValue}>
          <AccordionItem value="profile-activities" className="border-b-0">
            <div className="flex items-center justify-between mb-4 px-4 md:px-6 min-h-[4rem] my-[26px] py-[30px]">
              <CardTitle>{t("myExercises.favoriteActivities.title")}</CardTitle>
              <AccordionTrigger className="hover:no-underline p-0 border-0" />
            </div>

            <AccordionContent className="pt-0 px-4 pb-4 md:px-6">
              <div className="relative overflow-hidden pb-6">
                {/* Step 1: Activity Selection */}
                <div
                  className={cn(
                    currentStep !== 1 && "absolute top-0 left-0 w-full",
                    "transition-transform duration-300 ease-in-out",
                    currentStep === 1 ? "translate-x-0" : "-translate-x-full",
                    isAnimating && "transition-transform"
                  )}
                >
                  <CardDescription className="mb-6">
                    {t("myExercises.favoriteActivities.description")}
                  </CardDescription>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {ACTIVITIES.map((activity) => (
                      <ActivityCard
                        key={activity.key}
                        activity={activity}
                        isSelected={isCardSelected(activity.key)}
                        onClick={() => handleActivityClick(activity.key)}
                      />
                    ))}
                  </div>

                  <div className="flex justify-center">
                    <Button onClick={handleNextClick} className="px-8" disabled={favoriteActivities.length === 0}>
                      {t("myExercises.favoriteActivities.next")}
                    </Button>
                  </div>
                </div>

                {/* Step 2: Body Area Selection */}
                <div
                  className={cn(
                    currentStep !== 2 ? "absolute top-0 left-0 w-full" : "",
                    "transition-transform duration-300 ease-in-out",
                    currentStep === 2 ? "translate-x-0" : "translate-x-full",
                    isAnimating && "transition-transform"
                  )}
                >
                  <CardDescription className="mb-6">
                    {t("myExercises.favoriteActivities.selectBodyAreas")}
                  </CardDescription>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {favoriteActivities.map((favoriteActivity) => {
                      // Try to find activity by key first
                      let activity = ACTIVITIES.find((a) => a.key === favoriteActivity.activity);

                      // If not found, try to find by translated name (for backward compatibility)
                      if (!activity) {
                        activity = ACTIVITIES.find(
                          (a) => t(`myExercises.favoriteActivities.activities.${a.key}`) === favoriteActivity.activity
                        );
                      }

                      const finalActivity = activity || ACTIVITIES[0];

                      return (
                        <div key={favoriteActivity.id} className="space-y-3">
                          <div className="rounded-lg overflow-hidden">
                            <ActivityCard activity={finalActivity} isSelected={false} onClick={() => {}} />
                          </div>

                          <Select
                            value={bodyAreaSelections[favoriteActivity.activity] || favoriteActivity.pain_area || ""}
                            onValueChange={(value) => handleBodyAreaSelection(favoriteActivity.activity, value, favoriteActivity.id)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder={t("myExercises.favoriteActivities.selectBodyArea")} />
                            </SelectTrigger>
                            <SelectContent>
                              {bodyParts.map((bodyPart) => (
                                <SelectItem key={bodyPart} value={bodyPart}>
                                  {t(`bodyParts.${bodyPart}`)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-center gap-4">
                    <Button variant="outline" onClick={handlePreviousClick} className="px-8">
                      {t("myExercises.favoriteActivities.previous")}
                    </Button>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};
