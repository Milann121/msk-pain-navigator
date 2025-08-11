import React from "react";

interface Props {
  rank: number | null;
}

const RankSquare: React.FC<Props> = ({ rank }) => {
  return (
    <div className="w-20 h-20 rounded-md border bg-muted/30 flex items-center justify-center">
      <span className="text-3xl font-bold leading-none text-foreground">
        {rank ?? "–"}
      </span>
    </div>
  );
};

export default RankSquare;
