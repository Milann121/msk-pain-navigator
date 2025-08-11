import React from "react";
import { Button } from "@/components/ui/button";


export type ReactionType = "like" | "feel" | "angry";

interface ReactionsBarProps {
  counts: Record<ReactionType, number>;
  myReaction: ReactionType | null;
  onReact: (type: ReactionType) => void;
}

const ReactionsBar: React.FC<ReactionsBarProps> = ({ counts, myReaction, onReact }) => {
  const baseBtn = "h-8 px-3 rounded-md border";
  return (
    <div className="mt-2 flex items-center gap-2">
      <Button
        type="button"
        aria-label="Like it"
        variant={myReaction === "like" ? "default" : "outline"}
        className={`${baseBtn}`}
        onClick={() => onReact("like")}
      >
        <span className="text-base" role="img" aria-hidden>👍</span>
        <span className="ml-1 text-sm">{counts.like || 0}</span>
      </Button>
      <Button
        type="button"
        aria-label="Feel it"
        variant={myReaction === "feel" ? "default" : "outline"}
        className={`${baseBtn}`}
        onClick={() => onReact("feel")}
      >
        <span className="text-base" role="img" aria-hidden>❤️</span>
        <span className="ml-1 text-sm">{counts.feel || 0}</span>
      </Button>
      <Button
        type="button"
        aria-label="Angry"
        variant={myReaction === "angry" ? "default" : "outline"}
        className={`${baseBtn}`}
        onClick={() => onReact("angry")}
      >
        <span className="text-base" role="img" aria-hidden>😡</span>
        <span className="ml-1 text-sm">{counts.angry || 0}</span>
      </Button>
    </div>
  );
};

export default ReactionsBar;
