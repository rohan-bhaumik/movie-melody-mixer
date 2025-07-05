# Movie Melody Mixer

A Next.js application that generates playlists based on your favorite movies.

## Features

- Generate playlists inspired by movie themes and moods
- Beautiful, modern UI with Tailwind CSS and shadcn/ui components
- Responsive design for all devices
- Integration with Supabase for backend services
- Spotify integration for playlist creation

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Query (TanStack Query)
- **Backend**: Supabase
- **Authentication**: Supabase Auth
- **Music Integration**: Spotify API

## Prerequisites

Before running this application, you need to have the following installed:

- Node.js (version 18 or higher)
- npm, yarn, or bun package manager

## Installation

1. **Install Node.js** (if not already installed):
   - Visit [nodejs.org](https://nodejs.org/) and download the LTS version
   - Or use a version manager like `nvm`:
     ```bash
     nvm install 18
     nvm use 18
     ```

2. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd movie-melody-mixer
   ```

3. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

4. **Set up environment variables**:
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   ```

5. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

6. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
movie-melody-mixer/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   ├── not-found.tsx   # 404 page
│   │   └── globals.css     # Global styles
│   ├── components/         # React components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── MovieInput.tsx
│   │   ├── PlaylistDisplay.tsx
│   │   └── LoadingSpinner.tsx
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   └── integrations/      # External service integrations
├── supabase/              # Supabase configuration
├── public/                # Static assets
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

This application can be deployed to various platforms:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- **AWS Amplify**

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
