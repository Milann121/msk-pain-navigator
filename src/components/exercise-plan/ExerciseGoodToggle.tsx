
import React from "react";
import { useTranslation } from "react-i18next";

interface ExerciseGoodToggleProps {
  // Add "neutral" as a possible value
  value: "good" | "neutral" | "not-good";
  onChange: (value: "good" | "neutral" | "not-good") => void;
}

export const ExerciseGoodToggle = ({
  value,
  onChange,
}: ExerciseGoodToggleProps) => {
  const { t } = useTranslation();
  // Determine slider position
  const getThumbPosition = () => {
    switch (value) {
      case "good":
        return "left-1";
      case "neutral":
        return "left-1/2 -translate-x-1/2";
      case "not-good":
        return "right-1";
      default:
        return "left-1/2 -translate-x-1/2";
    }
  };

  return (
    <div className="flex items-center gap-2 min-w-[220px]">
      <span
        className={`${
          value === "good" ? "text-green-700 font-medium" : "text-gray-700"
        }`}
      >
        {t('exercisePlan.yes')}
      </span>
      {/* Custom 3-position toggle */}
      <div className="relative w-20 h-7 mx-1">
        <div className="absolute inset-0 rounded-full bg-gray-200" />
        {/* Thumb */}
        <button
          aria-label={t('exercisePlan.moveLabel')}
          type="button"
          className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full transition-all duration-200
            shadow bg-white border-2 ${
              value === "good"
                ? "border-green-500"
                : value === "not-good"
                ? "border-red-500"
                : "border-gray-300"
            } z-10`}
          style={{
            // custom logic for thumb placement: 0%, 50%, 100%
            left:
              value === "good"
                ? "2px"
                : value === "neutral"
                ? "50%"
                : "calc(100% - 26px)", // 26px = thumb width (24) + margin (2)
            transform:
              value === "good"
                ? "translateY(-50%)"
                : value === "neutral"
                ? "translate(-50%, -50%)"
                : "translateY(-50%)",
          }}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft" || e.key === "a") {
              if (value === "not-good") onChange("neutral");
              else if (value === "neutral") onChange("good");
            } else if (e.key === "ArrowRight" || e.key === "d") {
              if (value === "good") onChange("neutral");
              else if (value === "neutral") onChange("not-good");
            }
          }}
          onClick={() => {
            // Clicking advances through the states
            if (value === "good") onChange("neutral");
            else if (value === "neutral") onChange("not-good");
            else onChange("good");
          }}
        />
        {/* Hit areas for click/tap */}
        <div className="absolute w-1/3 h-full left-0 top-0 z-0" onClick={() => onChange("good")} />
        <div className="absolute w-1/3 h-full left-1/3 top-0 z-0" onClick={() => onChange("neutral")} />
        <div className="absolute w-1/3 h-full right-0 top-0 z-0" onClick={() => onChange("not-good")} />
      </div>
      <span
        className={`${
          value === "not-good" ? "text-red-700 font-medium" : "text-gray-700"
        }`}
      >
        {t('exercisePlan.no')}
      </span>
    </div>
  );
};
