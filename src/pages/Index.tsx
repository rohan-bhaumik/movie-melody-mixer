
import React, { useState } from 'react';
import MovieInput from '@/components/MovieInput';
import PlaylistDisplay from '@/components/PlaylistDisplay';
import LoadingSpinner from '@/components/LoadingSpinner';

interface Song {
  title: string;
  artist: string;
  album: string;
  duration: string;
  reason: string;
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentMovie, setCurrentMovie] = useState<string>('');
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [showPlaylist, setShowPlaylist] = useState(false);

  // Mock data generator based on movie titles
  const generateMockPlaylist = (movieTitle: string): Song[] => {
    const moviePlaylists: { [key: string]: Song[] } = {
      'pulp fiction': [
        { title: 'Misirlou', artist: 'Dick Dale', album: 'Pulp Fiction Soundtrack', duration: '2:18', reason: 'Iconic opening track that sets the cool, edgy tone' },
        { title: 'Son of a Preacher Man', artist: 'Dusty Springfield', album: 'Dusty in Memphis', duration: '2:28', reason: 'Perfectly captures the retro soul vibe' },
        { title: 'Jungle Boogie', artist: 'Kool & The Gang', album: 'Wild and Peaceful', duration: '3:05', reason: 'Funky energy that matches the film\'s swagger' },
        { title: 'You Never Can Tell', artist: 'Chuck Berry', album: 'St. Louis to Liverpool', duration: '2:57', reason: 'The dance scene soundtrack - pure cool' },
        { title: 'Girl, You\'ll Be a Woman Soon', artist: 'Urge Overkill', album: 'Saturation', duration: '3:53', reason: 'Builds tension like the movie\'s best scenes' },
      ],
      'blade runner': [
        { title: 'Blade Runner Blues', artist: 'Vangelis', album: 'Blade Runner Soundtrack', duration: '8:53', reason: 'Haunting synths for cyberpunk atmosphere' },
        { title: 'Nightcall', artist: 'Kavinsky', album: 'OutRun', duration: '4:18', reason: 'Neon-soaked electronic vibes' },
        { title: 'Future Club', artist: 'Perturbator', album: 'Dangerous Days', duration: '4:23', reason: 'Dark synthwave for dystopian nights' },
        { title: 'Humans Are Such Easy Prey', artist: 'Perturbator', album: 'The Uncanny Valley', duration: '4:45', reason: 'Captures the android questioning humanity' },
        { title: 'Blue Monday', artist: 'New Order', album: 'Power, Corruption & Lies', duration: '7:30', reason: 'Electronic melancholy of the future' },
      ],
      'the dark knight': [
        { title: 'Why So Serious?', artist: 'Hans Zimmer', album: 'The Dark Knight Soundtrack', duration: '9:14', reason: 'The Joker\'s chaotic theme music' },
        { title: 'In the End', artist: 'Linkin Park', album: 'Hybrid Theory', duration: '3:36', reason: 'Inner conflict and darkness' },
        { title: 'Seven Nation Army', artist: 'The White Stripes', album: 'Elephant', duration: '3:51', reason: 'Heavy, driving rhythm for action sequences' },
        { title: 'Hurt', artist: 'Johnny Cash', album: 'American IV: The Man Comes Around', duration: '3:38', reason: 'Batman\'s pain and sacrifice' },
        { title: 'Welcome to the Black Parade', artist: 'My Chemical Romance', album: 'The Black Parade', duration: '5:11', reason: 'Dark heroism and gothic atmosphere' },
      ]
    };

    const defaultPlaylist: Song[] = [
      { title: 'Cinematic', artist: 'Owl City', album: 'Mobile Orchestra', duration: '3:28', reason: 'Perfect movie-inspired vibes' },
      { title: 'Soundtrack to My Life', artist: 'Kid Cudi', album: 'Man on the Moon', duration: '3:51', reason: 'Life feels like a movie' },
      { title: 'The Sound of Silence', artist: 'Disturbed', album: 'Immortalized', duration: '4:07', reason: 'Dramatic and emotional depth' },
      { title: 'Time', artist: 'Hans Zimmer', album: 'Inception Soundtrack', duration: '4:35', reason: 'Epic cinematic orchestration' },
      { title: 'Heroes', artist: 'David Bowie', album: 'Heroes', duration: '6:07', reason: 'Heroic themes and character development' },
      { title: 'Don\'t Stop Me Now', artist: 'Queen', album: 'Jazz', duration: '3:29', reason: 'Feel-good energy for uplifting scenes' },
      { title: 'Mad World', artist: 'Gary Jules', album: 'Donnie Darko Soundtrack', duration: '3:07', reason: 'Haunting atmosphere for darker moments' },
      { title: 'Eye of the Tiger', artist: 'Survivor', album: 'Eye of the Tiger', duration: '4:04', reason: 'Classic motivational movie energy' },
    ];

    return moviePlaylists[movieTitle.toLowerCase()] || defaultPlaylist;
  };

  const handleMovieSubmit = async (movie: string) => {
    setIsLoading(true);
    setCurrentMovie(movie);
    
    // Simulate API call delay
    setTimeout(() => {
      const generatedPlaylist = generateMockPlaylist(movie);
      setPlaylist(generatedPlaylist);
      setIsLoading(false);
      setShowPlaylist(true);
    }, 3000);
  };

  const handleNewSearch = () => {
    setShowPlaylist(false);
    setCurrentMovie('');
    setPlaylist([]);
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {!showPlaylist && !isLoading && (
          <MovieInput onMovieSubmit={handleMovieSubmit} isLoading={isLoading} />
        )}
        
        {isLoading && <LoadingSpinner />}
        
        {showPlaylist && !isLoading && (
          <PlaylistDisplay
            movieTitle={currentMovie}
            songs={playlist}
            onNewSearch={handleNewSearch}
          />
        )}
      </div>
      
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />
      </div>
    </div>
  );
};

export default Index;
