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

  // If completed recently and not expanded, show collapsed view
  if (hasCompletedRecently && !isExpanded) {
    return (
      <PsfsCollapsedView 
        onExpand={onExpand}
        onCollapse={onCollapse}
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
      onCollapse={hasCompletedRecently ? onCollapse : undefined}
      onWrap={onWrap}
      onTakeQuestionnaire={handleTakeQuestionnaire}
      onViewResults={handleViewResults}
    />
  );
};