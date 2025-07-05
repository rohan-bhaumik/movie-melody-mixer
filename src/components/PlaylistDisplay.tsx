
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Music, Clock, Play, ExternalLink } from 'lucide-react';

interface Song {
  title: string;
  artist: string;
  album: string;
  duration: string;
  reason: string;
}

interface PlaylistDisplayProps {
  movieTitle: string;
  songs: Song[];
  onNewSearch: () => void;
}

const PlaylistDisplay: React.FC<PlaylistDisplayProps> = ({ movieTitle, songs, onNewSearch }) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 text-glow">
          Playlist inspired by "{movieTitle}"
        </h2>
        <p className="text-muted-foreground">
          {songs.length} songs • Curated for the perfect movie vibe
        </p>
      </div>

      <div className="glass-effect rounded-xl p-6 glow-effect">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">{movieTitle} Soundtrack Vibes</h3>
              <p className="text-sm text-muted-foreground">Generated playlist</p>
            </div>
          </div>
          <Button className="bg-primary hover:bg-primary/90 gap-2">
            <ExternalLink className="w-4 h-4" />
            Open in Spotify
          </Button>
        </div>

        <div className="space-y-3">
          {songs.map((song, index) => (
            <Card key={index} className="bg-secondary/30 border-primary/20 hover:bg-secondary/50 transition-all duration-200 hover:scale-[1.02]">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-accent/20 to-primary/20 rounded-lg flex items-center justify-center">
                    <Play className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="font-semibold truncate">{song.title}</h4>
                    <p className="text-sm text-muted-foreground truncate">
                      {song.artist} • {song.album}
                    </p>
                    <p className="text-xs text-accent mt-1 italic">"{song.reason}"</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {song.duration}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Button
          onClick={onNewSearch}
          variant="outline"
          className="border-primary/30 hover:border-primary hover:bg-primary/10"
        >
          Create Another Playlist
        </Button>
      </div>
    </div>
  );
};

export default PlaylistDisplay;
