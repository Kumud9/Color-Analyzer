import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProgressIndicator from "./ProgressIndicator";
import { 
  UndertoneType, 
  EyeColor, 
  HairColor, 
  QuizAnswers,
  determineUndertone 
} from "@/types/colorAnalysis";

interface QuizAnalyzerProps {
  onComplete: (undertone: UndertoneType, eyeColor: EyeColor | null, hairColor: HairColor | null) => void;
  onBack: () => void;
}

const QuizAnalyzer = ({ onComplete, onBack }: QuizAnalyzerProps) => {
  const [step, setStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({
    veinColor: null,
    jewelryPreference: null,
    sunReaction: null,
  });
  const [eyeColor, setEyeColor] = useState<EyeColor | null>(null);
  const [hairColor, setHairColor] = useState<HairColor | null>(null);

  const stepLabels = ["Undertone", "Eye Color", "Hair Color"];

  const getSkinUndertone = (): UndertoneType => {
    const { veinColor, jewelryPreference, sunReaction } = quizAnswers;
    
    let coolScore = 0;
    let warmScore = 0;
    
    if (veinColor === "blue-purple") coolScore++;
    else if (veinColor === "green") warmScore++;
    
    if (jewelryPreference === "silver") coolScore++;
    else if (jewelryPreference === "gold") warmScore++;
    
    if (sunReaction === "burns") coolScore++;
    else if (sunReaction === "tans") warmScore++;
    
    if (coolScore > warmScore) return "cool";
    if (warmScore > coolScore) return "warm";
    return "neutral";
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      const skinUndertone = getSkinUndertone();
      const finalUndertone = determineUndertone(skinUndertone, eyeColor, hairColor);
      onComplete(finalUndertone, eyeColor, hairColor);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const canProceed = () => {
    if (step === 1) {
      return quizAnswers.veinColor && quizAnswers.jewelryPreference && quizAnswers.sunReaction;
    }
    if (step === 2) return eyeColor !== null;
    if (step === 3) return hairColor !== null;
    return false;
  };

  return (
    <div className="max-w-2xl mx-auto">
      <ProgressIndicator currentStep={step} totalSteps={3} stepLabels={stepLabels} />

      {/* Step 1: Undertone Quiz */}
      {step === 1 && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-foreground text-center mb-6">
            Let's Find Your Undertone
          </h3>

          {/* Vein Color */}
          <div>
            <p className="text-foreground font-medium mb-3">What color do your veins look?</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "blue-purple", label: "Blue / Purple" },
                { value: "green", label: "Green" },
                { value: "mix", label: "Mix of both" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setQuizAnswers({ ...quizAnswers, veinColor: option.value as QuizAnswers["veinColor"] })}
                  className={`quiz-option ${quizAnswers.veinColor === option.value ? 'selected' : ''}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Jewelry Preference */}
          <div>
            <p className="text-foreground font-medium mb-3">Which jewelry looks better on you?</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "silver", label: "Silver" },
                { value: "gold", label: "Gold" },
                { value: "both", label: "Both" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setQuizAnswers({ ...quizAnswers, jewelryPreference: option.value as QuizAnswers["jewelryPreference"] })}
                  className={`quiz-option ${quizAnswers.jewelryPreference === option.value ? 'selected' : ''}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sun Reaction */}
          <div>
            <p className="text-foreground font-medium mb-3">How does your skin react to the sun?</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "burns", label: "Burns quickly" },
                { value: "tans", label: "Tans easily" },
                { value: "both", label: "Burns then tans" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setQuizAnswers({ ...quizAnswers, sunReaction: option.value as QuizAnswers["sunReaction"] })}
                  className={`quiz-option ${quizAnswers.sunReaction === option.value ? 'selected' : ''}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Eye Color */}
      {step === 2 && (
        <div>
          <h3 className="text-xl font-bold text-foreground text-center mb-6">
            What's Your Eye Color?
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
                onClick={() => setEyeColor(option.value as EyeColor)}
                className={`quiz-option ${eyeColor === option.value ? 'selected' : ''}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Hair Color */}
      {step === 3 && (
        <div>
          <h3 className="text-xl font-bold text-foreground text-center mb-6">
            What's Your Natural Hair Color?
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
                onClick={() => setHairColor(option.value as HairColor)}
                className={`quiz-option ${hairColor === option.value ? 'selected' : ''}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button variant="ghost" onClick={handleBack}>
          ← Back
        </Button>
        <Button 
          variant="hero" 
          onClick={handleNext}
          disabled={!canProceed()}
        >
          {step === 3 ? "See My Results" : "Next →"}
        </Button>
      </div>
    </div>
  );
};

export default QuizAnalyzer;
