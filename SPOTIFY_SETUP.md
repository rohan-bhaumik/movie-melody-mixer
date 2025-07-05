# Spotify Integration Setup

This guide will help you set up Spotify integration using Next.js API routes.

## Step 1: Create Spotify Developer App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create App"
4. Fill in the app details:
   - **App name**: Movie Melody Mixer
   - **App description**: Generate playlists based on movies
   - **Website**: `http://10.0.0.154:3000`
   - **Redirect URI**: `http://10.0.0.154:3000/api/spotify/callback`
5. Click "Save"
6. Copy your **Client ID** and **Client Secret**

## Step 2: Set Environment Variables

Create a `.env.local` file in your project root with:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://pftnjlwpcisbvfafvbzy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmdG5qbHdwY2lzYnZmYWZ2Ynp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NDc5NDcsImV4cCI6MjA2NzMyMzk0N30.Wa7XbePheiM8gWc_dKJbXvc9B4airjMHQ4YBizgKu58

# Spotify Configuration (Replace with your actual values)
SPOTIFY_CLIENT_ID=your_spotify_client_id_here
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here

# Next.js Configuration
NEXTAUTH_URL=http://10.0.0.154:3000
NEXTAUTH_SECRET=jN8Yeudmu3Ya0pPJ3kfVT2OMR5qtJclJclJGAiBvT3MbUY=
```

## Step 3: Update Spotify App Settings

1. Go back to your Spotify app in the developer dashboard
2. Click "Edit Settings"
3. Add this redirect URI: `http://10.0.0.154:3000/api/spotify/callback`
4. Save the changes

## Step 4: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open your app at `http://10.0.0.154:3000` (or whatever port it's using)

3. Try connecting to Spotify and creating a playlist

## How It Works

The new implementation uses Next.js API routes instead of Supabase edge functions:

- `/api/spotify/auth` - Generates Spotify authorization URL
- `/api/spotify/callback` - Handles OAuth callback and token exchange
- `/api/spotify/create-playlist` - Creates playlists in Spotify

This approach is simpler and doesn't require setting up Supabase edge functions.

## Troubleshooting

- **"Missing authorization header"**: Make sure your Spotify Client ID and Secret are set in `.env.local`
- **"Invalid redirect URI"**: Ensure the redirect URI in your Spotify app matches exactly: `http://10.0.0.154:3000/api/spotify/callback`
- **"Failed to get access token"**: Check that your Spotify app has the correct permissions and redirect URI

## Alternative: Use ngrok for Development

If you prefer to use `localhost`, you can use ngrok to create a public tunnel:

1. Install ngrok: `npm install -g ngrok`
2. Start your Next.js app: `npm run dev`
3. In another terminal: `ngrok http 3000`
4. Use the ngrok URL (e.g., `https://abc123.ngrok.io`) in your Spotify app settings

## Production Deployment

When deploying to production:

1. Update the redirect URI in your Spotify app to your production domain
2. Update `NEXTAUTH_URL` in your environment variables
3. Generate a new `NEXTAUTH_SECRET` for production 