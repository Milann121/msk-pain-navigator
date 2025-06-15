
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ExerciseGoodToggleProps {
  value: "good" | "not-good";
  onChange: (value: "good" | "not-good") => void;
}

/**
 * ExerciseGoodToggle: A visually centered toggle for "Áno" and "Nie".
 * Utilizes RadioGroup for accessibility and improved clarity.
 */
export const ExerciseGoodToggle = ({
  value,
  onChange,
}: ExerciseGoodToggleProps) => {
  return (
    <RadioGroup
      value={value}
      onValueChange={(val: "good" | "not-good") => onChange(val)}
      className="flex items-center justify-center gap-6"
      aria-label="Vyhovuje vám cvik?"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="good"
          id="good"
          className="peer"
        />
        <label
          htmlFor="good"
          className={`cursor-pointer select-none text-base font-medium ${
            value === "good" ? "text-green-700 font-bold" : "text-gray-700"
          }`}
        >
          Áno
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="not-good"
          id="not-good"
          className="peer"
        />
        <label
          htmlFor="not-good"
          className={`cursor-pointer select-none text-base font-medium ${
            value === "not-good" ? "text-red-700 font-bold" : "text-gray-700"
          }`}
        >
          Nie
        </label>
      </div>
    </RadioGroup>
  );
};
