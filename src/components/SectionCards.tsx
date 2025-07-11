import React from "react";
import { SectionCard } from "./SectionCard";

const sections = [
  { title: "Blog", route: "/blog" },
  { title: "Stretching", route: "/stretching" },
  { title: "Strength", route: "/strength" },
  { title: "Yoga", route: "/yoga" },
];

export const SectionCards = () => {
  return (
    <div className="mb-6">
      {/* Desktop view */}
      <div className="hidden md:grid md:grid-cols-4 gap-4">
        {sections.map((section) => (
          <SectionCard
            key={section.route}
            title={section.title}
            route={section.route}
          />
        ))}
      </div>

      {/* Mobile view with carousel effect */}
      <div className="md:hidden relative overflow-hidden">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-8">
          {sections.map((section, index) => (
            <div
              key={section.route}
              className="flex-shrink-0 w-32 snap-center"
            >
              <SectionCard
                title={section.title}
                route={section.route}
              />
            </div>
          ))}
        </div>
        
        {/* Left blur gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-blue-50 to-transparent pointer-events-none" />
        
        {/* Right blur gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-blue-50 to-transparent pointer-events-none" />
      </div>
    </div>
  );
};