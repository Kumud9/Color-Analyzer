import { useEffect, useState } from "react";
import { UndertoneType } from "@/types/colorAnalysis";

interface ToneAnimationProps {
  undertone: UndertoneType;
}

const ToneAnimation = ({ undertone }: ToneAnimationProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; left: number; delay: number; size: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 10 + 5,
    }));
    setParticles(newParticles);
  }, []);

  if (undertone === "cool") {
    // Snow animation
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute animate-snow text-white/60"
            style={{
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              fontSize: `${p.size}px`,
            }}
          >
            ❄
          </div>
        ))}
      </div>
    );
  }

  if (undertone === "warm") {
    // Sunny animation with rays and floating sun particles
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Sun glow in corner */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-yellow-400/30 to-orange-500/20 blur-3xl animate-pulse-slow" />
        
        {/* Floating warm particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute animate-float-up text-yellow-400/50"
            style={{
              left: `${p.left}%`,
              bottom: `-${p.size}px`,
              animationDelay: `${p.delay}s`,
              fontSize: `${p.size}px`,
            }}
          >
            ✦
          </div>
        ))}
        
        {/* Sun rays */}
        <div className="absolute top-10 right-10 w-32 h-32">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-1 h-16 bg-gradient-to-t from-yellow-400/40 to-transparent origin-bottom animate-ray"
              style={{
                transform: `translate(-50%, -100%) rotate(${i * 45}deg)`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Neutral - Springy warm cloudy animation
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft clouds */}
      {particles.slice(0, 8).map((p, i) => (
        <div
          key={p.id}
          className="absolute animate-cloud"
          style={{
            left: `${(i * 15) - 10}%`,
            top: `${10 + (i % 3) * 15}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${20 + p.delay * 5}s`,
          }}
        >
          <div 
            className="bg-gradient-to-r from-pink-200/20 via-white/25 to-purple-200/20 rounded-full blur-xl"
            style={{
              width: `${100 + p.size * 10}px`,
              height: `${50 + p.size * 5}px`,
            }}
          />
        </div>
      ))}
      
      {/* Spring petals / leaves */}
      {particles.slice(8).map((p) => (
        <div
          key={p.id}
          className="absolute animate-petal text-pink-300/40"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            fontSize: `${p.size}px`,
          }}
        >
          {p.id % 2 === 0 ? "🌸" : "🍃"}
        </div>
      ))}
    </div>
  );
};

export default ToneAnimation;