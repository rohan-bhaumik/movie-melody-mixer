# Movie Melody Mixer 🎬🎵

Transform your favorite movies into curated YouTube video collections! This Astro-powered web app creates personalized video playlists inspired by the vibe and atmosphere of your chosen films.

## ✨ Features

- **Movie-Inspired Video Collections**: Enter any movie title and get a curated list of YouTube videos that match the film's atmosphere
- **Smart Video Matching**: Each video comes with a reason explaining why it matches the movie's vibe
- **Interactive Video Player**: Watch videos directly in the app with an embedded player
- **Share Functionality**: Share your curated video collections with friends
- **Beautiful UI**: Modern, responsive design with glass morphism effects
- **No Copyright Issues**: Uses carefully selected videos that avoid copyright-protected content

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd movie-melody-mixer
   ```

2. **Run the setup script**
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:4321`

## 🛠️ Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run astro` - Run Astro CLI commands

## 🎯 How It Works

1. **Enter a Movie Title**: Type in any movie you love
2. **AI-Powered Matching**: The app analyzes the movie's themes, atmosphere, and style
3. **Curated Video Collection**: Get 5 hand-picked YouTube videos that capture the movie's essence
4. **Watch & Share**: Enjoy the videos and share your collection

## 🎨 Supported Movies

The app includes curated video collections for popular films like:
- **Pulp Fiction** - Retro vibes and edgy atmosphere
- **Blade Runner** - Cyberpunk synthwave and neon aesthetics
- **The Dark Knight** - Dark orchestral and gothic themes
- **Inception** - Dreamlike ambience and mind-bending sounds
- **Interstellar** - Cosmic space odyssey vibes

*And many more! The app uses intelligent matching to create collections for any movie.*

## 🏗️ Tech Stack

- **Framework**: [Astro](https://astro.build/) - Fast static site generator
- **UI Components**: [React](https://reactjs.org/) with [Radix UI](https://www.radix-ui.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom animations
- **Icons**: [Lucide React](https://lucide.dev/)
- **TypeScript**: Full type safety
- **Build Tool**: Vite (included with Astro)

## 🌐 Deployment

This Astro app is optimized for static deployment and works great with:

- **Webflow Cloud** - Official support for Astro projects
- **Vercel** - Zero-config deployment
- **Netlify** - Static site hosting
- **GitHub Pages** - Free hosting for open source projects

### Webflow Cloud Deployment

This project is specifically configured for Webflow Cloud compatibility:

- Static output (`output: 'static'`)
- Trailing slashes enabled
- Optimized build configuration
- No server-side dependencies

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── MovieInput.tsx  # Movie search input
│   ├── VideoDisplay.tsx # Video grid and player
│   └── LoadingSpinner.tsx
├── layouts/            # Astro layouts
│   └── Layout.astro    # Main layout
├── pages/              # Astro pages
│   └── index.astro     # Home page
└── lib/                # Utility functions
```

## 🎵 Video Selection

The app uses a sophisticated matching algorithm that considers:
- **Mood & Atmosphere**: Matching the emotional tone of the movie
- **Genre & Style**: Aligning with the film's aesthetic
- **Thematic Elements**: Connecting to the movie's themes and motifs
- **Cultural References**: Finding videos that resonate with the film's cultural impact

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- YouTube for video content
- The movie industry for inspiring content
- The open source community for amazing tools and libraries

---

**Made with ❤️ for movie and music lovers everywhere**
