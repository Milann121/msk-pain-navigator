import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export const StrengthRecommendation: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* Mobile/Tablet Recommendation Container */}
      <div className="mb-8 bg-card rounded-lg overflow-hidden shadow-sm border-none lg:hidden">
        <div className="flex flex-col md:flex-row h-auto md:h-40">
          {/* Left side - Image */}
          <div className="w-full md:w-1/2 h-32 md:h-full">
            <img 
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop" 
              alt={t('strength.recommendation.image_alt')}
              className="w-full h-full object-cover" 
            />
          </div>
          
          {/* Right side - Content */}
          <div className="w-full md:w-1/2 p-4 md:p-6 flex flex-col justify-center">
            <h3 className="text-foreground mb-4 leading-tight text-lg md:text-xl font-semibold">
              {t('strength.recommendation.title')}
            </h3>
            
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm" className="text-xs rounded-full">
                {t('strength.recommendation.sample_program')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Recommendation Container - Left Side */}
      <div className="hidden lg:block w-1/3">
        <div className="bg-card border rounded-lg p-4 h-[768px] flex flex-col">
          {/* Recommendation Title and Content - Top */}
          <div className="space-y-3 mb-4">
            <h2 className="text-lg font-semibold text-foreground leading-tight">
              {t('strength.recommendation.title')}
            </h2>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="text-xs rounded-full">
                {t('strength.recommendation.sample_program')}
              </Button>
            </div>
          </div>
          
          {/* Recommendation Image - Bottom */}
          <div className="flex-1 flex items-end">
            <div className="w-full h-2/3 bg-muted rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop" 
                alt={t('strength.recommendation.image_alt')}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};