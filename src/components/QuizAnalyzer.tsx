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
import veinsReference from "@/assets/veins-reference.jpg";
import eyeChartReference from "@/assets/eye-chart-reference.png";
import hairChartReference from "@/assets/hair-chart-reference.jpg";

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
        <div className="space-y-8">
          <h3 className="text-xl font-bold text-foreground text-center mb-6">
            Let's Find Your Undertone ✨
          </h3>

          {/* Vein Reference Image */}
          <div className="mb-6">
            <div className="rounded-2xl overflow-hidden border border-border/30 shadow-lg">
              <img 
                src={veinsReference} 
                alt="Vein color undertone guide - Blue/purple veins indicate cool undertone, green veins indicate warm undertone, bluish-green indicates neutral" 
                className="w-full h-auto object-cover"
              />
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              📸 Compare your wrist veins with the reference above for accurate results!
            </p>
          </div>

          {/* Vein Color */}
          <div>
            <p className="text-foreground font-medium mb-2">What color do your veins look?</p>
            <p className="text-muted-foreground text-sm mb-4">Check the inside of your wrist in natural light 👀</p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "blue-purple", label: "Blue / Purple", color: "linear-gradient(135deg, #4a6cf7, #9b59b6)", emoji: "💜", desc: "Cool Undertone" },
                { value: "green", label: "Green / Olive", color: "linear-gradient(135deg, #27ae60, #2ecc71)", emoji: "💚", desc: "Warm Undertone" },
                { value: "mix", label: "Bluish-Green", color: "linear-gradient(135deg, #3498db, #2ecc71)", emoji: "💙💚", desc: "Neutral Undertone" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setQuizAnswers({ ...quizAnswers, veinColor: option.value as QuizAnswers["veinColor"] })}
                  className={`quiz-option flex flex-col items-center gap-2 p-4 ${quizAnswers.veinColor === option.value ? 'selected' : ''}`}
                >
                  <div 
                    className="w-16 h-16 rounded-full border-2 border-border/50 shadow-lg"
                    style={{ background: option.color }}
                  />
                  <span className="text-sm font-medium">{option.emoji} {option.label}</span>
                  <span className="text-xs text-muted-foreground">{option.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Jewelry Preference */}
          <div>
            <p className="text-foreground font-medium mb-2">Which jewelry looks better on you?</p>
            <p className="text-muted-foreground text-sm mb-4">Think about what makes your skin glow ✨</p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "silver", label: "Silver", color: "linear-gradient(135deg, #C0C0C0, #E8E8E8, #A8A8A8)", emoji: "🥈" },
                { value: "gold", label: "Gold", color: "linear-gradient(135deg, #FFD700, #FFA500, #B8860B)", emoji: "🥇" },
                { value: "both", label: "Both", color: "linear-gradient(135deg, #C0C0C0, #FFD700, #C0C0C0)", emoji: "💎" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setQuizAnswers({ ...quizAnswers, jewelryPreference: option.value as QuizAnswers["jewelryPreference"] })}
                  className={`quiz-option flex flex-col items-center gap-2 p-4 ${quizAnswers.jewelryPreference === option.value ? 'selected' : ''}`}
                >
                  <div 
                    className="w-16 h-16 rounded-full border-2 border-border/50 shadow-lg"
                    style={{ background: option.color }}
                  />
                  <span className="text-sm">{option.emoji} {option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sun Reaction */}
          <div>
            <p className="text-foreground font-medium mb-2">How does your skin react to the sun?</p>
            <p className="text-muted-foreground text-sm mb-4">Be honest, we won't judge! ☀️</p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "burns", label: "Burns quickly", emoji: "🔥", desc: "Lobster mode" },
                { value: "tans", label: "Tans easily", emoji: "🏖️", desc: "Beach babe" },
                { value: "both", label: "Burns then tans", emoji: "🌅", desc: "Best of both" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setQuizAnswers({ ...quizAnswers, sunReaction: option.value as QuizAnswers["sunReaction"] })}
                  className={`quiz-option flex flex-col items-center gap-2 p-4 ${quizAnswers.sunReaction === option.value ? 'selected' : ''}`}
                >
                  <span className="text-3xl">{option.emoji}</span>
                  <span className="text-sm font-medium">{option.label}</span>
                  <span className="text-xs text-muted-foreground">{option.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Eye Color */}
      {step === 2 && (
        <div>
          <h3 className="text-xl font-bold text-foreground text-center mb-2">
            What's Your Eye Color? 👁️
          </h3>
          <p className="text-muted-foreground text-sm text-center mb-6">
            Click on the eye color that matches yours best! ✨
          </p>

          {/* Eye Color Chart as Clickable Options */}
          <div className="relative rounded-2xl overflow-hidden border border-border/30 shadow-lg bg-white">
            <img 
              src={eyeChartReference} 
              alt="Eye color chart" 
              className="w-full h-auto object-contain"
            />
            {/* Overlay clickable buttons on the chart */}
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-1 p-2">
              {[
                { value: "warm-brown", label: "Brown" },
                { value: "blue", label: "Blue" },
                { value: "cool-green", label: "Green" },
                { value: "grey", label: "Black/Grey" },
                { value: "hazel", label: "Amber" },
                { value: "olive", label: "Hazel" },
                { value: "cool-brown", label: "Grey" },
                { value: "mixed", label: "Other" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setEyeColor(option.value as EyeColor)}
                  className={`rounded-xl transition-all duration-300 hover:bg-white/20 hover:ring-2 hover:ring-primary/50 ${
                    eyeColor === option.value 
                      ? 'bg-primary/30 ring-4 ring-primary shadow-lg' 
                      : 'bg-transparent'
                  }`}
                  title={option.label}
                />
              ))}
            </div>
          </div>
          
          {/* Selected indicator */}
          {eyeColor && (
            <p className="text-center mt-4 text-primary font-medium">
              ✓ Selected: {eyeColor.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </p>
          )}
        </div>
      )}

      {/* Step 3: Hair Color */}
      {step === 3 && (
        <div>
          <h3 className="text-xl font-bold text-foreground text-center mb-2">
            What's Your Natural Hair Color? 💇‍♀️
          </h3>
          <p className="text-muted-foreground text-sm text-center mb-6">
            Click on the hair color that matches your natural shade! 💅
          </p>

          {/* Hair Color Chart as Clickable Options */}
          <div className="relative rounded-2xl overflow-hidden border border-border/30 shadow-lg">
            <img 
              src={hairChartReference} 
              alt="Hair color chart" 
              className="w-full h-auto object-cover"
            />
            {/* Overlay clickable buttons on the chart - 2 rows of 5 columns */}
            <div className="absolute inset-0 grid grid-cols-5 grid-rows-2 gap-1 p-2">
              {[
                { value: "black", label: "1 - Black" },
                { value: "warm-black", label: "2 - Darkest Brown" },
                { value: "ashy-brown", label: "3 - Dark Brown" },
                { value: "golden-brown", label: "4 - Medium Brown" },
                { value: "copper", label: "5 - Light Brown" },
                { value: "auburn", label: "6 - Dark Blonde" },
                { value: "cool-blonde", label: "7 - Medium Blonde" },
                { value: "cool-blonde", label: "8 - Light Blonde" },
                { value: "cool-blonde", label: "9 - Very Light Blonde" },
                { value: "neutral", label: "10 - Lightest Blonde" },
              ].map((option, index) => (
                <button
                  key={index}
                  onClick={() => setHairColor(option.value as HairColor)}
                  className={`rounded-lg transition-all duration-300 hover:bg-white/20 hover:ring-2 hover:ring-primary/50 ${
                    hairColor === option.value 
                      ? 'bg-primary/30 ring-4 ring-primary shadow-lg' 
                      : 'bg-transparent'
                  }`}
                  title={option.label}
                />
              ))}
            </div>
          </div>
          
          {/* Selected indicator */}
          {hairColor && (
            <p className="text-center mt-4 text-primary font-medium">
              ✓ Selected: {hairColor.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </p>
          )}
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
