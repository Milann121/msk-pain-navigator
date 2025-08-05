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
const yogaRecommendationImage = "/lovable-uploads/stretchingCard_images/2.png";

interface YogaCard {
  id: string;
  image: string;
  title: string;
  description: string;
  description2: string;
  time: string;
  yoga_group: string[];
  yoga_level: string[];
}

const Yoga = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [activeLevel, setActiveLevel] = useState<string>("all");

  const filterButtons = [
    { key: "all", label: t('yoga.filters.all') },
    { key: "full_body", label: t('yoga.filters.full_body') },
    { key: "lower_body", label: t('yoga.filters.lower_body') },
    { key: "upper_body", label: t('yoga.filters.upper_body') }
  ];

  const levelButtons = [
    { key: "all", label: t('yoga.levels.all') },
    { key: "beginner", label: t('yoga.levels.beginner') },
    { key: "intermediate", label: t('yoga.levels.intermediate') },
    { key: "advanced", label: t('yoga.levels.advanced') },
    { key: "master", label: t('yoga.levels.master') }
  ];

  // Sample data - replace with real data from backend
  const yogaCards: YogaCard[] = [
    {
      id: "morning-energizer",
      image: "/lovable-uploads/stretchingCard_images/1.png",
      title: t('yoga.cards.morning_energizer.title'),
      description: t('yoga.cards.morning_energizer.description'),
      description2: t('yoga.cards.morning_energizer.description2'),
      time: "18 min",
      yoga_group: ["full_body"],
      yoga_level: ["beginner"]
    },
    {
      id: "lower-body",
      image: "/lovable-uploads/stretchingCard_images/5.png",
      title: t('yoga.cards.lower_body.title'),
      description: t('yoga.cards.lower_body.description'),
      description2: t('yoga.cards.lower_body.description2'),
      time: "25 min",
      yoga_group: ["lower_body"],
      yoga_level: ["beginner", "intermediate"]
    },
    {
      id: "upper-body",
      image: "/lovable-uploads/stretchingCard_images/5.png",
      title: t('yoga.cards.upper_body.title'),
      description: t('yoga.cards.upper_body.description'),
      description2: t('yoga.cards.upper_body.description2'),
      time: "25 min",
      yoga_group: ["upper_body"],
      yoga_level: ["beginner", "intermediate"]
    },
    {
      id: "arm-balance",
      image: "/lovable-uploads/stretchingCard_images/8.png",
      title: t('yoga.cards.arm_balance.title'),
      description: t('yoga.cards.arm_balance.description'),
      description2: t('yoga.cards.arm_balance.description2'),
      time: "35 min",
      yoga_group: ["upper_body"],
      yoga_level: ["advanced", "master"]
    }
  ];

  const filteredCards = yogaCards.filter(card => {
    const matchesFilter = activeFilter === "all" || card.yoga_group.includes(activeFilter);
    const matchesLevel = activeLevel === "all" || card.yoga_level.includes(activeLevel);
    return matchesFilter && matchesLevel;
  });

  // Helper function to get filter labels for description2
  const getFilterLabels = (groups: string[], levels: string[]) => {
    const groupLabels = groups.map(group => {
      const filter = filterButtons.find(f => f.key === group);
      return filter ? filter.label : group;
    }).join(" | ");
    
    const levelLabels = levels.map(level => {
      const levelFilter = levelButtons.find(l => l.key === level);
      return levelFilter ? levelFilter.label : level;
    }).join(" | ");
    
    return `${groupLabels} | ${levelLabels}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gradient-to-b from-background to-muted/20 py-10 px-4">
        <div className="container mx-auto w-full max-w-full md:max-w-4xl px-2 md:px-0">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-primary">
              {t('yoga.title')}
            </h1>
            <Link to="/my-exercises" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {t('back')}
            </Link>
          </div>
          
          {/* Filter Buttons */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">{t('yoga.filter_label')}</h3>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 md:flex-wrap md:overflow-visible">
              {filterButtons.map(filter => (
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
          </div>

          {/* Level Buttons */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">{t('yoga.level_label')}</h3>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 md:flex-wrap md:overflow-visible">
              {levelButtons.map(level => (
                <Button
                  key={level.key}
                  variant={activeLevel === level.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveLevel(level.key)}
                  className="rounded-full flex-shrink-0"
                >
                  {level.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Recommended Programs Container - Reversed layout */}
          <div className="mb-8 bg-card rounded-lg overflow-hidden shadow-sm border-none">
            <div className="flex flex-col md:flex-row h-auto md:h-40">
              {/* Left side - Content (reversed from stretching) */}
              <div className="w-full md:w-1/2 p-4 md:p-6 flex flex-col justify-center order-2 md:order-1">
                <h3 className="text-foreground mb-4 leading-tight text-lg md:text-xl font-semibold">
                  {t('yoga.recommendations.title')}
                </h3>
                
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="sm" className="rounded-full text-xs h-7 flex-shrink-0">
                    {t('yoga.recommendations.programs.sunrise_flow')}
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full text-xs h-7 flex-shrink-0">
                    {t('yoga.recommendations.programs.power_sequence')}
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full text-xs h-7 flex-shrink-0">
                    {t('yoga.recommendations.programs.flexibility_focus')}
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full text-xs h-7 flex-shrink-0">
                    {t('yoga.recommendations.programs.evening_calm')}
                  </Button>
                </div>
              </div>
              
              {/* Right side - Image (reversed from stretching) */}
              <div className="w-full md:w-1/2 h-32 md:h-full order-1 md:order-2">
                <img 
                  src={yogaRecommendationImage} 
                  alt="Recommended yoga programs" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 gap-4 my-[4px] py-[15px]">
            {filteredCards.map(card => (
              <Link key={card.id} to={`/yoga/${card.id}`}>
                 <Card className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden group border-none shadow-sm">
                   <CardContent className="p-0 relative">
                     <div className="aspect-square overflow-hidden rounded-t-lg relative">
                       <img
                         src={card.image}
                         alt={card.title}
                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                       />
                       <ProgramProgressBadge programId={card.id} programType="yoga" />
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
                          {getFilterLabels(card.yoga_group, card.yoga_level)}
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

          {filteredCards.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t('yoga.no_results')}</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Yoga;