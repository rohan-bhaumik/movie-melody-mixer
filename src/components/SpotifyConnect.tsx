
import React from 'react';
import { Button } from '@/components/ui/button';
import { Music, ExternalLink } from 'lucide-react';
import { useSpotify } from '@/hooks/useSpotify';

interface SpotifyConnectProps {
  onConnect?: () => void;
}

const SpotifyConnect: React.FC<SpotifyConnectProps> = ({ onConnect }) => {
  const { isConnected, isLoading, connectSpotify } = useSpotify();

  const handleConnect = async () => {
    await connectSpotify();
    onConnect?.();
  };

  if (isConnected) {
    return (
      <div className="flex items-center gap-2 text-green-500">
        <Music className="w-4 h-4" />
        <span className="text-sm font-medium">Connected to Spotify</span>
      </div>
    );
  }

  return (
    <Button
      onClick={handleConnect}
      disabled={isLoading}
      className="bg-[#1DB954] hover:bg-[#1ed760] text-white gap-2"
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <ExternalLink className="w-4 h-4" />
      )}
      {isLoading ? 'Connecting...' : 'Connect to Spotify'}
    </Button>
  );
};

export default SpotifyConnect;
