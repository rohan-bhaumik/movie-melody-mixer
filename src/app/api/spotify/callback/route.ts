import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL || 'http://10.0.0.154:3000'}?error=${encodeURIComponent(error)}`
      );
    }

    if (!code) {
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL || 'http://10.0.0.154:3000'}?error=${encodeURIComponent('No authorization code received')}`
      );
    }

    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const redirectUri = `${process.env.NEXTAUTH_URL || 'http://10.0.0.154:3000'}/api/spotify/callback`;

    if (!clientId || !clientSecret) {
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL || 'http://10.0.0.154:3000'}?error=${encodeURIComponent('Spotify credentials not configured')}`
      );
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error('Token exchange failed:', tokenData);
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}?error=${encodeURIComponent(tokenData.error_description || 'Failed to get access token')}`
      );
    }

    // Redirect back to the app with tokens
    const tokens = {
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      expires_in: tokenData.expires_in,
    };

    const tokensParam = encodeURIComponent(JSON.stringify(tokens));
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL || 'http://10.0.0.154:3000'}?tokens=${tokensParam}`
    );

  } catch (error) {
    console.error('Error in Spotify callback route:', error);
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL || 'http://10.0.0.154:3000'}?error=${encodeURIComponent('Authentication failed')}`
    );
  }
} 