import React, { createContext, useContext, useState, useRef } from 'react';

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  artwork: string;
  audioUrl: string;
  language: 'tamil' | 'english';
  lyrics?: string;
  isLiked?: boolean;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  artwork: string;
  tracks: Track[];
  isPublic: boolean;
}

interface MusicContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  queue: Track[];
  currentIndex: number;
  volume: number;
  isRepeating: boolean;
  isShuffling: boolean;
  showLyrics: boolean;
  playlists: Playlist[];
  likedTracks: Track[];
  playTrack: (track: Track, queue?: Track[], index?: number) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  setVolume: (volume: number) => void;
  toggleRepeat: () => void;
  toggleShuffle: () => void;
  toggleLyrics: () => void;
  toggleLike: (trackId: string) => void;
  addToPlaylist: (playlistId: string, track: Track) => void;
  createPlaylist: (name: string, description: string) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const useMusicContext = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusicContext must be used within a MusicProvider');
  }
  return context;
};

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [volume, setVolumeState] = useState(0.7);
  const [isRepeating, setIsRepeating] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [likedTracks, setLikedTracks] = useState<Track[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playTrack = (track: Track, newQueue?: Track[], index: number = 0) => {
    setCurrentTrack(track);
    if (newQueue) {
      setQueue(newQueue);
      setCurrentIndex(index);
    }
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    if (queue.length > 0) {
      const nextIndex = isShuffling 
        ? Math.floor(Math.random() * queue.length)
        : (currentIndex + 1) % queue.length;
      setCurrentIndex(nextIndex);
      setCurrentTrack(queue[nextIndex]);
    }
  };

  const previousTrack = () => {
    if (queue.length > 0) {
      const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
      setCurrentIndex(prevIndex);
      setCurrentTrack(queue[prevIndex]);
    }
  };

  const handleSetVolume = (newVolume: number) => {
    setVolumeState(newVolume);
  };

  const toggleRepeat = () => {
    setIsRepeating(!isRepeating);
  };

  const toggleShuffle = () => {
    setIsShuffling(!isShuffling);
  };

  const toggleLyrics = () => {
    setShowLyrics(!showLyrics);
  };

  const toggleLike = (trackId: string) => {
    const track = queue.find(t => t.id === trackId);
    if (!track) return;

    const isAlreadyLiked = likedTracks.some(t => t.id === trackId);
    if (isAlreadyLiked) {
      setLikedTracks(prev => prev.filter(t => t.id !== trackId));
    } else {
      setLikedTracks(prev => [...prev, { ...track, isLiked: true }]);
    }
  };

  const addToPlaylist = (playlistId: string, track: Track) => {
    setPlaylists(prev => prev.map(playlist => 
      playlist.id === playlistId 
        ? { ...playlist, tracks: [...playlist.tracks, track] }
        : playlist
    ));
  };

  const createPlaylist = (name: string, description: string) => {
    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name,
      description,
      artwork: '/api/placeholder/300/300',
      tracks: [],
      isPublic: false
    };
    setPlaylists(prev => [...prev, newPlaylist]);
  };

  return (
    <MusicContext.Provider value={{
      currentTrack,
      isPlaying,
      queue,
      currentIndex,
      volume,
      isRepeating,
      isShuffling,
      showLyrics,
      playlists,
      likedTracks,
      playTrack,
      togglePlay,
      nextTrack,
      previousTrack,
      setVolume: handleSetVolume,
      toggleRepeat,
      toggleShuffle,
      toggleLyrics,
      toggleLike,
      addToPlaylist,
      createPlaylist
    }}>
      {children}
    </MusicContext.Provider>
  );
};