import React from "react";
import { Leaf } from "lucide-react";

interface RankTileProps {
  rank: number | null;
  size?: number; // square px
}

const RankTile: React.FC<RankTileProps> = ({ rank, size = 80 }) => {
  return (
    <div
      className="relative rounded-md border bg-muted/30 flex items-center justify-center"
      style={{ width: size, height: size }}
      aria-label={rank ? `Rank ${rank}` : 'No rank'}
   >
      {/* Laurel leaves */}
      <Leaf className="absolute left-3 top-1/2 -translate-y-1/2 -rotate-45 text-[hsl(var(--trophy-gold))] opacity-80" size={28} />
      <Leaf className="absolute right-3 top-1/2 -translate-y-1/2 rotate-45 text-[hsl(var(--trophy-gold))] opacity-80" size={28} />
      <span className="text-3xl font-bold leading-none">{rank ?? '–'}</span>
    </div>
  );
};

export default RankTile;
