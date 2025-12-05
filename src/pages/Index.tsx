import { useState } from "react";
import HeaderBar from "@/components/HeaderBar";
import HeroSection from "@/components/HeroSection";
import ExplainerSection from "@/components/ExplainerSection";
import AnalysisSection from "@/components/AnalysisSection";
import ResultsSection from "@/components/ResultsSection";
import ColorCheckTool from "@/components/ColorCheckTool";
import HowToUseSection from "@/components/HowToUseSection";
import { UndertoneType, EyeColor, HairColor } from "@/types/colorAnalysis";

type AppView = "home" | "analysis" | "results" | "color-check";

const Index = () => {
  const [view, setView] = useState<AppView>("home");
  const [method, setMethod] = useState<"photo" | "quiz" | null>(null);
  const [results, setResults] = useState<{
    undertone: UndertoneType;
    eyeColor: EyeColor | null;
    hairColor: HairColor | null;
  } | null>(null);

  const handleSelectMethod = (selectedMethod: "photo" | "quiz") => {
    setMethod(selectedMethod);
    setView("analysis");
  };

  const handleAnalysisComplete = (
    undertone: UndertoneType, 
    eyeColor: EyeColor | null, 
    hairColor: HairColor | null
  ) => {
    setResults({ undertone, eyeColor, hairColor });
    setView("results");
  };

  const handleReset = () => {
    setView("home");
    setMethod(null);
    setResults(null);
  };

  const handleColorCheck = () => {
    setView("color-check");
  };

  const handleBackToResults = () => {
    setView("results");
  };

  return (
    <main className="min-h-screen bg-background">
      <HeaderBar />
      
      {view === "home" && (
        <>
          <HeroSection onSelectMethod={handleSelectMethod} />
          <ExplainerSection />
          <HowToUseSection />
        </>
      )}

      {view === "analysis" && method && (
        <AnalysisSection 
          method={method}
          onComplete={handleAnalysisComplete}
          onBack={handleReset}
        />
      )}

      {view === "results" && results && (
        <>
          <ResultsSection 
            undertone={results.undertone}
            eyeColor={results.eyeColor}
            hairColor={results.hairColor}
            onReset={handleReset}
            onColorCheck={handleColorCheck}
          />
          <HowToUseSection />
        </>
      )}

      {view === "color-check" && results && (
        <ColorCheckTool 
          undertone={results.undertone}
          onBack={handleBackToResults}
        />
      )}

      {/* Footer */}
      <footer className="py-6 px-4 bg-navy-dark border-t border-border">
        <p className="text-center text-muted-foreground text-sm">
          © 2024 Color Analyzer · AI-Powered Fashion Analysis
        </p>
      </footer>
    </main>
  );
};

export default Index;
