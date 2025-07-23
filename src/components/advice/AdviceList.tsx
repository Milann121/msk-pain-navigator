
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
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
      {adviceIds.map((adviceId) => (
        <div key={adviceId} className="aspect-square">
          <Advice adviceId={adviceId} />
        </div>
      ))}
    </div>
  );
};
