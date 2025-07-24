import React, { useEffect, useState } from 'react';

interface SiriRecordingAnimationProps {
  isRecording: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const SiriRecordingAnimation: React.FC<SiriRecordingAnimationProps> = ({ 
  isRecording, 
  size = 'medium' 
}) => {
  const [waves, setWaves] = useState<number[]>([]);

  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-16 h-16', 
    large: 'w-24 h-24'
  };

  useEffect(() => {
    if (!isRecording) {
      setWaves([]);
      return;
    }

    const interval = setInterval(() => {
      // Generate random wave heights to simulate audio levels
      const newWaves = Array.from({ length: 5 }, () => Math.random() * 0.8 + 0.2);
      setWaves(newWaves);
    }, 150);

    return () => clearInterval(interval);
  }, [isRecording]);

  if (!isRecording) return null;

  return (
    <div className={`${sizeClasses[size]} relative flex items-center justify-center`}>
      {/* Outer glow ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-30 animate-pulse" />
      
      {/* Main circle with gradient */}
      <div className="absolute inset-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-80" />
      
      {/* Inner animated waves */}
      <div className="relative flex items-center justify-center space-x-0.5 z-10">
        {waves.map((height, index) => (
          <div
            key={index}
            className="bg-white rounded-full transition-all duration-150 ease-out"
            style={{
              width: size === 'small' ? '2px' : size === 'medium' ? '3px' : '4px',
              height: `${height * (size === 'small' ? 12 : size === 'medium' ? 20 : 28)}px`,
              opacity: 0.9,
            }}
          />
        ))}
      </div>
      
      {/* Animated rings */}
      <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" 
           style={{ animationDuration: '2s' }} />
      <div className="absolute inset-1 rounded-full border border-white/20 animate-ping" 
           style={{ animationDuration: '1.5s', animationDelay: '0.3s' }} />
    </div>
  );
};