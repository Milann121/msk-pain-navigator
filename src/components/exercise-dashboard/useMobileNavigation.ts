
import { useState } from 'react';

interface UseMobileNavigationProps {
  daysToDisplay: Date[];
  isMobile: boolean;
  onPreviousWeek?: () => void;
  onNextWeek?: () => void;
}

export const useMobileNavigation = ({
  daysToDisplay,
  isMobile,
  onPreviousWeek,
  onNextWeek
}: UseMobileNavigationProps) => {
  const [mobileStartIndex, setMobileStartIndex] = useState(0);
  
  // Mobile view shows 4 days at a time
  const mobileDisplayDays = isMobile ? daysToDisplay.slice(mobileStartIndex, mobileStartIndex + 4) : daysToDisplay;
  
  // Mobile navigation - move by 4 days within the current week
  const canScrollLeft = isMobile ? mobileStartIndex > 0 : true;
  const canScrollRight = isMobile ? mobileStartIndex + 4 < daysToDisplay.length : true;
  
  const handleScrollLeft = () => {
    if (isMobile) {
      if (mobileStartIndex >= 4) {
        // Move back by 4 days within current week
        setMobileStartIndex(prev => prev - 4);
      } else if (mobileStartIndex > 0) {
        // Move to beginning of current week
        setMobileStartIndex(0);
      } else {
        // Move to previous week and show last 4 days (3,4,5,6 indices)
        if (onPreviousWeek) {
          onPreviousWeek();
          setMobileStartIndex(3);
        }
      }
    } else {
      if (onPreviousWeek) {
        onPreviousWeek();
      }
    }
  };
  
  const handleScrollRight = () => {
    if (isMobile) {
      if (mobileStartIndex + 4 < daysToDisplay.length) {
        // Move forward by 4 days within current week
        setMobileStartIndex(prev => prev + 4);
      } else {
        // Move to next week and show first 4 days
        if (onNextWeek) {
          onNextWeek();
          setMobileStartIndex(0);
        }
      }
    } else {
      if (onNextWeek) {
        onNextWeek();
      }
    }
  };

  return {
    mobileStartIndex,
    setMobileStartIndex,
    mobileDisplayDays,
    canScrollLeft,
    canScrollRight,
    handleScrollLeft,
    handleScrollRight
  };
};
