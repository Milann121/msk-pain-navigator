import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { ArrowLeft } from "lucide-react";
import { StrengthFilters } from "@/components/strength/StrengthFilters";
import { StrengthRecommendation } from "@/components/strength/StrengthRecommendation";
import { StrengthCardsList } from "@/components/strength/StrengthCardsList";
import { getStrengthCards } from "@/data/strengthCards";

const Strength = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  
  const strengthCards = getStrengthCards(t);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gradient-to-b from-background to-muted/20 py-10 px-4">
        <div className="container mx-auto w-full max-w-full md:max-w-4xl px-2 md:px-0">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-primary">
              {t('strength.title')}
            </h1>
            <Link to="/my-exercises" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {t('back')}
            </Link>
          </div>
          
          <StrengthFilters 
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
          
          <StrengthRecommendation isMobile={true} />

          <div className="flex gap-6 items-start">
            <StrengthRecommendation isMobile={false} />
            
            <StrengthCardsList 
              cards={strengthCards}
              activeFilter={activeFilter}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Strength;