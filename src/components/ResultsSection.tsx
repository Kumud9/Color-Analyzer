import { Snowflake, Flame, Moon, Sparkles, AlertTriangle, CircleDot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  UndertoneType, 
  EyeColor, 
  HairColor,
  getPalette,
  ColorInfo,
  MetalInfo
} from "@/types/colorAnalysis";
import ToneAnimation from "./ToneAnimation";

interface ResultsSectionProps {
  undertone: UndertoneType;
  eyeColor: EyeColor | null;
  hairColor: HairColor | null;
  onReset: () => void;
  onColorCheck: () => void;
}

const UndertoneDescriptions = {
  cool: {
    icon: Snowflake,
    badge: "❄️ COOL TONE",
    title: "You're a Cool Tone!",
    tagline: "Ice queen energy! ❄️✨ You were born to slay in silvers and jewel tones, bestie!",
    description: "Your coloring has blue-based undertones. Think pink, red, or blue hues in your skin. Silver jewelry makes you shine, and you probably burn before you tan. Cool tones look stunning in icy blues, jewel tones, and crisp whites.",
    sassyQuotes: [
      "You + silver jewelry = main character vibes 💎",
      "The sun said 'burn baby burn' and you said 'fine, I'll look ethereal anyway' ☀️🔥",
      "Blue undertones? More like 'always looking expensive' undertones 💅",
    ],
    traits: [
      "Skin has pink/red/blue undertones",
      "Veins look blue or purple",
      "Silver jewelry suits you more",
      "Burns faster in the sun",
    ],
  },
  warm: {
    icon: Flame,
    badge: "🔥 WARM TONE",
    title: "You're a Warm Tone!",
    tagline: "Golden hour is YOUR hour, honey! 🌅✨ You're basically a walking sunset!",
    description: "Your coloring has yellow-based undertones. Think golden, peachy, or olive hues in your skin. Gold jewelry makes you glow, and you tan easily. Warm tones look amazing in earthy colors, warm neutrals, and rich autumn shades.",
    sassyQuotes: [
      "Gold jewelry on you? That's not drip, that's a FLOOD 🌊👑",
      "The sun literally loves you - tanning like it's your full-time job ☀️😎",
      "Warm undertones = naturally glowing without highlighter 💫",
    ],
    traits: [
      "Skin has yellow/golden/peach undertones",
      "Veins look greenish",
      "Gold jewelry looks better",
      "Tans easily in the sun",
    ],
  },
  neutral: {
    icon: Moon,
    badge: "🌓 NEUTRAL TONE",
    title: "You're a Neutral Tone!",
    tagline: "The ultimate chameleon! 🦎✨ You can literally pull off ANYTHING, and that's iconic!",
    description: "Lucky you! Your coloring doesn't lean strongly warm or cool. You can rock both silver and gold, and look good in a wide range of colors. Stick to muted, balanced shades that aren't too extreme in either direction.",
    sassyQuotes: [
      "Silver or gold? YES. Both look fire on you 🔥💅",
      "You're the 'I woke up like this' of undertones 💁‍♀️",
      "Balanced skin = maximum fashion flexibility 🎨👗",
    ],
    traits: [
      "Skin doesn't lean clearly warm or cool",
      "Veins look a mix of blue + green",
      "Both silver and gold look good",
      "Skin looks different in different lighting",
    ],
  },
};

const ColorChip = ({ color }: { color: ColorInfo }) => (
  <div className="flex flex-col items-center gap-2">
    <div 
      className="color-chip border border-border/50"
      style={{ backgroundColor: color.hex }}
    />
    <span className="text-xs text-muted-foreground text-center">{color.name}</span>
  </div>
);

const MetalChip = ({ metal }: { metal: MetalInfo }) => (
  <div className="flex flex-col items-center gap-2">
    <div 
      className="color-chip border border-border/50"
      style={{ background: metal.gradient || metal.hex }}
    />
    <span className="text-xs text-muted-foreground text-center">{metal.name}</span>
  </div>
);

const ResultsSection = ({ undertone, eyeColor, hairColor, onReset, onColorCheck }: ResultsSectionProps) => {
  const info = UndertoneDescriptions[undertone];
  const palette = getPalette(undertone);
  const Icon = info.icon;

  return (
    <div className="py-16 px-4 bg-navy-dark relative overflow-hidden">
      {/* Tone-specific animation */}
      <ToneAnimation undertone={undertone} />
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Result Badge */}
        <div className="text-center mb-12">
          <div className="result-badge mb-6 mx-auto w-fit">
            <Icon className="w-6 h-6" />
            <span>{info.badge}</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 glow-text-aqua">
            {info.title}
          </h2>

          {/* Sassy Tagline */}
          <p className="text-xl md:text-2xl font-semibold text-aqua mb-4 italic">
            {info.tagline}
          </p>
          
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            {info.description}
          </p>

          {/* Sassy Quotes */}
          <div className="grid md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
            {info.sassyQuotes.map((quote, i) => (
              <div 
                key={i}
                className="p-4 rounded-xl bg-card/50 border border-aqua/30 text-sm text-foreground/90 italic"
              >
                "{quote}"
              </div>
            ))}
          </div>

          {/* Traits */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {info.traits.map((trait, i) => (
              <span 
                key={i}
                className="px-4 py-2 rounded-full bg-card border border-border text-sm text-foreground/80"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        {/* Color Palettes */}
        <div className="grid md:grid-cols-1 gap-8">
          {/* Fabulous Colors */}
          <div className="card-glow card-fabulous rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-aqua" />
              <h3 className="text-xl font-bold text-foreground">Fabulous Colors For You</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              These colors will make your skin look smooth, bright, and alive!
            </p>
            <div className="flex flex-wrap gap-4">
              {palette.fabulous.map((color, i) => (
                <ColorChip key={i} color={color} />
              ))}
            </div>
          </div>

          {/* Metals */}
          <div className="card-glow card-okay rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <CircleDot className="w-6 h-6 text-gold" />
              <h3 className="text-xl font-bold text-foreground">Metals That Love Your Skin</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              These metals will complement your undertone perfectly.
            </p>
            <div className="flex flex-wrap gap-4">
              {palette.metals.map((metal, i) => (
                <MetalChip key={i} metal={metal} />
              ))}
            </div>
          </div>

          {/* Colors to Avoid */}
          <div className="card-glow card-wrong rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-destructive" />
              <h3 className="text-xl font-bold text-foreground">Colors To Avoid</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              These colors might make you look dull, tired, or washed-out.
            </p>
            <div className="flex flex-wrap gap-4">
              {palette.avoid.map((color, i) => (
                <ColorChip key={i} color={color} />
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button variant="hero" size="lg" onClick={onColorCheck}>
            🎨 Try Color Check Tool
          </Button>
          <Button variant="glow" size="lg" onClick={onReset}>
            Start Over
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;
