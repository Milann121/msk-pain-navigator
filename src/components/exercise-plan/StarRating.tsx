import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  hoveredRating: number;
  onStarClick: (starValue: number) => void;
  onMouseEnter: (starValue: number) => void;
  onMouseLeave: () => void;
}

export const StarRating = ({
  rating,
  hoveredRating,
  onStarClick,
  onMouseEnter,
  onMouseLeave
}: StarRatingProps) => (
  <div className="space-y-2">
    <span className="text-base font-medium text-gray-900 block">Rating:</span>
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((starValue) => (
        <Star
          key={starValue}
          className={`w-6 h-6 cursor-pointer transition-colors ${
            starValue <= (hoveredRating || rating) 
              ? 'fill-yellow-400 text-yellow-400' 
              : 'text-gray-300'
          }`}
          onClick={() => onStarClick(starValue)}
          onMouseEnter={() => onMouseEnter(starValue)}
          onMouseLeave={onMouseLeave}
        />
      ))}
    </div>
  </div>
);