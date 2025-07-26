import React from 'react';
import { usePsfsCompletion } from '@/hooks/usePsfsCompletion';
import { usePsfsNavigation } from '@/hooks/usePsfsNavigation';
import { PsfsCollapsedView } from './psfs/PsfsCollapsedView';
import { PsfsExpandedView } from './psfs/PsfsExpandedView';
import { PsfsWrappedView } from './psfs/PsfsWrappedView';

interface PsfsEntryProps {
  isExpanded: boolean;
  isWrapped: boolean;
  onExpand: () => void;
  onCollapse: () => void;
  onWrap: () => void;
  onUnwrap: () => void;
}

export const PsfsEntry = ({
  isExpanded,
  isWrapped,
  onExpand,
  onCollapse,
  onWrap,
  onUnwrap
}: PsfsEntryProps) => {
  const { hasCompletedRecently, lastCompletionDate, showReminder, loading } = usePsfsCompletion();
  const { handleTakeQuestionnaire, handleViewResults } = usePsfsNavigation();

  if (loading) {
    return null;
  }

  // If wrapped, show only icon and title
  if (isWrapped) {
    return (
      <PsfsWrappedView 
        onUnwrap={onUnwrap}
      />
    );
  }

  // Show collapsed view by default when not expanded
  if (!isExpanded) {
    return (
      <PsfsCollapsedView 
        onExpand={onExpand}
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
      onCollapse={onCollapse}
      onTakeQuestionnaire={handleTakeQuestionnaire}
      onViewResults={handleViewResults}
    />
  );
};