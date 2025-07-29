import React from "react";
import { useParams, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { StrengthProgramIntro } from "@/components/strength/StrengthProgramIntro";
import { strengthPrograms } from "@/data/strengthPrograms";

const StrengthProgram: React.FC = () => {
  const { programId } = useParams<{ programId: string }>();
  
  if (!programId || !strengthPrograms[programId as keyof typeof strengthPrograms]) {
    return <Navigate to="/strength" replace />;
  }

  const program = strengthPrograms[programId as keyof typeof strengthPrograms];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <StrengthProgramIntro program={program} />
      <Footer />
    </div>
  );
};

export default StrengthProgram;