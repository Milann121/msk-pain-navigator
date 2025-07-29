import React from "react";
import { useParams, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { StretchingProgramIntro } from "@/components/stretching/StretchingProgramIntro";
import { stretchingPrograms } from "@/data/stretchingPrograms";

const StretchingProgram: React.FC = () => {
  const { programId } = useParams<{ programId: string }>();
  
  if (!programId || !stretchingPrograms[programId as keyof typeof stretchingPrograms]) {
    return <Navigate to="/stretching" replace />;
  }

  const program = stretchingPrograms[programId as keyof typeof stretchingPrograms];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <StretchingProgramIntro program={program} />
      <Footer />
    </div>
  );
};

export default StretchingProgram;