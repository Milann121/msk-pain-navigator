import React from "react";
import { Trophy } from "lucide-react";

interface TableRankCupProps {
  rank: number;
  size?: number; // px
}

const TableRankCup: React.FC<TableRankCupProps> = ({ rank, size = 28 }) => {
  const variant = rank === 1 ? "gold" : rank === 2 ? "silver" : rank === 3 ? "bronze" : "default";
  const colorClass =
    variant === "gold"
      ? "text-[hsl(var(--trophy-gold))]"
      : variant === "silver"
      ? "text-[hsl(var(--trophy-silver))]"
      : variant === "bronze"
      ? "text-[hsl(var(--trophy-bronze))]"
      : "text-foreground/30";

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <Trophy className={colorClass} size={size} strokeWidth={2.5} />
      <span className="absolute text-xs font-semibold select-none" aria-hidden>
        {rank}
      </span>
    </div>
  );
};

export default TableRankCup;
