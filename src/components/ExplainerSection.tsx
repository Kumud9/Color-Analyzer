import { Sparkles, Minus, AlertTriangle } from "lucide-react";

const ExplainerSection = () => {
  return (
    <section className="py-16 px-4 bg-navy-dark">
      <div className="max-w-5xl mx-auto">
        {/* Main explainer */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
            What Color Analysis Actually Does
          </h2>
          <div className="space-y-4 text-muted-foreground text-lg max-w-3xl mx-auto">
            <p>
              It tells you which colors make you glow like you slept 8 hours… and which make you look like you haven't slept since mid-sem.
            </p>
            <p>
              It matches your skin undertone, eye color, and hair color to the colors that flatter you most.
            </p>
          </div>
        </div>
        
        {/* Three cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Fabulous Colors Card */}
          <div className="card-glow card-fabulous rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-aqua/10">
                <Sparkles className="w-6 h-6 text-aqua" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Fabulous Colors</h3>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-aqua mt-1">✓</span>
                Make your skin look smooth + bright
              </li>
              <li className="flex items-start gap-2">
                <span className="text-aqua mt-1">✓</span>
                Reduce dark circles
              </li>
              <li className="flex items-start gap-2">
                <span className="text-aqua mt-1">✓</span>
                Make you look alive without extra makeup
              </li>
            </ul>
          </div>
          
          {/* Okay Colors Card */}
          <div className="card-glow card-okay rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-gold/10">
                <Minus className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Okay / Universal Colors</h3>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">~</span>
                Don't hurt you, don't help you
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">~</span>
                Neutral, safe, meh
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">~</span>
                Works in a pinch
              </li>
            </ul>
          </div>
          
          {/* Wrong Colors Card */}
          <div className="card-glow card-wrong rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-destructive/10">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Wrong Colors</h3>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">✗</span>
                Make you look dull, tired, washed-out
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">✗</span>
                Create fake shadows, dull hair
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">✗</span>
                Give you tired eyes
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExplainerSection;
