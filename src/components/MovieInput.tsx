
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Film, Music } from 'lucide-react';

interface MovieInputProps {
  onMovieSubmit: (movie: string) => void;
  isLoading: boolean;
}

const MovieInput: React.FC<MovieInputProps> = ({ onMovieSubmit, isLoading }) => {
  const [movieTitle, setMovieTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (movieTitle.trim()) {
      onMovieSubmit(movieTitle.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-4 mb-6">
          <Film className="text-accent w-12 h-12" />
          <Music className="text-primary w-12 h-12" />
        </div>
        <h1 className="text-5xl font-bold mb-4 text-glow bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
          CineBeats
        </h1>
        <p className="text-xl text-muted-foreground">
          Transform your favorite movies into Spotify playlists
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
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Generating Playlist...
            </div>
          ) : (
            'Create Playlist'
          )}
        </Button>
      </form>
    </div>
  );
};

export default MovieInput;
