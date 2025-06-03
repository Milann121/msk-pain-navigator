
import React from 'react';

interface FavoriteExercise {
  id: string;
  exercise_title: string;
  video_id: string;
  description?: string;
  created_at: string;
}

interface FavoriteExerciseCardProps {
  exercise: FavoriteExercise;
  onClick: (exercise: FavoriteExercise) => void;
}

export const FavoriteExerciseCard = ({ exercise, onClick }: FavoriteExerciseCardProps) => {
  return (
    <div 
      className="border rounded-md p-4 space-y-2 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onClick(exercise)}
    >
      {/* Thumbnail */}
      <div className="aspect-video w-full bg-gray-100 rounded overflow-hidden relative group">
        <img
          src={`https://img.youtube.com/vi/${exercise.video_id}/mqdefault.jpg`}
          alt={exercise.exercise_title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://img.youtube.com/vi/${exercise.video_id}/hqdefault.jpg`;
          }}
        />
        {/* Play overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
          </div>
        </div>
      </div>
      
      {/* Exercise title */}
      <h4 className="font-medium text-sm text-center line-clamp-2">
        {exercise.exercise_title}
      </h4>
    </div>
  );
};
