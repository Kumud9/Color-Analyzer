import { useState, useRef, useCallback } from "react";
import { Upload, Camera, X, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UndertoneType } from "@/types/colorAnalysis";
import { analyzeSkinUndertone } from "@/lib/skinAnalysis";

interface PhotoAnalyzerProps {
  onAnalyze: (undertone: UndertoneType) => void;
  onBack: () => void;
}

const PhotoAnalyzer = ({ onAnalyze, onBack }: PhotoAnalyzerProps) => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isCameraMode, setIsCameraMode] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [analysisDetails, setAnalysisDetails] = useState<{
    confidence: number;
    coolScore: number;
    warmScore: number;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setAnalysisDetails(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } } 
      });
      setStream(mediaStream);
      setIsCameraMode(true);
      
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();
        }
      }, 100);
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access camera. Please make sure you've granted camera permissions.");
    }
  };

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraMode(false);
  }, [stream]);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      if (context) {
        context.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');
        setImage(imageData);
        setAnalysisDetails(null);
        stopCamera();
      }
    }
  };

  const analyzePhoto = async () => {
    if (!image) return;
    
    setIsAnalyzing(true);
    
    try {
      // Real color analysis of the uploaded image
      const result = await analyzeSkinUndertone(image);
      
      setAnalysisDetails({
        confidence: result.confidence,
        coolScore: result.coolScore,
        warmScore: result.warmScore,
      });
      
      setIsAnalyzing(false);
      onAnalyze(result.undertone);
    } catch (error) {
      console.error("Analysis error:", error);
      setIsAnalyzing(false);
      // Fallback to neutral if analysis fails
      onAnalyze("neutral");
    }
  };

  const clearImage = () => {
    setImage(null);
    setAnalysisDetails(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-foreground mb-2">Photo Analysis</h3>
        <p className="text-muted-foreground text-sm">
          Upload a clear selfie in natural daylight, no heavy filters.
        </p>
      </div>

      {/* Camera View */}
      {isCameraMode && !image && (
        <div className="relative rounded-2xl overflow-hidden mb-6 bg-navy">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className="w-full aspect-[4/3] object-cover"
          />
          <canvas ref={canvasRef} className="hidden" />
          
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
            <Button variant="destructive" size="lg" onClick={stopCamera}>
              <X className="w-5 h-5" />
              Cancel
            </Button>
            <Button variant="hero" size="lg" onClick={capturePhoto}>
              <Camera className="w-5 h-5" />
              Capture
            </Button>
          </div>
        </div>
      )}

      {/* Upload/Preview Area */}
      {!isCameraMode && (
        <>
          {!image ? (
            <div className="space-y-4">
              {/* Upload area */}
              <label 
                className="block border-2 border-dashed border-primary/30 rounded-2xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-primary/60" />
                <p className="text-foreground font-medium mb-1">Click to upload a photo</p>
                <p className="text-muted-foreground text-sm">PNG, JPG up to 10MB</p>
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              
              {/* Or use camera */}
              <div className="text-center">
                <p className="text-muted-foreground text-sm mb-3">or</p>
                <Button variant="glow" size="lg" onClick={startCamera}>
                  <Camera className="w-5 h-5" />
                  Use Camera
                </Button>
              </div>
            </div>
          ) : (
            <div className="relative">
              <img 
                src={image} 
                alt="Uploaded selfie" 
                className="w-full rounded-2xl aspect-[4/3] object-cover"
              />
              <button 
                onClick={clearImage}
                className="absolute top-3 right-3 p-2 rounded-full bg-destructive/90 text-destructive-foreground hover:bg-destructive transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}

      {/* Action buttons */}
      {image && !isCameraMode && (
        <div className="flex gap-4 mt-6">
          <Button variant="outline" className="flex-1" onClick={clearImage}>
            <RefreshCw className="w-4 h-4" />
            New Photo
          </Button>
          <Button 
            variant="hero" 
            className="flex-1" 
            onClick={analyzePhoto}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze My Colors"
            )}
          </Button>
        </div>
      )}

      {/* Back button */}
      <div className="mt-6 text-center">
        <Button variant="ghost" onClick={onBack}>
          ← Back to options
        </Button>
      </div>
    </div>
  );
};

export default PhotoAnalyzer;
