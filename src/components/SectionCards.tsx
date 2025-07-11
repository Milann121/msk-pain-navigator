import React from "react";
import { useTranslation } from "react-i18next";
import { SectionCard } from "./SectionCard";
export const SectionCards = () => {
  const {
    t
  } = useTranslation();
  const sections = [{
    title: t('sections.blog'),
    route: "/blog",
    imageUrl: "/lovable-uploads/my_exercisePage_containers/13.png"
  }, {
    title: t('sections.stretching'),
    route: "/stretching",
    imageUrl: "/lovable-uploads/my_exercisePage_containers/1.png"
  }, {
    title: t('sections.strength'),
    route: "/strength",
    imageUrl: "/lovable-uploads/my_exercisePage_containers/5.png"
  }, {
    title: t('sections.yoga'),
    route: "/yoga",
    imageUrl: "/lovable-uploads/my_exercisePage_containers/11.png"
  }];
  return <div className="mb-6">
      {/* Desktop view */}
      <div className="hidden md:grid md:grid-cols-4 gap-4">
        {sections.map(section => <SectionCard key={section.route} title={section.title} route={section.route} imageUrl={section.imageUrl} />)}
      </div>

      {/* Mobile view with carousel effect */}
      <div className="md:hidden relative overflow-hidden">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-8 mx-[50px]">
          {sections.map((section, index) => <div key={section.route} className="flex-shrink-0 w-32 snap-center">
              <SectionCard title={section.title} route={section.route} imageUrl={section.imageUrl} />
            </div>)}
        </div>
        
        {/* Left blur gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        
        {/* Right blur gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </div>;
};
