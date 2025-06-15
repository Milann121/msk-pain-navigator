
import React from "react";
import { Switch } from "@/components/ui/switch";

interface ExerciseGoodToggleProps {
  value: "good" | "not-good";
  onChange: (value: "good" | "not-good") => void;
}

export const ExerciseGoodToggle = ({ value, onChange }: ExerciseGoodToggleProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className={value === "good" ? "text-green-700 font-medium" : "text-gray-700"}>
        Áno
      </span>
      <Switch
        checked={value === "not-good"}
        onCheckedChange={(checked) => onChange(checked ? "not-good" : "good")}
        aria-label="Toggle exercise feedback"
        className="!bg-gray-200 data-[state=checked]:!bg-red-500"
      />
      <span className={value === "not-good" ? "text-red-700 font-medium" : "text-gray-700"}>
        Nie
      </span>
    </div>
  );
};
