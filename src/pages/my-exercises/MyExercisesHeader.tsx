import React from "react";
import { useTranslation } from "react-i18next";

export const MyExercisesHeader = () => {
  const { t } = useTranslation();
  return (
    <h1 className="text-3xl font-bold text-blue-800 mb-6">
      {t("myExercises.title")}
    </h1>
  );
};
