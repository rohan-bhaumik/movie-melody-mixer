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
      <div className="glass-effect rounded-xl p-6 glow-effect">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
              <Youtube className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">{movieTitle} Video Vibes</h3>
              <p className="text-sm text-muted-foreground">Curated YouTube videos</p>
            </div>
          </div>
          
          <Button 
            onClick={handleShare}
            variant="outline"
            className="border-primary/30 hover:border-primary hover:bg-primary/10 gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video, index) => (
            <Card 
              key={index} 
              className="bg-secondary/30 border-primary/20 hover:bg-secondary/50 transition-all duration-200 hover:scale-[1.02] cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-sm line-clamp-2 mb-1">{video.title}</h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    {video.channelTitle}
                  </p>
                  <p className="text-xs text-accent italic line-clamp-2">"{video.reason}"</p>
                  <div className="flex items-center gap-2 mt-3">
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVideo(video);
                      }}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white gap-2"
                    >
                      <Play className="w-3 h-3" />
                      Play
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        openInYouTube(video.id);
                      }}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Button
          onClick={handleNewSearch}
          variant="outline"
          className="border-primary/30 hover:border-primary hover:bg-primary/10"
        >
          Find Videos for Another Movie
        </Button>
      </div>
    </div>
  );
};

export default VideoDisplay; 