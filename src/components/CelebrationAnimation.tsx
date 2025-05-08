
import React, { useState, useEffect } from 'react';
import { PartyPopper } from 'lucide-react';

interface CelebrationAnimationProps {
  isActive: boolean;
  onComplete?: () => void;
}

export const CelebrationAnimation = ({ isActive, onComplete }: CelebrationAnimationProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; color: string; angle: number; speed: number }>>([]);

  useEffect(() => {
    if (!isActive) return;
    
    // Create particles for the celebration effect
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: 50, // start at center
      y: 50, // start at center
      size: Math.random() * 6 + 2,
      color: getRandomColor(),
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 3 + 2,
    }));
    
    setParticles(newParticles);
    
    // Cleanup animation after it plays
    const timer = setTimeout(() => {
      setParticles([]);
      if (onComplete) onComplete();
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [isActive, onComplete]);
  
  // Get random celebration colors
  const getRandomColor = () => {
    const colors = ['#9b87f5', '#1EAEDB', '#33C3F0', '#8B5CF6', '#D6BCFA'];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  // No render if not active
  if (!isActive) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      <div className="relative w-60 h-60">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full animate-celebration-particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              transform: `translateX(${Math.cos(particle.angle) * (particle.speed * 40)}px) 
                          translateY(${Math.sin(particle.angle) * (particle.speed * 40)}px)`,
              opacity: 0,
              transition: 'transform 1s ease-out, opacity 1s ease-out',
            }}
          />
        ))}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl animate-party">
          <PartyPopper className="h-10 w-10 text-yellow-500" />
        </div>
      </div>
    </div>
  );
};
