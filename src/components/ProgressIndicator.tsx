import { Check } from "lucide-react";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

const ProgressIndicator = ({ currentStep, totalSteps, stepLabels }: ProgressIndicatorProps) => {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNum = i + 1;
        const isCompleted = stepNum < currentStep;
        const isActive = stepNum === currentStep;
        const isPending = stepNum > currentStep;
        
        return (
          <div key={i} className="flex items-center">
            {/* Step circle */}
            <div className="flex flex-col items-center">
              <div 
                className={`progress-step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''} ${isPending ? 'pending' : ''}`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  stepNum
                )}
              </div>
              <span className={`text-xs mt-2 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                {stepLabels[i]}
              </span>
            </div>
            
            {/* Connector line */}
            {i < totalSteps - 1 && (
              <div 
                className={`h-0.5 w-12 mx-2 transition-colors duration-300 ${
                  isCompleted ? 'bg-secondary' : 'bg-muted'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressIndicator;
