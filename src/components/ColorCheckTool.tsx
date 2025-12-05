import { useState, useRef } from "react";
import { Upload, CheckCircle, MinusCircle, XCircle, ArrowLeft, Pipette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UndertoneType, getPalette } from "@/types/colorAnalysis";

interface ColorCheckToolProps {
  undertone: UndertoneType;
  onBack: () => void;
}

type ColorResult = "fabulous" | "okay" | "wrong" | null;

const ColorCheckTool = ({ undertone, onBack }: ColorCheckToolProps) => {
  const [selectedColor, setSelectedColor] = useState<string>("#4de1ff");
  const [imageColor, setImageColor] = useState<string | null>(null);
  const [result, setResult] = useState<ColorResult>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const hexToHsl = (hex: string): { h: number; s: number; l: number } => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  };

  const analyzeColor = (hex: string) => {
    const hsl = hexToHsl(hex);
    const palette = getPalette(undertone);
    
    // Simple color analysis based on undertone and hue
    // This is a simplified version - a real implementation would be more sophisticated
    
    const isWarm = (h: number) => (h >= 0 && h <= 60) || (h >= 300 && h <= 360);
    const isCool = (h: number) => h >= 180 && h <= 270;
    const isNeutral = (h: number) => (h > 60 && h < 180) || (h > 270 && h < 300);
    
    // Check if color matches any in fabulous palette (simplified)
    const matchesFabulous = palette.fabulous.some(c => {
      const paletteHsl = hexToHsl(c.hex);
      return Math.abs(paletteHsl.h - hsl.h) < 30 && Math.abs(paletteHsl.s - hsl.s) < 30;
    });
    
    const matchesAvoid = palette.avoid.some(c => {
      const paletteHsl = hexToHsl(c.hex);
      return Math.abs(paletteHsl.h - hsl.h) < 30;
    });

    if (matchesFabulous) {
      return "fabulous";
    }
    
    if (matchesAvoid) {
      return "wrong";
    }

    // General undertone rules
    if (undertone === "cool") {
      if (isCool(hsl.h)) return "fabulous";
      if (isWarm(hsl.h) && hsl.s > 50) return "wrong";
      return "okay";
    }
    
    if (undertone === "warm") {
      if (isWarm(hsl.h)) return "fabulous";
      if (isCool(hsl.h) && hsl.s > 50 && hsl.l > 70) return "wrong";
      return "okay";
    }
    
    // Neutral
    if (hsl.s < 40 || isNeutral(hsl.h)) return "fabulous";
    if (hsl.s > 80) return "wrong";
    return "okay";
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setSelectedColor(color);
    setResult(analyzeColor(color));
    setImageColor(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setResult(null);
        setImageColor(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!canvasRef.current || !imageRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = imageRef.current;
    
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Scale to actual image dimensions
    const scaleX = img.naturalWidth / rect.width;
    const scaleY = img.naturalHeight / rect.height;
    
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    
    if (ctx) {
      ctx.drawImage(img, 0, 0);
      const pixel = ctx.getImageData(x * scaleX, y * scaleY, 1, 1).data;
      const hex = `#${pixel[0].toString(16).padStart(2, '0')}${pixel[1].toString(16).padStart(2, '0')}${pixel[2].toString(16).padStart(2, '0')}`;
      
      setImageColor(hex);
      setSelectedColor(hex);
      setResult(analyzeColor(hex));
    }
  };

  const getResultInfo = () => {
    switch (result) {
      case "fabulous":
        return {
          icon: CheckCircle,
          title: "Fabulous Color! ✨",
          message: "This shade will make your skin look brighter and your features pop.",
          className: "text-aqua",
          bgClass: "bg-aqua/10 border-aqua/30",
        };
      case "okay":
        return {
          icon: MinusCircle,
          title: "Safe Color 😐",
          message: "This won't hurt you, but it won't make you glow either. It's a neutral choice.",
          className: "text-gold",
          bgClass: "bg-gold/10 border-gold/30",
        };
      case "wrong":
        return {
          icon: XCircle,
          title: "Not Your Best ❌",
          message: `This might make you look dull or tired. Try ${undertone === 'cool' ? 'cooler, blue-based' : undertone === 'warm' ? 'warmer, golden' : 'more muted'} alternatives instead.`,
          className: "text-destructive",
          bgClass: "bg-destructive/10 border-destructive/30",
        };
      default:
        return null;
    }
  };

  const resultInfo = getResultInfo();

  return (
    <div className="py-16 px-4 bg-navy-dark min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <Button variant="ghost" onClick={onBack} className="mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Results
          </Button>
          
          <h2 className="text-3xl font-bold text-foreground mb-4 glow-text-aqua">
            🎨 Color Check Tool
          </h2>
          <p className="text-muted-foreground">
            Check if any color works for your {undertone} undertone.
          </p>
        </div>

        {/* Color Picker Section */}
        <div className="card-glow rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Pipette className="w-5 h-5 text-primary" />
            Pick a Color
          </h3>
          
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={selectedColor}
              onChange={handleColorChange}
              className="w-20 h-20 rounded-xl cursor-pointer border-2 border-border"
            />
            <div>
              <p className="text-foreground font-mono text-lg">{selectedColor.toUpperCase()}</p>
              <p className="text-muted-foreground text-sm">Click to pick any color</p>
            </div>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="card-glow rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5 text-primary" />
            Or Pick From Image
          </h3>
          
          <label className="block border-2 border-dashed border-primary/30 rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 transition-colors mb-4">
            <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">Upload an image of clothing, lipstick, etc.</p>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          {uploadedImage && (
            <div className="relative">
              <p className="text-sm text-muted-foreground mb-2">Click on the image to sample a color:</p>
              <img
                ref={imageRef}
                src={uploadedImage}
                alt="Uploaded"
                onClick={handleImageClick}
                className="w-full rounded-xl cursor-crosshair max-h-[300px] object-contain bg-navy"
              />
              <canvas ref={canvasRef} className="hidden" />
              {imageColor && (
                <div className="mt-3 flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg border border-border"
                    style={{ backgroundColor: imageColor }}
                  />
                  <span className="text-foreground font-mono">{imageColor.toUpperCase()}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Result */}
        {resultInfo && (
          <div className={`rounded-2xl p-6 border ${resultInfo.bgClass} transition-all duration-300`}>
            <div className="flex items-start gap-4">
              <resultInfo.icon className={`w-8 h-8 ${resultInfo.className} flex-shrink-0`} />
              <div>
                <h4 className={`text-xl font-bold ${resultInfo.className} mb-2`}>
                  {resultInfo.title}
                </h4>
                <p className="text-muted-foreground">
                  {resultInfo.message}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorCheckTool;
