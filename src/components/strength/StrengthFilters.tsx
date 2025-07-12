import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { FilterButton } from "@/types/strength";

interface StrengthFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const StrengthFilters: React.FC<StrengthFiltersProps> = ({
  activeFilter,
  onFilterChange,
}) => {
  const { t } = useTranslation();
  
  const filterButtons: FilterButton[] = [
    { key: "all", label: t('strength.filters.all') },
    { key: "home", label: t('strength.filters.home') },
    { key: "gym", label: t('strength.filters.gym') },
    { key: "outside", label: t('strength.filters.outside') }
  ];

  return (
    <div className="flex gap-2 mb-8 overflow-x-auto scrollbar-hide pb-2 md:flex-wrap md:overflow-visible">
      {filterButtons.map((filter) => (
        <Button
          key={filter.key}
          variant={activeFilter === filter.key ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(filter.key)}
          className="rounded-full flex-shrink-0"
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
};