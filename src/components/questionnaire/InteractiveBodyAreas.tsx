import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BodyAreaProps {
  imageUrl: string;
  areas: {
    name: string;
    coords: string;
    route: string;
  }[];
}

export const InteractiveBodyAreas: React.FC<BodyAreaProps> = ({ imageUrl, areas }) => {
  const navigate = useNavigate();

  const handleAreaClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="relative w-full">
      <img src={imageUrl} alt="Body Areas" className="w-full h-auto" />
      <svg 
        className="absolute top-0 left-0 w-full h-full pointer-events-auto" 
        style={{ pointerEvents: 'all' }}
      >
        {areas.map((area, index) => (
          <area 
            key={index}
            shape="poly"
            coords={area.coords}
            onClick={() => handleAreaClick(area.route)}
            className="cursor-pointer hover:opacity-50 transition-opacity"
          />
        ))}
      </svg>
    </div>
  );
};