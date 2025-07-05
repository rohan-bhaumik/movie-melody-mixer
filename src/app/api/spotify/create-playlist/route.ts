import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { accessToken, movieTitle, songs } = await request.json();

    if (!accessToken || !movieTitle || !songs) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Get user profile
    const userResponse = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!userResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to get user profile' },
        { status: 401 }
      );
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
        description: `A curated playlist inspired by the movie "${movieTitle}" - created by Movie Melody Mixer`,
        public: false,
      }),
    });

    if (!playlistResponse.ok) {
      const errorData = await playlistResponse.json();
      console.error('Playlist creation failed:', errorData);
      return NextResponse.json(
        { error: 'Failed to create playlist' },
        { status: playlistResponse.status }
      );
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

    return NextResponse.json({
      success: true,
      playlistId,
      playlistUrl: playlistData.external_urls.spotify,
      tracksAdded: trackUris.length,
      totalTracks: songs.length,
    });

  } catch (error) {
    console.error('Error in create-playlist route:', error);
    return NextResponse.json(
      { error: 'Failed to create playlist' },
      { status: 500 }
    );
  }
} 