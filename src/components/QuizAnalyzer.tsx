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
import veinsChart from "@/assets/veins-chart.png";
import eyeChart from "@/assets/eye-chart.png";
import hairChart from "@/assets/hair-chart.png";

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

  // Undertone options based on vein chart
  const undertoneOptions = [
    { value: "blue-purple", label: "Cool", desc: "Blue/Purple Veins" },
    { value: "mix", label: "Neutral", desc: "Bluish-Green Veins" },
    { value: "green", label: "Warm", desc: "Green/Olive Veins" },
  ];

  // Eye color options matching the chart
  const eyeColorOptions = [
    { value: "warm-brown", label: "Brown" },
    { value: "blue", label: "Blue" },
    { value: "cool-green", label: "Green" },
    { value: "grey", label: "Black" },
    { value: "hazel", label: "Hazel" },
    { value: "olive", label: "Amber" },
    { value: "cool-brown", label: "Grey" },
    { value: "mixed", label: "Dark Blue" },
  ];

  // Hair color options matching the chart
  const hairColorOptions = [
    { value: "black", label: "Black" },
    { value: "warm-black", label: "Dark Brown" },
    { value: "ashy-brown", label: "Light Ash Brown" },
    { value: "copper", label: "Medium Copper" },
    { value: "golden-brown", label: "Medium Blonde" },
    { value: "auburn", label: "Blonde Red" },
    { value: "red", label: "Deep Red" },
    { value: "cool-blonde", label: "Light Ash Blonde" },
    { value: "platinum", label: "Very Light Blonde" },
    { value: "neutral", label: "Extreme Blonde" },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <ProgressIndicator currentStep={step} totalSteps={3} stepLabels={stepLabels} />

      {/* Step 1: Undertone Quiz */}
      {step === 1 && (
        <div className="space-y-8">
          <h3 className="text-xl font-bold text-foreground text-center mb-6">
            Let's Find Your Undertone ✨
          </h3>

          {/* Vein Reference Chart - Clickable */}
          <div>
            <p className="text-foreground font-medium mb-2 text-center">Compare your wrist veins & select your undertone</p>
            <p className="text-muted-foreground text-sm text-center mb-4">Check your inner wrist in natural light 👀</p>
            
            <div className="rounded-2xl overflow-hidden border border-border/30 shadow-lg mb-4">
              <img 
                src={veinsChart} 
                alt="Vein color undertone guide" 
                className="w-full h-auto object-cover"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {undertoneOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setQuizAnswers({ ...quizAnswers, veinColor: option.value as QuizAnswers["veinColor"] })}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    quizAnswers.veinColor === option.value 
                      ? 'border-primary bg-primary/10 shadow-lg scale-105' 
                      : 'border-border/50 hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  <span className="text-sm font-bold block">{option.label}</span>
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
                    className="w-14 h-14 rounded-full border-2 border-border/50 shadow-lg"
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
            Use the chart as reference, then click to select ✨
          </p>

          {/* Eye Color Chart Reference */}
          <div className="rounded-2xl overflow-hidden border border-border/30 shadow-lg mb-6 bg-[#1a1a1a]">
            <img 
              src={eyeChart} 
              alt="Eye color reference chart" 
              className="w-full h-auto object-contain"
            />
          </div>
          
          {/* Eye Color Buttons */}
          <div className="grid grid-cols-4 gap-3">
            {eyeColorOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setEyeColor(option.value as EyeColor)}
                className={`p-3 rounded-xl border-2 transition-all duration-300 text-center ${
                  eyeColor === option.value 
                    ? 'border-primary bg-primary/10 shadow-lg scale-105' 
                    : 'border-border/50 hover:border-primary/50 hover:bg-muted/50'
                }`}
              >
                <span className="text-sm font-medium">{option.label}</span>
              </button>
            ))}
          </div>
          
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
            Use the chart as reference, then click to select 💅
          </p>

          {/* Hair Color Chart Reference */}
          <div className="rounded-2xl overflow-hidden border border-border/30 shadow-lg mb-6 bg-[#1a1a1a]">
            <img 
              src={hairChart} 
              alt="Hair color reference chart" 
              className="w-full h-auto object-contain"
            />
          </div>
          
          {/* Hair Color Buttons */}
          <div className="grid grid-cols-5 gap-3">
            {hairColorOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setHairColor(option.value as HairColor)}
                className={`p-3 rounded-xl border-2 transition-all duration-300 text-center ${
                  hairColor === option.value 
                    ? 'border-primary bg-primary/10 shadow-lg scale-105' 
                    : 'border-border/50 hover:border-primary/50 hover:bg-muted/50'
                }`}
              >
                <span className="text-xs font-medium">{option.label}</span>
              </button>
            ))}
          </div>
          
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
