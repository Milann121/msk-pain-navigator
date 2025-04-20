
import React from 'react';

interface ExerciseVideoProps {
  videoId: string;
  title?: string;
  description?: string;
  exerciseTitle: string;
}

const ExerciseVideo = ({ videoId, title, description, exerciseTitle }: ExerciseVideoProps) => {
  return (
    <div className="space-y-4">
      {title && (
        <h4 className="text-lg font-medium text-gray-800">{title}</h4>
      )}
      <div className="aspect-video w-full">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title || exerciseTitle}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {description && (
        <p className="text-gray-600 ml-4 border-l-2 border-gray-200 pl-4">
          {description.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
      )}
    </div>
  );
};

export default ExerciseVideo;
