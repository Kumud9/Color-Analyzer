import { Palette, Gem, ScanSearch } from "lucide-react";

const HowToUseSection = () => {
  return (
    <section className="py-16 px-4 bg-navy">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
          How to Use Your Palette
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="card-glow rounded-2xl p-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Palette className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Save These Colors</h3>
            <p className="text-muted-foreground text-sm">
              Use your fabulous colors for outfits, especially near your face.
            </p>
          </div>
          
          <div className="card-glow rounded-2xl p-6">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-4">
              <Gem className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Choose Your Metals</h3>
            <p className="text-muted-foreground text-sm">
              Use your recommended metals for jewelry & accessories.
            </p>
          </div>
          
          <div className="card-glow rounded-2xl p-6">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <ScanSearch className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Check Before Buying</h3>
            <p className="text-muted-foreground text-sm">
              Use the Color Check tool before purchasing new items.
            </p>
          </div>
        </div>
        
        <p className="text-muted-foreground text-xs">
          This is an educational tool and not medical/dermatology advice.
        </p>
      </div>
    </section>
  );
};

export default HowToUseSection;
