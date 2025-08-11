import React from "react";

interface Props {
  rank: number;
  size?: "sm" | "md";
}

const RankMedal: React.FC<Props> = ({ rank, size = "md" }) => {
  const sizeClass = size === "sm" ? "text-base" : "text-xl";
  if (rank === 1) return <span className={sizeClass} role="img" aria-label="Gold medal">🥇</span>;
  if (rank === 2) return <span className={sizeClass} role="img" aria-label="Silver medal">🥈</span>;
  if (rank === 3) return <span className={sizeClass} role="img" aria-label="Bronze medal">🥉</span>;
  return <span className="font-semibold">{rank}</span>;
};

export default RankMedal;
