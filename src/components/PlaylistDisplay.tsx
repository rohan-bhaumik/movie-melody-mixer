import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Music, Clock, Play, ExternalLink, Check } from 'lucide-react';
import { useSpotify } from '@/hooks/useSpotify';
import { useToast } from '@/hooks/use-toast';
import SpotifyConnect from './SpotifyConnect';

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
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);
  const [playlistCreated, setPlaylistCreated] = useState(false);
  const [spotifyUrl, setSpotifyUrl] = useState<string | null>(null);
  const { isConnected, createPlaylist } = useSpotify();
  const { toast } = useToast();

  const handleCreateSpotifyPlaylist = async () => {
    try {
      setIsCreatingPlaylist(true);
      const result = await createPlaylist(movieTitle, songs);
      
      setPlaylistCreated(true);
      setSpotifyUrl(result.playlistUrl);
      
      toast({
        title: "Playlist created!",
        description: `Successfully created "${movieTitle} - Movie Soundtrack Vibes" with ${result.tracksAdded} of ${result.totalTracks} tracks.`,
      });
    } catch (error) {
      console.error('Error creating playlist:', error);
      toast({
        title: "Failed to create playlist",
        description: "There was an error creating your Spotify playlist. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreatingPlaylist(false);
    }
  };

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
          
          <div className="flex items-center gap-3">
            {!isConnected && <SpotifyConnect />}
            
            {isConnected && !playlistCreated && (
              <Button 
                onClick={handleCreateSpotifyPlaylist}
                disabled={isCreatingPlaylist}
                className="bg-[#1DB954] hover:bg-[#1ed760] text-white gap-2"
              >
                {isCreatingPlaylist ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Music className="w-4 h-4" />
                )}
                {isCreatingPlaylist ? 'Creating Playlist...' : 'Create in Spotify'}
              </Button>
            )}
            
            {playlistCreated && spotifyUrl && (
              <Button 
                onClick={() => window.open(spotifyUrl, '_blank')}
                className="bg-[#1DB954] hover:bg-[#1ed760] text-white gap-2"
              >
                <Check className="w-4 h-4" />
                Open in Spotify
              </Button>
            )}
          </div>
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
