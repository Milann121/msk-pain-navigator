
import React, { useState, useEffect } from 'react';
import { PartyPopper, Sparkles, Star } from 'lucide-react';

interface CelebrationAnimationProps {
  isActive: boolean;
  onComplete?: () => void;
}

export const CelebrationAnimation = ({ isActive, onComplete }: CelebrationAnimationProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; color: string; angle: number; speed: number }>>([]);
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);

  useEffect(() => {
    if (!isActive) return;
    
    // Create particles for the celebration effect
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: 50, // start at center
      y: 50, // start at center
      size: Math.random() * 8 + 2,
      color: getRandomColor(),
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 4 + 2,
    }));
    
    // Create stars for additional animation
    const newStars = Array.from({ length: 15 }, (_, i) => ({
      id: i + 100,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      delay: Math.random() * 1000,
    }));
    
    setParticles(newParticles);
    setStars(newStars);
    
    // Cleanup animation after it plays for 3 seconds
    const timer = setTimeout(() => {
      setParticles([]);
      setStars([]);
      if (onComplete) onComplete();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [isActive, onComplete]);
  
  // Get random celebration colors
  const getRandomColor = () => {
    const colors = ['#9b87f5', '#1EAEDB', '#33C3F0', '#8B5CF6', '#D6BCFA', '#D946EF', '#F97316', '#0EA5E9', '#ea384c'];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  // No render if not active
  if (!isActive) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      <div className="relative w-full h-full">
        {/* Confetti particles */}
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
              transition: 'transform 1.5s ease-out, opacity 1.5s ease-out',
              animation: 'celebration-particle 1.5s ease-out infinite',
            }}
          />
        ))}
        
        {/* Stars animation */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              animation: `star-fade 1s ease-in-out ${star.delay}ms infinite`,
              opacity: 0,
            }}
          >
            <Star className={`text-yellow-400`} style={{ width: star.size, height: star.size }} />
          </div>
        ))}
        
        {/* Central party popper */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl animate-party">
          <PartyPopper className="h-12 w-12 text-yellow-500" />
        </div>
        
        {/* Extra sparkles animation */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-sparkle">
          <Sparkles className="h-14 w-14 text-purple-500 opacity-75" />
        </div>
      </div>
    </div>
  );
};
