import { useEffect, useState } from "react";

interface FloatingOrb {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
}

const skinToneColors = [
  // Light skin tones
  "#FFE0BD", "#FFCD94", "#F5D6BA", "#FFDAB9",
  // Medium skin tones  
  "#D4A574", "#C68642", "#8D5524", "#C4A484",
  // Warm/golden tones
  "#E0AC69", "#D08B5B", "#BE8B5D", "#A67B5B",
  // Deep skin tones
  "#7B4B2A", "#5C3317", "#4A2C17", "#3B1F0D",
  // Cool undertones
  "#E8BEAC", "#D4A59A", "#C4A088", "#A47864",
];

const SkinToneAnimation = () => {
  const [orbs, setOrbs] = useState<FloatingOrb[]>([]);

  useEffect(() => {
    // Generate random orbs
    const generatedOrbs: FloatingOrb[] = [];
    for (let i = 0; i < 25; i++) {
      generatedOrbs.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 30 + Math.random() * 80,
        color: skinToneColors[Math.floor(Math.random() * skinToneColors.length)],
        delay: Math.random() * 5,
        duration: 15 + Math.random() * 20,
      });
    }
    setOrbs(generatedOrbs);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-navy-dark/95 to-navy-dark/90" />
      
      {/* Floating orbs */}
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className="absolute rounded-full opacity-20 blur-xl animate-pulse"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            backgroundColor: orb.color,
            boxShadow: `0 0 ${orb.size / 2}px ${orb.color}`,
            animation: `skinToneFloat ${orb.duration}s ease-in-out infinite, skinTonePulse 4s ease-in-out infinite`,
            animationDelay: `${orb.delay}s`,
          }}
        />
      ))}

      {/* Larger focal orbs with more visibility */}
      {skinToneColors.slice(0, 8).map((color, i) => (
        <div
          key={`focal-${i}`}
          className="absolute rounded-full opacity-30 blur-2xl"
          style={{
            left: `${10 + (i * 12)}%`,
            top: `${20 + (i % 3) * 25}%`,
            width: `${120 + (i * 10)}px`,
            height: `${120 + (i * 10)}px`,
            backgroundColor: color,
            boxShadow: `0 0 80px ${color}`,
            animation: `skinToneFloat ${20 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}

      {/* Connecting light beams */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="beamGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE0BD" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#D4A574" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#7B4B2A" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="beamGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#C68642" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#E0AC69" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#3B1F0D" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path
            d="M0,50 Q25,20 50,50 T100,50"
            stroke="url(#beamGradient1)"
            strokeWidth="0.5"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M0,30 Q35,60 70,30 T100,30"
            stroke="url(#beamGradient2)"
            strokeWidth="0.3"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </svg>
      </div>

      {/* Shimmer effect */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          background: "linear-gradient(45deg, transparent 40%, rgba(255,224,189,0.3) 50%, transparent 60%)",
          backgroundSize: "200% 200%",
          animation: "shimmer 8s ease-in-out infinite",
        }}
      />
    </div>
  );
};

export default SkinToneAnimation;