import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { StrengthCard, FilterButton } from "@/types/strength";

interface StrengthCardsListProps {
  cards: StrengthCard[];
  activeFilter: string;
}

export const StrengthCardsList: React.FC<StrengthCardsListProps> = ({
  cards,
  activeFilter,
}) => {
  const { t } = useTranslation();

  const filterButtons: FilterButton[] = [
    { key: "all", label: t('strength.filters.all') },
    { key: "home", label: t('strength.filters.home') },
    { key: "gym", label: t('strength.filters.gym') },
    { key: "outside", label: t('strength.filters.outside') }
  ];

  const filteredCards = activeFilter === "all" ? cards : cards.filter(card => 
    card.strength_group.includes(activeFilter)
  );

  // Helper function to get filter labels for description2
  const getFilterLabels = (groups: string[]) => {
    return groups.map(group => {
      const filter = filterButtons.find(f => f.key === group);
      return filter ? filter.label : group;
    }).join(" | ");
  };

  return (
    <div className="flex-1 lg:w-2/3 relative">
      {/* Top fade overlay - Desktop: aligns with left column, Mobile/Tablet: above 4 cards */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-background via-background/80 to-transparent pointer-events-none z-10 hidden lg:block"></div>
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background via-background/80 to-transparent pointer-events-none z-10 lg:hidden"></div>
      
      {/* Bottom fade overlay - Desktop: aligns with left column, Mobile/Tablet: below 4 cards */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-10 hidden lg:block"></div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-10 lg:hidden"></div>
      
      {/* Scrollable Cards Container */}
      <div className="max-h-[768px] lg:max-h-[768px] md:max-h-[640px] max-h-[512px] overflow-y-auto scrollbar-hide">
        <div className="grid grid-cols-1 gap-4 py-4">
          {filteredCards.map((card) => (
            <Link key={card.id} to={`/strength/${card.id}`}>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden group border-none shadow-sm">
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
                      <span className="text-xs text-muted-foreground underline">
                        {getFilterLabels(card.strength_group)}
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
      </div>

      {filteredCards.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t('strength.no_results')}</p>
        </div>
      )}
    </div>
  );
};