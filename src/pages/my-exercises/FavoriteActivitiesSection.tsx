import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { useFavoriteActivities } from "@/hooks/useFavoriteActivities";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Activities data with images and translation keys
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
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center z-10">
          <span className="text-xs font-bold">✓</span>
        </div>
      )}
      
      <div className={cn(
        isMobile ? "flex-col" : "flex"
      )}>
        {/* Image */}
        <div className={cn(
          "bg-muted flex-shrink-0 aspect-square relative",
          isMobile ? "w-full" : "w-1/2"
        )}>
          {activity.image ? (
            <img
              src={activity.image}
              alt={t(`myExercises.favoriteActivities.activities.${activity.key}`)}
              className={cn(
                "w-full h-full object-cover",
                isSelected && "brightness-110"
              )}
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
            "text-sm text-center transition-all duration-200",
            isSelected 
              ? "text-primary font-bold text-base" 
              : "text-foreground font-medium"
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
  const { toast } = useToast();
  const { isActivityFavorite, addFavoriteActivity, removeFavoriteActivity, favoriteActivities, updateFavoriteActivity } = useFavoriteActivities();
  const [accordionValue, setAccordionValue] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [bodyAreaSelections, setBodyAreaSelections] = useState<Record<string, string>>({});

  const handleActivityClick = async (activityKey: string) => {
    if (isActivityFavorite(activityKey)) {
      // Always allow unselecting
      await removeFavoriteActivity(activityKey);
    } else {
      // Check if we already have 3 activities selected
      if (favoriteActivities.length >= 3) {
        // Show toast message to inform user they need to unselect first
        toast({
          title: "Maximum activities selected",
          description: "Please unselect an activity first before selecting a new one. You can select up to 3 activities.",
          variant: "destructive",
        });
        return;
      }
      // Add the new activity
      await addFavoriteActivity(activityKey, null);
    }
  };

  const handleNextClick = async () => {
    if (currentStep === 1) {
      if (favoriteActivities.length === 3) {
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentStep(2);
          setIsAnimating(false);
        }, 300);
      }
    } else {
      // Step 2 logic will be implemented later
      console.log("Step 2 next clicked", bodyAreaSelections);
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

  const handleBodyAreaSelection = async (activityKey: string, bodyArea: string) => {
    setBodyAreaSelections(prev => ({ ...prev, [activityKey]: bodyArea }));
    
    // Update the favorite activity with the selected body area
    await updateFavoriteActivity(activityKey, bodyArea);
  };

  // Get body parts options from assessment (only 4 main areas)
  const bodyParts = [
    'neck', 
    'middle back', 
    'lower back', 
    'upper limb'
  ];

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
              <div className="relative overflow-hidden pb-64 lg:pb-32">
                {/* Step 1: Activity Selection */}
                <div className={cn(
                  "transition-transform duration-300 ease-in-out",
                  currentStep === 1 ? "translate-x-0" : "-translate-x-full",
                  isAnimating && "transition-transform"
                )}>
                  {/* Description and Selection Counter */}
                  <CardDescription className="mb-4">
                    {t("myExercises.favoriteActivities.description")}
                  </CardDescription>
                  
                  {/* Selection Counter */}
                  <div className="mb-6 text-center">
                    <span className={cn(
                      "text-sm font-medium px-3 py-1 rounded-full",
                      favoriteActivities.length === 3 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted text-muted-foreground"
                    )}>
                      {favoriteActivities.length}/3 selected
                    </span>
                  </div>
                  
                  {/* Activities Grid - 2 columns layout */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {ACTIVITIES.map((activity) => {
                      return (
                        <ActivityCard
                          key={activity.key}
                          activity={activity}
                          isSelected={isActivityFavorite(activity.key)}
                          onClick={() => handleActivityClick(activity.key)}
                        />
                      );
                    })}
                  </div>
                  
                  {/* Next Button */}
                  <div className="flex justify-center">
                    <Button 
                      onClick={handleNextClick} 
                      className="px-8"
                      disabled={favoriteActivities.length !== 3}
                    >
                      {t("myExercises.favoriteActivities.next")}
                    </Button>
                  </div>
                </div>

                {/* Step 2: Body Area Selection */}
                <div className={cn(
                  "absolute top-0 left-0 w-full transition-transform duration-300 ease-in-out",
                  currentStep === 2 ? "translate-x-0" : "translate-x-full",
                  isAnimating && "transition-transform"
                )}>
                  <CardDescription className="mb-6">
                    {t("myExercises.favoriteActivities.selectBodyAreas")}
                  </CardDescription>
                  
                   {/* Selected Activities Grid - Single column on mobile, 2 columns on larger screens */}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                     {favoriteActivities.map((favoriteActivity) => {
                       // Find activity by key (prioritize key-based lookup for consistency)
                       const activity = ACTIVITIES.find(a => a.key === favoriteActivity.activity) || 
                                       ACTIVITIES.find(a => 
                                         t(`myExercises.favoriteActivities.activities.${a.key}`) === favoriteActivity.activity
                                       ) || 
                                       ACTIVITIES[0]; // Fallback to first activity
                      
                      return (
                        <div key={favoriteActivity.id} className="space-y-3">
                          {/* Full-size Activity Card */}
                          <div className="rounded-lg overflow-hidden bg-primary/10 shadow-md">
                             <ActivityCard
                               activity={activity}
                               isSelected={true}
                               onClick={() => {}} // No click action needed in step 2
                             />
                          </div>
                          
                          {/* Body Area Dropdown */}
                          <Select
                            value={bodyAreaSelections[favoriteActivity.activity] || favoriteActivity.pain_area || ""}
                            onValueChange={(value) => handleBodyAreaSelection(favoriteActivity.activity, value)}
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
                  
                  {/* Navigation Buttons */}
                  <div className="flex justify-center gap-4 mb-8">
                    <Button variant="outline" onClick={handlePreviousClick} className="px-8">
                      {t("myExercises.favoriteActivities.previous")}
                    </Button>
                    <Button onClick={handleNextClick} className="px-8">
                      {t("myExercises.favoriteActivities.next")}
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