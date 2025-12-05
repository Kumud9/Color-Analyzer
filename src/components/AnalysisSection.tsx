import { useState } from "react";
import PhotoAnalyzer from "./PhotoAnalyzer";
import QuizAnalyzer from "./QuizAnalyzer";
import { UndertoneType, EyeColor, HairColor } from "@/types/colorAnalysis";

interface AnalysisSectionProps {
  method: "photo" | "quiz";
  onComplete: (undertone: UndertoneType, eyeColor: EyeColor | null, hairColor: HairColor | null) => void;
  onBack: () => void;
}

const AnalysisSection = ({ method, onComplete, onBack }: AnalysisSectionProps) => {
  const [photoUndertone, setPhotoUndertone] = useState<UndertoneType | null>(null);
  const [step, setStep] = useState<"photo" | "eyes" | "hair">("photo");
  const [eyeColor, setEyeColor] = useState<EyeColor | null>(null);

  const handlePhotoAnalysis = (undertone: UndertoneType) => {
    setPhotoUndertone(undertone);
    setStep("eyes");
  };

  if (method === "photo") {
    if (step === "photo") {
      return (
        <section className="py-16 px-4 bg-navy-dark min-h-[60vh]">
          <PhotoAnalyzer onAnalyze={handlePhotoAnalysis} onBack={onBack} />
        </section>
      );
    }

    // After photo analysis, show eye and hair selection
    return (
      <section className="py-16 px-4 bg-navy-dark min-h-[60vh]">
        <div className="max-w-2xl mx-auto">
          {step === "eyes" && (
            <div>
              <h3 className="text-xl font-bold text-foreground text-center mb-6">
                Now, what's your eye color?
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {[
                  { value: "grey", label: "Grey" },
                  { value: "blue", label: "Blue" },
                  { value: "cool-brown", label: "Cool Brown" },
                  { value: "cool-green", label: "Cool Green" },
                  { value: "warm-brown", label: "Warm Brown" },
                  { value: "hazel", label: "Hazel" },
                  { value: "olive", label: "Olive" },
                  { value: "mixed", label: "Mixed / Not sure" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setEyeColor(option.value as EyeColor);
                      setStep("hair");
                    }}
                    className="quiz-option"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === "hair" && (
            <div>
              <h3 className="text-xl font-bold text-foreground text-center mb-6">
                And your natural hair color?
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {[
                  { value: "ashy-brown", label: "Ashy Brown" },
                  { value: "black", label: "Black" },
                  { value: "cool-blonde", label: "Cool Blonde" },
                  { value: "golden-brown", label: "Golden Brown" },
                  { value: "copper", label: "Copper / Red" },
                  { value: "warm-black", label: "Warm Black" },
                  { value: "auburn", label: "Auburn" },
                  { value: "neutral", label: "Neutral / Not sure" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      if (photoUndertone) {
                        onComplete(photoUndertone, eyeColor, option.value as HairColor);
                      }
                    }}
                    className="quiz-option"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
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
