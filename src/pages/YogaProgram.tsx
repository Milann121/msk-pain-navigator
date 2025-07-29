import React from "react";
import { useParams, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { YogaProgramIntro } from "@/components/yoga/YogaProgramIntro";
import { yogaPrograms } from "@/data/yogaPrograms";

const YogaProgram: React.FC = () => {
  const { programId } = useParams<{ programId: string }>();
  
  if (!programId || !yogaPrograms[programId as keyof typeof yogaPrograms]) {
    return <Navigate to="/yoga" replace />;
  }

  const program = yogaPrograms[programId as keyof typeof yogaPrograms];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <YogaProgramIntro program={program} />
      <Footer />
    </div>
  );
};

export default YogaProgram;