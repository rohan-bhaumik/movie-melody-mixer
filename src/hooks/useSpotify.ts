import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface SpotifyTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export const useSpotify = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [tokens, setTokens] = useState<SpotifyTokens | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const connectSpotify = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Get auth URL from Next.js API route
      const response = await fetch('/api/spotify/auth');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get auth URL');
      }
      
      const { authUrl } = data;
      
      // Open popup window for Spotify auth
      const popup = window.open(
        authUrl,
        'spotify-auth',
        'width=600,height=700,scrollbars=yes,resizable=yes'
      );

      // Listen for the auth response
      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) {
          return;
        }

        if (event.data.access_token) {
          setTokens(event.data);
          setIsConnected(true);
          if (typeof window !== 'undefined') {
            localStorage.setItem('spotify_tokens', JSON.stringify(event.data));
          }
          toast({
            title: "Connected to Spotify!",
            description: "You can now create playlists in your Spotify account.",
          });
        } else if (event.data.error) {
          toast({
            title: "Connection failed",
            description: event.data.error,
            variant: "destructive",
          });
        }

        popup?.close();
        window.removeEventListener('message', handleMessage);
        setIsLoading(false);
      };

      window.addEventListener('message', handleMessage);

      // Clean up if popup is closed manually
      const checkClosed = setInterval(() => {
        if (popup?.closed) {
          clearInterval(checkClosed);
          window.removeEventListener('message', handleMessage);
          setIsLoading(false);
        }
      }, 1000);

    } catch (error) {
      console.error('Error connecting to Spotify:', error);
      toast({
        title: "Connection failed",
        description: "Failed to connect to Spotify. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  }, [toast]);

  const createPlaylist = useCallback(async (movieTitle: string, songs: any[]) => {
    if (!tokens?.access_token) {
      throw new Error('Not connected to Spotify');
    }

    try {
      const response = await fetch('/api/spotify/create-playlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken: tokens.access_token,
          movieTitle,
          songs,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create playlist');
      }

      return data;
    } catch (error) {
      console.error('Error creating playlist:', error);
      throw error;
    }
  }, [tokens]);

  // Check for stored tokens on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTokens = localStorage.getItem('spotify_tokens');
      if (storedTokens) {
        try {
          const parsedTokens = JSON.parse(storedTokens);
          setTokens(parsedTokens);
          setIsConnected(true);
        } catch (error) {
          console.error('Error parsing stored tokens:', error);
          localStorage.removeItem('spotify_tokens');
        }
      }
    }
  }, []);

  // Check for tokens in URL params (from OAuth callback)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const tokensParam = urlParams.get('tokens');
      const errorParam = urlParams.get('error');

      if (tokensParam) {
        try {
          const parsedTokens = JSON.parse(decodeURIComponent(tokensParam));
          setTokens(parsedTokens);
          setIsConnected(true);
          localStorage.setItem('spotify_tokens', JSON.stringify(parsedTokens));
          toast({
            title: "Connected to Spotify!",
            description: "You can now create playlists in your Spotify account.",
          });
          
          // Clean up URL
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (error) {
          console.error('Error parsing tokens from URL:', error);
        }
      }

      if (errorParam) {
        toast({
          title: "Connection failed",
          description: decodeURIComponent(errorParam),
          variant: "destructive",
        });
        
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, [toast]);

  return {
    isConnected,
    isLoading,
    connectSpotify,
    createPlaylist,
  };
};
