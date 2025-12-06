import { Camera, FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatingIcons from "./FloatingIcons";
import SkinToneAnimation from "./SkinToneAnimation";

interface HeroSectionProps {
  onSelectMethod: (method: "photo" | "quiz") => void;
}

const HeroSection = ({ onSelectMethod }: HeroSectionProps) => {
  return (
    <section 
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-navy-dark"
    >
      {/* Animated skin tone background */}
      <SkinToneAnimation />
      
      {/* Floating decorative icons */}
      <FloatingIcons />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 glow-text-aqua text-gradient-aqua leading-tight">
          Discover Your Best Colors
        </h1>
        
        <p className="text-lg md:text-xl text-foreground/80 mb-10 max-w-2xl mx-auto">
          AI-powered skin tone and color analysis for outfits, makeup, and jewelry.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="hero" 
            size="xl"
            onClick={() => onSelectMethod("photo")}
            className="min-w-[180px]"
          >
            <Camera className="w-5 h-5" />
            Use Photo
          </Button>
          
          <Button 
            variant="hero" 
            size="xl"
            onClick={() => onSelectMethod("quiz")}
            className="min-w-[180px]"
          >
            <FileQuestion className="w-5 h-5" />
            Use Quiz
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
