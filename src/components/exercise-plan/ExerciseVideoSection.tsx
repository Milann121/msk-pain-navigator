
import React from 'react';
import { ExerciseCompletionCheckbox } from '@/components/ExerciseCompletionCheckbox';
import { FavoriteExerciseButton } from '@/components/FavoriteExerciseButton';

interface Video {
  videoId: string;
  title?: string;
  description?: string;
  importance?: 1 | 2 | 3;
}

interface ExerciseVideoSectionProps {
  video: Video;
  exerciseTitle: string;
  showGeneral: boolean;
  assessmentId?: string;
}

export const ExerciseVideoSection = ({ 
  video, 
  exerciseTitle, 
  showGeneral, 
  assessmentId 
}: ExerciseVideoSectionProps) => {
  return (
    <div className="space-y-4">
      {video.title && (
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold text-gray-800">{video.title}</h3>
          {!showGeneral && video.importance && (
            <span className={`px-2 py-1 text-xs font-medium rounded ${
              video.importance === 1 ? 'bg-red-100 text-red-800' :
              video.importance === 2 ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {video.importance === 1 ? 'Primárne' :
               video.importance === 2 ? 'Sekundárne' : 'Terciárne'}
            </span>
          )}
        </div>
      )}
      
      {/* Desktop layout: video on left, description and favorite on right */}
      <div className="hidden md:flex gap-6">
        {/* Video - half size, aligned left */}
        <div className="w-1/2">
          <div className="aspect-video w-full">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${video.videoId}`}
              title={video.title || exerciseTitle}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
        
        {/* Description, favorite button and completion button on right */}
        <div className="w-1/2 space-y-4">
          {video.description && (
            <div className="space-y-2">
              <p className="text-gray-600">
                {video.description.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
              {/* Completion button for all programs */}
              <ExerciseCompletionCheckbox 
                exerciseTitle={video.title || exerciseTitle}
                assessmentId={showGeneral ? 'general' : (assessmentId || 'default')}
                videoId={video.videoId}
              />
            </div>
          )}
          
          <FavoriteExerciseButton
            exerciseTitle={video.title || exerciseTitle}
            videoId={video.videoId}
            description={video.description}
          />
        </div>
      </div>
      
      {/* Mobile layout: original stacked layout */}
      <div className="md:hidden space-y-4">
        <div className="aspect-video w-full">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${video.videoId}`}
            title={video.title || exerciseTitle}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        {video.description && (
          <div className="ml-4 border-l-2 border-gray-200 pl-4 space-y-2">
            <p className="text-gray-600">
              {video.description.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
            {/* Completion button for all programs on mobile */}
            <ExerciseCompletionCheckbox 
              exerciseTitle={video.title || exerciseTitle}
              assessmentId={showGeneral ? 'general' : (assessmentId || 'default')}
              videoId={video.videoId}
            />
          </div>
        )}
        
        <FavoriteExerciseButton
          exerciseTitle={video.title || exerciseTitle}
          videoId={video.videoId}
          description={video.description}
        />
      </div>
    </div>
  );
};
