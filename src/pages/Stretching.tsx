import React from "react";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";

const Stretching = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gradient-to-b from-blue-50 to-white py-10 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold text-blue-900 mb-8">
            {t('stretching.title')}
          </h1>
          <div className="text-gray-600">
            {t('stretching.content')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stretching;