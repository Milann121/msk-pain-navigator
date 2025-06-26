
import React from 'react';
import { Advice } from './Advice';

interface AdviceListProps {
  adviceIds: number[];
  className?: string;
}

export const AdviceList: React.FC<AdviceListProps> = ({ 
  adviceIds, 
  className = '' 
}) => {
  if (!adviceIds || adviceIds.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-gray-500">Žiadne rady nie sú k dispozícii.</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {adviceIds.map((adviceId) => (
        <Advice key={adviceId} adviceId={adviceId} />
      ))}
    </div>
  );
};
