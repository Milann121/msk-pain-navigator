import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface StrengthCard {
  id: string;
  image: string;
  title: string;
  description: string;
  description2: string;
  time: string;
  strength_group: string[];
}

const Strength = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  
  const filterButtons = [
    { key: "all", label: t('strength.filters.all') },
    { key: "home", label: t('strength.filters.home') },
    { key: "gym", label: t('strength.filters.gym') },
    { key: "outside", label: t('strength.filters.outside') }
  ];

  // Sample data - replace with real data from backend
  const strengthCards: StrengthCard[] = [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&h=500&fit=crop",
      title: t('strength.cards.push_ups.title'),
      description: t('strength.cards.push_ups.description'),
      description2: t('strength.cards.push_ups.description2'),
      time: t('strength.cards.push_ups.time'),
      strength_group: ["home"]
    },
    {
      id: "2", 
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop",
      title: t('strength.cards.squats.title'),
      description: t('strength.cards.squats.description'),
      description2: t('strength.cards.squats.description2'),
      time: t('strength.cards.squats.time'),
      strength_group: ["home", "gym"]
    },
    {
      id: "3",
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&h=500&fit=crop",
      title: t('strength.cards.deadlifts.title'),
      description: t('strength.cards.deadlifts.description'),
      description2: t('strength.cards.deadlifts.description2'),
      time: t('strength.cards.deadlifts.time'),
      strength_group: ["gym"]
    },
    {
      id: "4",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop",
      title: t('strength.cards.outdoor_calisthenics.title'),
      description: t('strength.cards.outdoor_calisthenics.description'),
      description2: t('strength.cards.outdoor_calisthenics.description2'),
      time: t('strength.cards.outdoor_calisthenics.time'),
      strength_group: ["outside"]
    }
  ];

  const filteredCards = activeFilter === "all" ? strengthCards : strengthCards.filter(card => 
    card.strength_group.includes(activeFilter)
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gradient-to-b from-background to-muted/20 py-10 px-4">
        <div className="container mx-auto w-full max-w-full md:max-w-4xl px-2 md:px-0">
          <h1 className="text-3xl font-bold text-primary mb-8">
            {t('strength.title')}
          </h1>
          
          <div className="flex gap-6">
            {/* Recommendation Container - Left Side (Desktop only) */}
            <div className="hidden lg:block w-1/3">
              <div className="bg-card border rounded-lg p-4 h-[768px] flex flex-col">
                {/* Recommendation Image - 2/3 from bottom */}
                <div className="flex-1 flex items-end pb-4">
                  <div className="w-full h-2/3 bg-muted rounded-lg overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop" 
                      alt={t('strength.recommendation.image_alt')}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Recommendation Title and Content */}
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold text-foreground leading-tight">
                    {t('strength.recommendation.title')}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="text-xs rounded-full">
                      {t('strength.recommendation.sample_program')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 lg:w-2/3">
              {/* Filter Buttons */}
              <div className="flex gap-2 mb-8 overflow-x-auto scrollbar-hide pb-2 md:flex-wrap md:overflow-visible">
                {filterButtons.map((filter) => (
                  <Button
                    key={filter.key}
                    variant={activeFilter === filter.key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveFilter(filter.key)}
                    className="rounded-full flex-shrink-0"
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>

              {/* Cards Grid - Single Column, Rotated 90 degrees left */}
              <div className="grid grid-cols-1 gap-4 my-[4px] py-[15px]">
            {filteredCards.map((card) => (
              <Card key={card.id} className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden group border-none shadow-sm">
                <CardContent className="p-0 relative flex h-32">
                  {/* Image - Left side, rotated design */}
                  <div className="w-32 h-32 overflow-hidden rounded-l-lg flex-shrink-0">
                    <img 
                      src={card.image} 
                      alt={card.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                  
                  {/* Content - Right side */}
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-base mb-2 line-clamp-1">
                        {card.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {card.description}
                      </p>
                    </div>
                    
                    {/* Bottom section with description2 and time */}
                    <div className="flex justify-between items-end">
                      <span className="text-xs text-muted-foreground">
                        {card.description2}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {card.time}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              ))}
              </div>

              {filteredCards.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">{t('strength.no_results')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Strength;