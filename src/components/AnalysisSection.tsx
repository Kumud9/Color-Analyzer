import PhotoAnalyzer from "./PhotoAnalyzer";
import QuizAnalyzer from "./QuizAnalyzer";
import { UndertoneType, EyeColor, HairColor } from "@/types/colorAnalysis";

interface AnalysisSectionProps {
  method: "photo" | "quiz";
  onComplete: (undertone: UndertoneType, eyeColor: EyeColor | null, hairColor: HairColor | null) => void;
  onBack: () => void;
}

const AnalysisSection = ({ method, onComplete, onBack }: AnalysisSectionProps) => {
  // Photo method - directly goes to results after analysis
  const handlePhotoAnalysis = (undertone: UndertoneType) => {
    onComplete(undertone, null, null);
  };

  if (method === "photo") {
    return (
      <section className="py-16 px-4 bg-navy-dark min-h-[60vh]">
        <PhotoAnalyzer onAnalyze={handlePhotoAnalysis} onBack={onBack} />
      </section>
    );
  }

  // Quiz method
  return (
    <section className="py-16 px-4 bg-navy-dark min-h-[60vh]">
      <QuizAnalyzer onComplete={onComplete} onBack={onBack} />
    </section>
  );
};

export default AnalysisSection;
