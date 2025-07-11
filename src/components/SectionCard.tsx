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
  return <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-border bg-gradient-to-br from-card to-accent/20" onClick={handleClick}>
      <CardContent className="p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 bg-muted border border-border rounded-lg flex items-center justify-center overflow-hidden">
            {imageUrl ? <img src={imageUrl} alt={title} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-muted" />}
          </div>
          <h3 className="text-foreground text-center text-base font-bold">
            {title}
          </h3>
        </div>
      </CardContent>
    </Card>;
};