import React from 'react';
import { useOrebroCompletion } from '@/hooks/useOrebroCompletion';
import { useOrebroNavigation } from '@/hooks/useOrebroNavigation';
import { OrebroCollapsedView } from './orebro/OrebroCollapsedView';
import { OrebroExpandedView } from './orebro/OrebroExpandedView';
import { OrebroWrappedView } from './orebro/OrebroWrappedView';

interface OrebroEntryProps {
  isExpanded: boolean;
  isWrapped: boolean;
  onExpand: () => void;
  onCollapse: () => void;
  onWrap: () => void;
  onUnwrap: () => void;
}

export const OrebroEntry = ({
  isExpanded,
  isWrapped,
  onExpand,
  onCollapse,
  onWrap,
  onUnwrap
}: OrebroEntryProps) => {
  const { hasCompletedRecently, lastCompletionDate, showReminder, loading } = useOrebroCompletion();
  const { handleTakeQuestionnaire, handleViewResults } = useOrebroNavigation();

  if (loading) {
    return null;
  }

  // If wrapped, show only icon and title
  if (isWrapped) {
    return (
      <OrebroWrappedView 
        onUnwrap={onUnwrap}
      />
    );
  }

  // Show collapsed view by default when not expanded
  if (!isExpanded) {
    return (
      <OrebroCollapsedView 
        onExpand={onExpand}
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
      onCollapse={onCollapse}
      onTakeQuestionnaire={handleTakeQuestionnaire}
      onViewResults={handleViewResults}
    />
  );
};