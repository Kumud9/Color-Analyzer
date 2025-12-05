export type UndertoneType = "cool" | "warm" | "neutral";

export type EyeColor = 
  | "grey" 
  | "blue" 
  | "cool-brown" 
  | "cool-green" 
  | "warm-brown" 
  | "hazel" 
  | "olive" 
  | "mixed";

export type HairColor = 
  | "ashy-brown" 
  | "black" 
  | "cool-blonde" 
  | "golden-brown" 
  | "copper" 
  | "warm-black" 
  | "auburn" 
  | "neutral";

export interface QuizAnswers {
  veinColor: "blue-purple" | "green" | "mix" | null;
  jewelryPreference: "silver" | "gold" | "both" | null;
  sunReaction: "burns" | "tans" | "both" | null;
}

export interface UserProfile {
  undertone: UndertoneType;
  eyeColor: EyeColor | null;
  hairColor: HairColor | null;
}

export interface ColorPalette {
  fabulous: ColorInfo[];
  okay: ColorInfo[];
  avoid: ColorInfo[];
  metals: MetalInfo[];
}

export interface ColorInfo {
  name: string;
  hex: string;
  description?: string;
}

export interface MetalInfo {
  name: string;
  hex: string;
  gradient?: string;
}

export const COOL_PALETTE: ColorPalette = {
  fabulous: [
    { name: "Icy Blue", hex: "#B8D4E3" },
    { name: "Blue-Pink", hex: "#E8B4C8" },
    { name: "Lavender", hex: "#C4B7D9" },
    { name: "Cool Grey", hex: "#9BA4B0" },
    { name: "Pure White", hex: "#FFFFFF" },
    { name: "Black", hex: "#1A1A1A" },
    { name: "Emerald", hex: "#2E8B57" },
    { name: "Raspberry", hex: "#D21F50" },
  ],
  okay: [
    { name: "Navy", hex: "#1A2744" },
    { name: "Soft Pink", hex: "#F4C2C2" },
    { name: "Slate Blue", hex: "#6A7B8B" },
  ],
  avoid: [
    { name: "Orange", hex: "#FF8C00" },
    { name: "Golden Yellow", hex: "#FFD700" },
    { name: "Warm Brown", hex: "#8B4513" },
  ],
  metals: [
    { name: "Silver", hex: "#C0C0C0", gradient: "linear-gradient(135deg, #E8E8E8, #A8A8A8, #C8C8C8)" },
    { name: "Platinum", hex: "#E5E4E2", gradient: "linear-gradient(135deg, #F5F5F5, #D4D4D4, #E8E8E8)" },
    { name: "White Gold", hex: "#F5F5DC", gradient: "linear-gradient(135deg, #FFFAF0, #E8E4D8, #F0EBE0)" },
  ],
};

export const WARM_PALETTE: ColorPalette = {
  fabulous: [
    { name: "Warm Green", hex: "#6B8E23" },
    { name: "Mustard", hex: "#E1AD01" },
    { name: "Honey Yellow", hex: "#EB9605" },
    { name: "Terracotta", hex: "#CC6B49" },
    { name: "Warm Brown", hex: "#8B5A2B" },
    { name: "Coral", hex: "#FF7F50" },
    { name: "Cream", hex: "#FFFDD0" },
    { name: "Ivory", hex: "#FFFFF0" },
  ],
  okay: [
    { name: "Camel", hex: "#C19A6B" },
    { name: "Olive", hex: "#808000" },
    { name: "Peach", hex: "#FFE5B4" },
  ],
  avoid: [
    { name: "Icy Blue", hex: "#B8D4E3" },
    { name: "Icy Grey", hex: "#D3D3D3" },
    { name: "Magenta Purple", hex: "#8B008B" },
  ],
  metals: [
    { name: "Gold", hex: "#FFD700", gradient: "linear-gradient(135deg, #FFE55C, #D4A000, #FFC500)" },
    { name: "Rose Gold", hex: "#E8B4A0", gradient: "linear-gradient(135deg, #F5D4C8, #D4A08A, #E8C0B0)" },
    { name: "Bronze", hex: "#CD7F32", gradient: "linear-gradient(135deg, #E8A050, #A06020, #C08040)" },
  ],
};

export const NEUTRAL_PALETTE: ColorPalette = {
  fabulous: [
    { name: "Teal", hex: "#008080" },
    { name: "Soft Pink", hex: "#E8B4B4" },
    { name: "Dusty Rose", hex: "#DCAE96" },
    { name: "Sage Green", hex: "#9CAF88" },
    { name: "Taupe", hex: "#B8A99A" },
    { name: "Beige", hex: "#D4C4B0" },
    { name: "Soft Grey", hex: "#A8A8A8" },
    { name: "Blush", hex: "#E8C4C4" },
  ],
  okay: [
    { name: "Soft Navy", hex: "#3D4F5F" },
    { name: "Mauve", hex: "#E0B0B0" },
    { name: "Warm White", hex: "#F5F5F0" },
  ],
  avoid: [
    { name: "Neon Yellow", hex: "#DFFF00" },
    { name: "Hot Pink", hex: "#FF1493" },
    { name: "Electric Blue", hex: "#00FFFF" },
  ],
  metals: [
    { name: "Gold", hex: "#FFD700", gradient: "linear-gradient(135deg, #FFE55C, #D4A000, #FFC500)" },
    { name: "Silver", hex: "#C0C0C0", gradient: "linear-gradient(135deg, #E8E8E8, #A8A8A8, #C8C8C8)" },
    { name: "Rose Gold", hex: "#E8B4A0", gradient: "linear-gradient(135deg, #F5D4C8, #D4A08A, #E8C0B0)" },
  ],
};

export const getEyeUndertone = (eyeColor: EyeColor): UndertoneType => {
  const coolEyes: EyeColor[] = ["grey", "blue", "cool-brown", "cool-green"];
  const warmEyes: EyeColor[] = ["warm-brown", "hazel", "olive"];
  
  if (coolEyes.includes(eyeColor)) return "cool";
  if (warmEyes.includes(eyeColor)) return "warm";
  return "neutral";
};

export const getHairUndertone = (hairColor: HairColor): UndertoneType => {
  const coolHair: HairColor[] = ["ashy-brown", "black", "cool-blonde"];
  const warmHair: HairColor[] = ["golden-brown", "copper", "warm-black", "auburn"];
  
  if (coolHair.includes(hairColor)) return "cool";
  if (warmHair.includes(hairColor)) return "warm";
  return "neutral";
};

export const determineUndertone = (
  skinUndertone: UndertoneType,
  eyeColor: EyeColor | null,
  hairColor: HairColor | null
): UndertoneType => {
  const tones: UndertoneType[] = [skinUndertone];
  
  if (eyeColor) tones.push(getEyeUndertone(eyeColor));
  if (hairColor) tones.push(getHairUndertone(hairColor));
  
  const coolCount = tones.filter(t => t === "cool").length;
  const warmCount = tones.filter(t => t === "warm").length;
  
  if (coolCount > warmCount && coolCount >= 2) return "cool";
  if (warmCount > coolCount && warmCount >= 2) return "warm";
  return "neutral";
};

export const getPalette = (undertone: UndertoneType): ColorPalette => {
  switch (undertone) {
    case "cool": return COOL_PALETTE;
    case "warm": return WARM_PALETTE;
    case "neutral": return NEUTRAL_PALETTE;
  }
};
