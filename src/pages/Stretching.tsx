import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, ArrowLeft } from "lucide-react";
import { ProgramProgressBadge } from "@/components/ui/ProgramProgressBadge";
// Using direct path to avoid caching issues
const stretchingRecommendationImage = "/lovable-uploads/stretchingCard_images/3.png";
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
    id: "at-office",
    image: "/lovable-uploads/stretchingCard_images/11.png",
    title: t('stretching.cards.at_office.title'),
    description: t('stretching.cards.at_office.description'),
    description2: t('stretching.cards.at_office.description2'),
    time: "8 min",
    stretch_group: ["at_desk", "at_work", "mid_day"]
  }, {
    id: "morning-routine",
    image: "public/lovable-uploads/stretchingCard_images/1.png",
    title: t('stretching.cards.morning_routine.title'),
    description: t('stretching.cards.morning_routine.description'),
    description2: t('stretching.cards.morning_routine.description2'),
    time: "12 min",
    stretch_group: ["morning", "warm_up"]
  }, {
    id: "tight-muscles",
    image: "/lovable-uploads/stretchingCard_images/7.png",
    title: t('stretching.cards.tight_muscles.title'),
    description: t('stretching.cards.tight_muscles.description'),
    description2: t('stretching.cards.tight_muscles.description2'),
    time: "12 min",
    stretch_group: ["better_regeneration", "mid_day"]
  }];
  const filteredCards = activeFilter === "all" ? stretchingCards : stretchingCards.filter(card => card.stretch_group.includes(activeFilter));
  
  // Helper function to get filter labels for description2
  const getFilterLabels = (groups: string[]) => {
    return groups.map(group => {
      const filter = filterButtons.find(f => f.key === group);
      return filter ? filter.label : group;
    }).join(" | ");
  };
  return <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gradient-to-b from-background to-muted/20 py-10 px-4">
        <div className="container mx-auto w-full max-w-full md:max-w-4xl px-2 md:px-0">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-primary">
              {t('stretching.title')}
            </h1>
            <Link to="/my-exercises" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {t('back')}
            </Link>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex gap-2 mb-8 overflow-x-auto scrollbar-hide pb-2 md:flex-wrap md:overflow-visible">
            {filterButtons.map(filter => <Button key={filter.key} variant={activeFilter === filter.key ? "default" : "outline"} size="sm" onClick={() => setActiveFilter(filter.key)} className="rounded-full flex-shrink-0">
                {filter.label}
              </Button>)}
          </div>

          {/* Suggested Programs Container */}
          <div className="mb-8 bg-card rounded-lg overflow-hidden shadow-sm border-none">
            <div className="flex flex-col md:flex-row h-auto md:h-40">
              {/* Left side - Image */}
              <div className="w-full md:w-1/2 h-32 md:h-full">
                <img src={stretchingRecommendationImage} alt="Suggested stretching programs" className="w-full h-full object-cover" />
              </div>
              
              {/* Right side - Content */}
              <div className="w-full md:w-1/2 p-4 md:p-6 flex flex-col justify-center">
                <h3 className="text-foreground mb-4 leading-tight text-lg md:text-xl font-semibold">
                  {t('stretching.suggestions.title')}
                </h3>
                
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="sm" className="rounded-full text-xs h-7 flex-shrink-0">
                    {t('stretching.suggestions.programs.quick_relief')}
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full text-xs h-7 flex-shrink-0">
                    {t('stretching.suggestions.programs.morning_boost')}
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full text-xs h-7 flex-shrink-0">
                    {t('stretching.suggestions.programs.desk_break')}
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full text-xs h-7 flex-shrink-0">
                    {t('stretching.suggestions.programs.evening_unwind')}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 gap-4 my-[4px] py-[15px]">
            {filteredCards.map(card => (
              <Link key={card.id} to={`/stretching/${card.id}`}>
                 <Card className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden group border-none shadow-sm">
                   <CardContent className="p-0 relative">
                     <div className="aspect-square overflow-hidden rounded-t-lg relative">
                       <img src={card.image} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                       <ProgramProgressBadge programId={card.id} programType="stretching" />
                     </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                        {card.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {card.description}
                      </p>
                      <div className="flex justify-between items-end">
                        <span className="text-xs text-muted-foreground underline">
                          {getFilterLabels(card.stretch_group)}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {card.time}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {filteredCards.length === 0 && <div className="text-center py-12">
              <p className="text-muted-foreground">{t('stretching.no_results')}</p>
            </div>}
        </div>
      </div>
      <Footer />
    </div>;
};
export default Stretching;