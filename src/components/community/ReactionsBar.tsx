import React from "react";
import { Button } from "@/components/ui/button";
import { Heart, ThumbsUp, Angry } from "lucide-react";

export type ReactionType = "like" | "feel" | "angry";

interface ReactionsBarProps {
  counts: Record<ReactionType, number>;
  myReaction: ReactionType | null;
  onReact: (type: ReactionType) => void;
}

const iconCls = "w-4 h-4";

const ReactionsBar: React.FC<ReactionsBarProps> = ({ counts, myReaction, onReact }) => {
  const baseBtn = "h-8 px-3 rounded-md border";
  return (
    <div className="mt-2 flex items-center gap-2">
      <Button
        type="button"
        variant={myReaction === "like" ? "default" : "outline"}
        className={`${baseBtn}`}
        onClick={() => onReact("like")}
      >
        <ThumbsUp className={iconCls} />
        <span className="ml-1 text-sm">{counts.like || 0}</span>
      </Button>
      <Button
        type="button"
        variant={myReaction === "feel" ? "default" : "outline"}
        className={`${baseBtn}`}
        onClick={() => onReact("feel")}
      >
        <Heart className={iconCls} />
        <span className="ml-1 text-sm">{counts.feel || 0}</span>
      </Button>
      <Button
        type="button"
        variant={myReaction === "angry" ? "default" : "outline"}
        className={`${baseBtn}`}
        onClick={() => onReact("angry")}
      >
        <Angry className={iconCls} />
        <span className="ml-1 text-sm">{counts.angry || 0}</span>
      </Button>
    </div>
  );
};

export default ReactionsBar;
