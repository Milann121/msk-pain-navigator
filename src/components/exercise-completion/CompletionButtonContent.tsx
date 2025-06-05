
import React from 'react';
import { Check } from 'lucide-react';

interface CompletionButtonContentProps {
  completionCount: number;
}

export const CompletionButtonContent = ({ completionCount }: CompletionButtonContentProps) => {
  if (completionCount > 0) {
    return (
      <div className="flex items-center gap-2">
        <Check className="h-4 w-4" />
        <span>Odcvičené dnes ({completionCount})</span>
      </div>
    );
  } else {
    return (
      <div className="flex items-center gap-2">
        <Check className="h-4 w-4" />
        <span>Odcvičené dnes</span>
      </div>
    );
  }
};
