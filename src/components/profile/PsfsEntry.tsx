import React, { useState } from 'react';
import { usePsfsCompletion } from '@/hooks/usePsfsCompletion';
import { usePsfsNavigation } from '@/hooks/usePsfsNavigation';
import { PsfsCollapsedView } from './psfs/PsfsCollapsedView';
import { PsfsExpandedView } from './psfs/PsfsExpandedView';
import { PsfsWrappedView } from './psfs/PsfsWrappedView';

export const PsfsEntry = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isWrapped, setIsWrapped] = useState(false);
  const { hasCompletedRecently, lastCompletionDate, showReminder, loading } = usePsfsCompletion();
  const { handleTakeQuestionnaire, handleViewResults } = usePsfsNavigation();

  if (loading) {
    return null;
  }

  // If wrapped, show only icon and title
  if (isWrapped) {
    return (
      <PsfsWrappedView 
        onUnwrap={() => setIsWrapped(false)}
      />
    );
  }

  // If completed recently and not expanded, show collapsed view
  if (hasCompletedRecently && !isExpanded) {
    return (
      <PsfsCollapsedView 
        onExpand={() => setIsExpanded(true)}
        onWrap={() => setIsWrapped(true)}
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
      onWrap={() => setIsWrapped(true)}
      onTakeQuestionnaire={handleTakeQuestionnaire}
      onViewResults={handleViewResults}
    />
  );
};