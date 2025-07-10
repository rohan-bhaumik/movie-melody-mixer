import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Play, Share2, ExternalLink, Youtube } from 'lucide-react';

interface YouTubeVideo {
  id: string;
  title: string;
  channelTitle: string;
  duration: string;
  thumbnail: string;
  reason: string;
  embedUrl: string;
}

const VideoDisplay: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [movieTitle, setMovieTitle] = useState('');
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [showVideos, setShowVideos] = useState(false);

  useEffect(() => {
    const handleStateChange = (event: CustomEvent) => {
      setMovieTitle(event.detail.currentMovie);
      setVideos(event.detail.videos);
      setShowVideos(event.detail.showVideos);
    };

    window.addEventListener('appStateChanged', handleStateChange as EventListener);
    return () => {
      window.removeEventListener('appStateChanged', handleStateChange as EventListener);
    };
  }, []);

  const handleShare = async () => {
    const shareUrl = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Movie Vibes: ${movieTitle}`,
          text: `Check out these YouTube videos inspired by "${movieTitle}"!`,
          url: shareUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl);
        // Simple toast notification
        alert('Link copied to clipboard!');
      } catch (error) {
        console.error('Failed to copy:', error);
        alert('Please copy the URL manually from your browser.');
      }
    }
  };

  const openInYouTube = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  const handleNewSearch = () => {
    (window as any).handleNewSearch();
  };

  if (!showVideos || videos.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 text-glow">
          Videos inspired by "{movieTitle}"
        </h2>
        <p className="text-muted-foreground">
          {videos.length} videos • Curated for the perfect movie vibe
        </p>
      </div>

      {/* Selected Video Player */}
      {selectedVideo && (
        <div className="glass-effect rounded-xl p-6 glow-effect mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Now Playing</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedVideo(null)}
              className="text-muted-foreground hover:text-foreground"
            >
              Close
            </Button>
          </div>
          <div className="aspect-video w-full rounded-lg overflow-hidden">
            <iframe
              src={`${selectedVideo.embedUrl}?autoplay=1`}
              title={selectedVideo.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="mt-4">
            <h4 className="font-semibold text-lg">{selectedVideo.title}</h4>
            <p className="text-sm text-muted-foreground">{selectedVideo.channelTitle}</p>
            <p className="text-sm text-accent mt-2 italic">"{selectedVideo.reason}"</p>
          </div>
        </div>
      )}

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Card key={video.id} className="group hover:shadow-lg transition-all duration-300 glass-effect glow-effect">
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg flex items-center justify-center">
                <Button
                  size="lg"
                  onClick={() => setSelectedVideo(video)}
                  className="bg-primary/90 hover:bg-primary text-white"
                >
                  <Play className="w-6 h-6 mr-2" />
                  Play
                </Button>
              </div>
              <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">{video.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{video.channelTitle}</p>
              <p className="text-sm text-accent mb-4 italic line-clamp-2">"{video.reason}"</p>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedVideo(video)}
                  className="flex-1"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Watch
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openInYouTube(video.id)}
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <Button
          onClick={handleShare}
          variant="outline"
          size="lg"
          className="flex items-center gap-2"
        >
          <Share2 className="w-5 h-5" />
          Share Collection
        </Button>
        <Button
          onClick={handleNewSearch}
          size="lg"
          className="flex items-center gap-2 bg-gradient-to-r from-accent to-red-500 hover:from-accent/90 hover:to-red-500/90 text-white border-0"
        >
          <Youtube className="w-5 h-5" />
          Create New Collection
        </Button>
      </div>
    </div>
  );
};

export default VideoDisplay; 