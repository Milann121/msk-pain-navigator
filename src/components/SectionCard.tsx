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
  return <Card className="cursor-pointer hover:shadow-lg transition-shadow border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50" onClick={handleClick}>
      <CardContent className="p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
            {imageUrl ? <img src={imageUrl} alt={title} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-100" />}
          </div>
          <h3 className="text-blue-900 text-center text-base font-bold">
            {title}
          </h3>
        </div>
      </CardContent>
    </Card>;
};