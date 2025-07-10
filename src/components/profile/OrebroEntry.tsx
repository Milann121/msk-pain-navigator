import React, { useState } from 'react';
import { useOrebroCompletion } from '@/hooks/useOrebroCompletion';
import { useOrebroNavigation } from '@/hooks/useOrebroNavigation';
import { OrebroCollapsedView } from './orebro/OrebroCollapsedView';
import { OrebroExpandedView } from './orebro/OrebroExpandedView';

export const OrebroEntry = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { hasCompletedRecently, lastCompletionDate, showReminder, loading } = useOrebroCompletion();
  const { handleTakeQuestionnaire, handleViewResults } = useOrebroNavigation();

  if (loading) {
    return null;
  }

  // If completed recently and not expanded, show collapsed view
  if (hasCompletedRecently && !isExpanded) {
    return (
      <OrebroCollapsedView 
        onExpand={() => setIsExpanded(true)}
        lastCompletionDate={lastCompletionDate}
        showReminder={showReminder}
      />
    );
  }

  return (
    <OrebroExpandedView
      hasCompletedRecently={hasCompletedRecently}
      lastCompletionDate={lastCompletionDate}
      showReminder={showReminder}
      onCollapse={hasCompletedRecently ? () => setIsExpanded(false) : undefined}
      onTakeQuestionnaire={handleTakeQuestionnaire}
      onViewResults={handleViewResults}
    />
  );
};