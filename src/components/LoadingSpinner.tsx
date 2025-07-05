
import React from 'react';
import { Music, Film } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Music className="w-8 h-8 text-primary animate-pulse" />
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-glow">Analyzing Movie Vibes</h3>
        <p className="text-muted-foreground">Creating the perfect soundtrack for your movie...</p>
      </div>
      
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Film className="w-4 h-4" />
          <span>Reading movie themes</span>
        </div>
        <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" />
        <div className="flex items-center gap-2">
          <Music className="w-4 h-4" />
          <span>Matching with songs</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
