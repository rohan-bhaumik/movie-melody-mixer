import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Film, Youtube } from 'lucide-react';

const MovieInput: React.FC = () => {
  const [movieTitle, setMovieTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStateChange = (event: CustomEvent) => {
      setIsLoading(event.detail.isLoading);
    };

    window.addEventListener('appStateChanged', handleStateChange as EventListener);
    return () => {
      window.removeEventListener('appStateChanged', handleStateChange as EventListener);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (movieTitle.trim()) {
      // Call the global function
      (window as any).handleMovieSubmit(movieTitle.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-4 mb-6">
          <Film className="text-accent w-12 h-12" />
          <Youtube className="text-red-500 w-12 h-12" />
        </div>
        <h1 className="text-5xl font-bold mb-4 text-glow bg-gradient-to-r from-accent to-red-500 bg-clip-text text-transparent">
          MovieVibes
        </h1>
        <p className="text-xl text-muted-foreground">
          Transform your favorite movies into curated YouTube video collections
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass-effect rounded-xl p-6 glow-effect">
          <label htmlFor="movie-title" className="block text-sm font-medium mb-3 text-foreground">
            Enter a movie title
          </label>
          <Input
            id="movie-title"
            type="text"
            placeholder="e.g., Pulp Fiction, Blade Runner, The Dark Knight..."
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
            disabled={isLoading}
            className="h-14 text-lg bg-secondary/50 border-primary/30 focus:border-primary focus:ring-primary placeholder-muted-foreground"
          />
        </div>
        
        <Button
          type="submit"
          disabled={!movieTitle.trim() || isLoading}
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-accent to-red-500 hover:from-accent/90 hover:to-red-500/90 text-white border-0 glow-effect"
        >
          {isLoading ? (
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Generating Video Collection...
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Youtube className="w-6 h-6" />
              Create Video Collection
            </div>
          )}
        </Button>
      </form>
    </div>
  );
};

export default MovieInput;
