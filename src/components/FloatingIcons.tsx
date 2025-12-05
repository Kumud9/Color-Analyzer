import { Star, Crown, Diamond, Sparkles } from "lucide-react";

const FloatingIcons = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Star - top left */}
      <div className="absolute top-20 left-[10%] float-icon opacity-60">
        <Star className="w-6 h-6 text-gold fill-gold/30" />
      </div>
      
      {/* Diamond - left side */}
      <div className="absolute top-[40%] left-[5%] float-icon-delayed opacity-50">
        <Diamond className="w-8 h-8 text-aqua fill-aqua/20" />
      </div>
      
      {/* Sparkles - top right */}
      <div className="absolute top-24 right-[15%] float-icon-slow opacity-70">
        <Sparkles className="w-5 h-5 text-gold-light" />
      </div>
      
      {/* Star - right side */}
      <div className="absolute top-[35%] right-[8%] float-icon opacity-60">
        <Star className="w-4 h-4 text-gold fill-gold/40" />
      </div>
      
      {/* Crown - bottom right */}
      <div className="absolute bottom-[30%] right-[12%] float-icon-delayed opacity-50">
        <Crown className="w-7 h-7 text-gold" />
      </div>
      
      {/* Diamond - bottom left */}
      <div className="absolute bottom-[35%] left-[12%] float-icon-slow opacity-40">
        <Diamond className="w-5 h-5 text-neon-blue fill-neon-blue/20" />
      </div>
      
      {/* Extra sparkles */}
      <div className="absolute top-[60%] right-[25%] float-icon opacity-30">
        <Sparkles className="w-4 h-4 text-aqua" />
      </div>
    </div>
  );
};

export default FloatingIcons;
