import React, { useState } from 'react';
import { usePsfsCompletion } from '@/hooks/usePsfsCompletion';
import { usePsfsNavigation } from '@/hooks/usePsfsNavigation';
import { PsfsCollapsedView } from './psfs/PsfsCollapsedView';
import { PsfsExpandedView } from './psfs/PsfsExpandedView';
import { PsfsWrappedView } from './psfs/PsfsWrappedView';

interface PsfsEntryProps {
  isExpanded: boolean;
  onExpandChange: (expanded: boolean) => void;
  otherExpanded: boolean;
}

export const PsfsEntry = ({ isExpanded, onExpandChange, otherExpanded }: PsfsEntryProps) => {
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
        onExpand={() => onExpandChange(true)}
        onWrap={() => setIsWrapped(true)}
        lastCompletionDate={lastCompletionDate}
        showReminder={showReminder}
        otherExpanded={otherExpanded}
      />
    );
  }

  return (
    <PsfsExpandedView
      hasCompletedRecently={hasCompletedRecently}
      lastCompletionDate={lastCompletionDate}
      showReminder={showReminder}
      onCollapse={hasCompletedRecently ? () => onExpandChange(false) : undefined}
      onWrap={() => setIsWrapped(true)}
      onTakeQuestionnaire={handleTakeQuestionnaire}
      onViewResults={handleViewResults}
      otherExpanded={otherExpanded}
    />
  );
};