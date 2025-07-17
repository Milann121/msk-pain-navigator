import React, { useState } from 'react';
import { useOrebroCompletion } from '@/hooks/useOrebroCompletion';
import { useOrebroNavigation } from '@/hooks/useOrebroNavigation';
import { OrebroCollapsedView } from './orebro/OrebroCollapsedView';
import { OrebroExpandedView } from './orebro/OrebroExpandedView';

interface OrebroEntryProps {
  isExpanded: boolean;
  onExpandChange: (expanded: boolean) => void;
  otherExpanded: boolean;
}

export const OrebroEntry = ({ isExpanded, onExpandChange, otherExpanded }: OrebroEntryProps) => {
  const { hasCompletedRecently, lastCompletionDate, showReminder, loading } = useOrebroCompletion();
  const { handleTakeQuestionnaire, handleViewResults } = useOrebroNavigation();

  if (loading) {
    return null;
  }

  // If completed recently and not expanded, show collapsed view
  if (hasCompletedRecently && !isExpanded) {
    return (
      <OrebroCollapsedView 
        onExpand={() => onExpandChange(true)}
        lastCompletionDate={lastCompletionDate}
        showReminder={showReminder}
        otherExpanded={otherExpanded}
      />
    );
  }

  return (
    <OrebroExpandedView
      hasCompletedRecently={hasCompletedRecently}
      lastCompletionDate={lastCompletionDate}
      showReminder={showReminder}
      onCollapse={hasCompletedRecently ? () => onExpandChange(false) : undefined}
      onTakeQuestionnaire={handleTakeQuestionnaire}
      onViewResults={handleViewResults}
      otherExpanded={otherExpanded}
    />
  );
};