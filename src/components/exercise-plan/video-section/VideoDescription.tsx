
import React from 'react';

interface VideoDescriptionProps {
  description: string;
}

export const VideoDescription = ({ description }: VideoDescriptionProps) => {
  return (
    <p className="text-gray-600">
      {description.split('\n').map((line, index) => (
        <span key={index}>
          {line}
          <br />
        </span>
      ))}
    </p>
  );
};
