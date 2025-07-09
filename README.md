# Movie Melody Mixer

A Next.js application that generates YouTube video recommendations based on your favorite movies.

## Features

- Generate YouTube video recommendations inspired by movie themes and moods
- Beautiful, modern UI with Tailwind CSS and shadcn/ui components
- Responsive design for all devices
- Embedded YouTube videos with share functionality
- Client-side only - no backend required

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Hooks
- **Video Integration**: YouTube Embed API

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

4. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

5. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

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
│   │   ├── VideoDisplay.tsx
│   │   └── LoadingSpinner.tsx
│   ├── hooks/             # Custom React hooks
│   └── lib/               # Utility functions
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
