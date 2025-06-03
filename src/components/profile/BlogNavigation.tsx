
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BlogNavigationProps {
  canScrollLeft: boolean;
  canScrollRight: boolean;
  onScrollLeft: () => void;
  onScrollRight: () => void;
}

export const BlogNavigation = ({ 
  canScrollLeft, 
  canScrollRight, 
  onScrollLeft, 
  onScrollRight 
}: BlogNavigationProps) => {
  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 ${
          !canScrollLeft ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={onScrollLeft}
        disabled={!canScrollLeft}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 ${
          !canScrollRight ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={onScrollRight}
        disabled={!canScrollRight}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </>
  );
};
