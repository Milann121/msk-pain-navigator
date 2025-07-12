import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
interface StretchingCard {
  id: string;
  image: string;
  title: string;
  description: string;
  description2: string;
  time: string;
  stretch_group: string[];
}
const Stretching = () => {
  const {
    t
  } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const filterButtons = [{
    key: "all",
    label: t('stretching.filters.all')
  }, {
    key: "at_desk",
    label: t('stretching.filters.at_desk')
  }, {
    key: "morning",
    label: t('stretching.filters.morning')
  }, {
    key: "warm_up",
    label: t('stretching.filters.warm_up')
  }, {
    key: "after_training",
    label: t('stretching.filters.after_training')
  }, {
    key: "better_regeneration",
    label: t('stretching.filters.better_regeneration')
  }, {
    key: "mid_day",
    label: t('stretching.filters.mid_day')
  }, {
    key: "before_sleep",
    label: t('stretching.filters.before_sleep')
  }, {
    key: "at_work",
    label: t('stretching.filters.at_work')
  }];

  // Sample data - replace with real data from backend
  const stretchingCards: StretchingCard[] = [{
    id: "1",
    image: "/lovable-uploads/stretchingCard_images/11.png",
    title: t('stretching.cards.neck_stretch.title'),
    description: t('stretching.cards.neck_stretch.description'),
    description2: t('stretching.cards.neck_stretch.description2'),
    time: "5 min",
    stretch_group: ["at_desk", "at_work", "mid_day"]
  }, {
    id: "2",
    image: "/lovable-uploads/stretchingCard_images/1.png",
    title: t('stretching.cards.morning_flow.title'),
    description: t('stretching.cards.morning_flow.description'),
    description2: t('stretching.cards.morning_flow.description2'),
    time: "8 min",
    stretch_group: ["morning", "warm_up"]
  }, {
    id: "3",
    image: "/lovable-uploads/stretchingCard_images/7.png",
    title: t('stretching.cards.evening_relaxation.title'),
    description: t('stretching.cards.evening_relaxation.description'),
    description2: t('stretching.cards.evening_relaxation.description2'),
    time: "12 min",
    stretch_group: ["before_sleep", "better_regeneration"]
  }, {
    id: "4",
    image: "/lovable-uploads/stretchingCard_images/8.png",
    title: t('stretching.cards.post_workout.title'),
    description: t('stretching.cards.post_workout.description'),
    description2: t('stretching.cards.post_workout.description2'),
    time: "15 min",
    stretch_group: ["after_training", "better_regeneration"]
  }];
  const filteredCards = activeFilter === "all" ? stretchingCards : stretchingCards.filter(card => card.stretch_group.includes(activeFilter));
  return <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gradient-to-b from-background to-muted/20 py-10 px-4">
        <div className="container mx-auto w-full max-w-full md:max-w-4xl px-2 md:px-0">
          <h1 className="text-3xl font-bold text-primary mb-8">
            {t('stretching.title')}
          </h1>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-8">
            {filterButtons.map(filter => <Button key={filter.key} variant={activeFilter === filter.key ? "default" : "outline"} size="sm" onClick={() => setActiveFilter(filter.key)} className="rounded-full">
                {filter.label}
              </Button>)}
          </div>

          {/* Suggested Programs Container */}
          <div className="mb-8 bg-card rounded-lg overflow-hidden shadow-sm border-none">
            <div className="flex flex-col md:flex-row h-48 md:h-32">
              {/* Left side - Image */}
              <div className="w-full md:w-1/2 h-24 md:h-full">
                <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=300&fit=crop" alt="Suggested stretching programs" className="w-full h-full object-cover" />
              </div>
              
              {/* Right side - Content */}
              <div className="w-full md:w-1/2 p-4 flex flex-col justify-center">
                <h3 className="text-foreground mb-3 leading-tight text-xl font-semibold">
                  {t('stretching.suggestions.title')}
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="rounded-full text-xs h-7">
                    {t('stretching.suggestions.programs.quick_relief')}
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full text-xs h-7">
                    {t('stretching.suggestions.programs.morning_boost')}
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full text-xs h-7">
                    {t('stretching.suggestions.programs.desk_break')}
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full text-xs h-7">
                    {t('stretching.suggestions.programs.evening_unwind')}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 gap-4">
            {filteredCards.map(card => <Card key={card.id} className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden group border-none shadow-sm">
                <CardContent className="p-0 relative">
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img src={card.image} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                      {card.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                      {card.description}
                    </p>
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
              </Card>)}
          </div>

          {filteredCards.length === 0 && <div className="text-center py-12">
              <p className="text-muted-foreground">{t('stretching.no_results')}</p>
            </div>}
        </div>
      </div>
    </div>;
};
export default Stretching;