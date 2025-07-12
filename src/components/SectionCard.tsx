import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
interface SectionCardProps {
  title: string;
  route: string;
  imageUrl?: string;
}
export const SectionCard = ({
  title,
  route,
  imageUrl
}: SectionCardProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(route);
  };
  return <Card className="cursor-pointer hover:shadow-lg transition-shadow border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 h-32" onClick={handleClick}>
      <CardContent className="p-0 h-full flex flex-col">
        <div className="h-1/2 overflow-hidden rounded-t-lg">
          {imageUrl ? 
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" /> : 
            <div className="w-full h-full bg-gray-100" />
          }
        </div>
        <div className="h-1/2 p-4 flex items-center justify-center">
          <h3 className="text-blue-900 text-center text-base font-bold">
            {title}
          </h3>
        </div>
      </CardContent>
    </Card>;
};