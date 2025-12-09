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
          <p className="text-muted-foreground text-sm text-center mb-4">
            Pick the one that matches yours best - your windows to the soul! ✨
          </p>
          
          {/* Eye Color Reference Chart */}
          <div className="mb-6">
            <div className="rounded-2xl overflow-hidden border border-border/30 shadow-lg bg-white">
              <img 
                src={eyeChartReference} 
                alt="Eye color chart showing brown, blue, green, black, amber, hazel, grey and various shades for accurate comparison" 
                className="w-full h-auto object-contain max-h-80 mx-auto"
              />
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              📸 Use this chart to find your exact eye color match!
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "grey", label: "Grey", color: "#808080", ring: "#A0A0A0" },
              { value: "blue", label: "Blue", color: "#4A90D9", ring: "#6BB3F0" },
              { value: "cool-brown", label: "Cool Brown", color: "#5D4037", ring: "#8D6E63" },
              { value: "cool-green", label: "Cool Green", color: "#2E7D32", ring: "#4CAF50" },
              { value: "warm-brown", label: "Warm Brown", color: "#8B4513", ring: "#CD853F" },
              { value: "hazel", label: "Hazel", color: "#8E7618", ring: "#9E8E2C" },
              { value: "olive", label: "Olive", color: "#556B2F", ring: "#6B8E23" },
              { value: "mixed", label: "Mixed / Not sure", color: "linear-gradient(135deg, #4A90D9, #8E7618)", ring: "#888" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setEyeColor(option.value as EyeColor)}
                className={`quiz-option flex flex-col items-center gap-3 p-4 ${eyeColor === option.value ? 'selected' : ''}`}
              >
                {/* Eye illustration */}
                <div className="relative w-16 h-10">
                  {/* Eye white */}
                  <div className="absolute inset-0 bg-white rounded-[50%] shadow-inner border border-border/30" />
                  {/* Iris */}
                  <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full"
                    style={{ 
                      background: option.color.includes('gradient') ? option.color : `radial-gradient(circle, ${option.ring} 0%, ${option.color} 70%)`,
                    }}
                  />
                  {/* Pupil */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-black" />
                  {/* Light reflection */}
                  <div className="absolute top-[35%] left-[55%] w-1.5 h-1.5 rounded-full bg-white/80" />
                </div>
                <span className="text-sm font-medium">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Hair Color */}
      {step === 3 && (
        <div>
          <h3 className="text-xl font-bold text-foreground text-center mb-2">
            What's Your Natural Hair Color? 💇‍♀️
          </h3>
          <p className="text-muted-foreground text-sm text-center mb-4">
            Think about your natural color (not the dye job, bestie!) 💅
          </p>
          
          {/* Hair Color Reference Chart */}
          <div className="mb-6">
            <div className="rounded-2xl overflow-hidden border border-border/30 shadow-lg">
              <img 
                src={hairChartReference} 
                alt="Hair color chart showing black, dark brown, light brown, copper, blonde and various shades for accurate comparison" 
                className="w-full h-auto object-cover"
              />
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              📸 Match your natural hair color with this reference chart!
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "ashy-brown", label: "Ashy Brown", color: "#6B5B4F", highlight: "#8B7B6F" },
              { value: "black", label: "Black", color: "#1a1a1a", highlight: "#333333" },
              { value: "cool-blonde", label: "Cool Blonde", color: "#C4B7A6", highlight: "#E8DFD0" },
              { value: "golden-brown", label: "Golden Brown", color: "#8B6914", highlight: "#C4961A" },
              { value: "copper", label: "Copper / Red", color: "#B7410E", highlight: "#DA5D1E" },
              { value: "warm-black", label: "Warm Black", color: "#2C1810", highlight: "#4A3020" },
              { value: "auburn", label: "Auburn", color: "#922724", highlight: "#A52A2A" },
              { value: "neutral", label: "Neutral / Not sure", color: "#696969", highlight: "#888888" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setHairColor(option.value as HairColor)}
                className={`quiz-option flex flex-col items-center gap-3 p-4 ${hairColor === option.value ? 'selected' : ''}`}
              >
                {/* Hair swatch illustration */}
                <div className="relative w-14 h-16">
                  {/* Hair strands */}
                  <svg viewBox="0 0 56 64" className="w-full h-full">
                    {/* Multiple hair strands with gradient */}
                    <defs>
                      <linearGradient id={`hair-${option.value}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={option.highlight} />
                        <stop offset="50%" stopColor={option.color} />
                        <stop offset="100%" stopColor={option.color} />
                      </linearGradient>
                    </defs>
                    {/* Wavy hair strands */}
                    <path d="M8 0 Q12 16, 8 32 Q4 48, 8 64" fill="none" stroke={`url(#hair-${option.value})`} strokeWidth="4" strokeLinecap="round" />
                    <path d="M18 0 Q22 16, 18 32 Q14 48, 18 64" fill="none" stroke={`url(#hair-${option.value})`} strokeWidth="4" strokeLinecap="round" />
                    <path d="M28 0 Q32 16, 28 32 Q24 48, 28 64" fill="none" stroke={`url(#hair-${option.value})`} strokeWidth="4" strokeLinecap="round" />
                    <path d="M38 0 Q42 16, 38 32 Q34 48, 38 64" fill="none" stroke={`url(#hair-${option.value})`} strokeWidth="4" strokeLinecap="round" />
                    <path d="M48 0 Q52 16, 48 32 Q44 48, 48 64" fill="none" stroke={`url(#hair-${option.value})`} strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-sm font-medium">{option.label}</span>
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
