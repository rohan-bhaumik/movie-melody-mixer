
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { accessToken, movieTitle, songs } = await req.json();

    if (!accessToken || !movieTitle || !songs) {
      throw new Error('Missing required parameters');
    }

    // Get user profile
    const userResponse = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!userResponse.ok) {
      throw new Error('Failed to get user profile');
    }

    const userData = await userResponse.json();
    const userId = userData.id;

    // Create playlist
    const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: `${movieTitle} - Movie Soundtrack Vibes`,
        description: `A curated playlist inspired by the movie "${movieTitle}" - created by CineBeats`,
        public: false,
      }),
    });

    if (!playlistResponse.ok) {
      throw new Error('Failed to create playlist');
    }

    const playlistData = await playlistResponse.json();
    const playlistId = playlistData.id;

    // Search for tracks and add them to playlist
    const trackUris: string[] = [];
    
    for (const song of songs) {
      try {
        const searchQuery = `track:"${song.title}" artist:"${song.artist}"`;
        const searchResponse = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track&limit=1`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (searchResponse.ok) {
          const searchData = await searchResponse.json();
          if (searchData.tracks.items.length > 0) {
            trackUris.push(searchData.tracks.items[0].uri);
          }
        }
      } catch (error) {
        console.error(`Failed to search for track: ${song.title} by ${song.artist}`, error);
      }
    }

    // Add tracks to playlist if any were found
    if (trackUris.length > 0) {
      const addTracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uris: trackUris,
        }),
      });

      if (!addTracksResponse.ok) {
        console.error('Failed to add some tracks to playlist');
      }
    }

    return new Response(JSON.stringify({
      success: true,
      playlistId,
      playlistUrl: playlistData.external_urls.spotify,
      tracksAdded: trackUris.length,
      totalTracks: songs.length,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in spotify-create-playlist function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
