import React, { useState } from 'react';
import { usePsfsCompletion } from '@/hooks/usePsfsCompletion';
import { usePsfsNavigation } from '@/hooks/usePsfsNavigation';
import { PsfsCollapsedView } from './psfs/PsfsCollapsedView';
import { PsfsExpandedView } from './psfs/PsfsExpandedView';

export const PsfsEntry = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { hasCompletedRecently, lastCompletionDate, showReminder, loading } = usePsfsCompletion();
  const { handleTakeQuestionnaire, handleViewResults } = usePsfsNavigation();

  if (loading) {
    return null;
  }

  // If completed recently and not expanded, show collapsed view
  if (hasCompletedRecently && !isExpanded) {
    return (
      <PsfsCollapsedView 
        onExpand={() => setIsExpanded(true)}
        lastCompletionDate={lastCompletionDate}
        showReminder={showReminder}
      />
    );
  }

  return (
    <PsfsExpandedView
      hasCompletedRecently={hasCompletedRecently}
      lastCompletionDate={lastCompletionDate}
      showReminder={showReminder}
      onCollapse={hasCompletedRecently ? () => setIsExpanded(false) : undefined}
      onTakeQuestionnaire={handleTakeQuestionnaire}
      onViewResults={handleViewResults}
    />
  );
};