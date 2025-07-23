
import React, { useEffect, useRef } from 'react';
import { Advice } from './Advice';

interface AdviceListProps {
  adviceIds: number[];
  className?: string;
}

export const AdviceList: React.FC<AdviceListProps> = ({ 
  adviceIds, 
  className = '' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || adviceIds.length === 0) return;

    const adjustHeights = () => {
      const cards = containerRef.current?.querySelectorAll('[data-advice-card]');
      if (!cards || cards.length === 0) return;

      // Reset heights first
      cards.forEach(card => {
        (card as HTMLElement).style.height = 'auto';
      });

      // Get all heights after reset
      const heights = Array.from(cards).map(card => card.scrollHeight);
      const maxHeight = Math.max(...heights);

      // Set all cards to the maximum height
      cards.forEach(card => {
        (card as HTMLElement).style.height = `${maxHeight}px`;
      });
    };

    // Adjust heights after a short delay to ensure all content is rendered
    const timeoutId = setTimeout(adjustHeights, 100);

    return () => clearTimeout(timeoutId);
  }, [adviceIds]);

  if (!adviceIds || adviceIds.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-gray-500">Žiadne rady nie sú k dispozícii.</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
      {adviceIds.map((adviceId) => (
        <div key={adviceId} className="w-full">
          <Advice adviceId={adviceId} />
        </div>
      ))}
    </div>
  );
};
