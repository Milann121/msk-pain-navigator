import React from "react";
interface Props {
  rank: number | null;
}
const RankSquare: React.FC<Props> = ({
  rank
}) => {
  return <div className="w-20 h-20 rounded-md border flex items-center justify-center bg-blue-600">
      <span className="font-bold leading-none text-3xl text-slate-50">
        {rank ?? "–"}
      </span>
    </div>;
};
export default RankSquare;