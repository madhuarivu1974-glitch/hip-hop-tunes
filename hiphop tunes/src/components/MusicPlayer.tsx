import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Repeat, 
  Shuffle, 
  Volume2, 
  VolumeX,
  Heart,
  Maximize2,
  List,
  Type,
  Download
} from 'lucide-react';
import { useMusicContext } from '../context/MusicContext';

const MusicPlayer: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    queue,
    volume,
    isRepeating,
    isShuffling,
    showLyrics,
    togglePlay,
    nextTrack,
    previousTrack,
    setVolume,
    toggleRepeat,
    toggleShuffle,
    toggleLyrics,
    toggleLike,
    likedTracks
  } = useMusicContext();

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', nextTrack);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', nextTrack);
    };
  }, [nextTrack]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isLiked = currentTrack && likedTracks.some(t => t.id === currentTrack.id);

  if (!currentTrack) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        loop={isRepeating}
      />

      {/* Compact Player */}
      {!isExpanded && (
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-md border-t border-gray-700/50 p-4 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Track Info */}
            <div className="flex items-center space-x-4 flex-1 min-w-0">
              <img
                src={currentTrack.artwork}
                alt={currentTrack.title}
                className="w-12 h-12 rounded-lg object-cover shadow-lg cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setIsExpanded(true)}
              />
              <div className="min-w-0 flex-1">
                <h4 className="font-medium text-white truncate">{currentTrack.title}</h4>
                <p className="text-gray-400 text-sm truncate">{currentTrack.artist}</p>
              </div>
              <button
                onClick={() => currentTrack.id && toggleLike(currentTrack.id)}
                className={`p-2 rounded-lg transition-colors ${
                  isLiked ? 'text-red-400' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4 mx-8">
              <button
                onClick={previousTrack}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <SkipBack className="h-5 w-5 fill-current" />
              </button>
              <button
                onClick={togglePlay}
                className="bg-white text-black p-3 rounded-full hover:scale-105 transition-transform shadow-lg"
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6 fill-current" />
                ) : (
                  <Play className="h-6 w-6 fill-current ml-0.5" />
                )}
              </button>
              <button
                onClick={nextTrack}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <SkipForward className="h-5 w-5 fill-current" />
              </button>
            </div>

            {/* Progress & Volume */}
            <div className="flex items-center space-x-4 flex-1 justify-end">
              <div className="hidden md:flex items-center space-x-2 w-32">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer player-slider"
                />
              </div>
              <button
                onClick={() => setIsExpanded(true)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <Maximize2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-3">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer player-slider"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Expanded Player */}
      {isExpanded && (
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-burgundy-900/20 to-gray-900 z-50 overflow-hidden">
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ←
              </button>
              <h3 className="text-lg font-medium text-white">Now Playing</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowQueue(!showQueue)}
                  className={`p-2 rounded-lg transition-colors ${
                    showQueue ? 'text-gold-400' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 flex">
              {/* Main Player */}
              <div className={`flex-1 flex flex-col items-center justify-center p-8 transition-all duration-300 ${
                showQueue ? 'mr-80' : ''
              }`}>
                {/* Album Art */}
                <div className="mb-8">
                  <img
                    src={currentTrack.artwork}
                    alt={currentTrack.title}
                    className="w-64 h-64 lg:w-80 lg:h-80 rounded-2xl object-cover shadow-2xl"
                  />
                </div>

                {/* Track Info */}
                <div className="text-center mb-8 max-w-md">
                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                    {currentTrack.title}
                  </h1>
                  <p className="text-xl text-gray-400 mb-4">{currentTrack.artist}</p>
                  <p className="text-gray-500">{currentTrack.album}</p>
                </div>

                {/* Progress */}
                <div className="w-full max-w-md mb-8">
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer player-slider"
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-2">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center space-x-6 mb-6">
                  <button
                    onClick={toggleShuffle}
                    className={`p-3 rounded-lg transition-colors ${
                      isShuffling ? 'text-gold-400' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Shuffle className="h-6 w-6" />
                  </button>
                  <button
                    onClick={previousTrack}
                    className="p-3 text-gray-400 hover:text-white transition-colors"
                  >
                    <SkipBack className="h-8 w-8 fill-current" />
                  </button>
                  <button
                    onClick={togglePlay}
                    className="bg-white text-black p-4 rounded-full hover:scale-105 transition-transform shadow-2xl"
                  >
                    {isPlaying ? (
                      <Pause className="h-10 w-10 fill-current" />
                    ) : (
                      <Play className="h-10 w-10 fill-current ml-1" />
                    )}
                  </button>
                  <button
                    onClick={nextTrack}
                    className="p-3 text-gray-400 hover:text-white transition-colors"
                  >
                    <SkipForward className="h-8 w-8 fill-current" />
                  </button>
                  <button
                    onClick={toggleRepeat}
                    className={`p-3 rounded-lg transition-colors ${
                      isRepeating ? 'text-gold-400' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Repeat className="h-6 w-6" />
                  </button>
                </div>

                {/* Secondary Controls */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => currentTrack.id && toggleLike(currentTrack.id)}
                    className={`p-3 rounded-lg transition-colors ${
                      isLiked ? 'text-red-400' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Heart className={`h-6 w-6 ${isLiked ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={toggleLyrics}
                    className={`p-3 rounded-lg transition-colors ${
                      showLyrics ? 'text-gold-400' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Type className="h-6 w-6" />
                  </button>
                  <button className="p-3 text-gray-400 hover:text-white transition-colors">
                    <Download className="h-6 w-6" />
                  </button>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="h-6 w-6" />
                      ) : (
                        <Volume2 className="h-6 w-6" />
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-24 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer player-slider"
                    />
                  </div>
                </div>

                {/* Lyrics */}
                {showLyrics && currentTrack.lyrics && (
                  <div className="mt-8 max-w-md">
                    <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50">
                      <h4 className="text-lg font-medium text-white mb-4">Lyrics</h4>
                      <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                        {currentTrack.lyrics}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Queue Sidebar */}
              {showQueue && (
                <div className="fixed right-0 top-0 bottom-0 w-80 bg-gray-900/95 backdrop-blur-md border-l border-gray-700/50 overflow-y-auto">
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-white mb-4">Queue</h3>
                    <div className="space-y-2">
                      {queue.map((track, index) => (
                        <div
                          key={track.id}
                          className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                            track.id === currentTrack.id
                              ? 'bg-burgundy-900/50 border border-burgundy-700/50'
                              : 'hover:bg-gray-800/50'
                          }`}
                        >
                          <img
                            src={track.artwork}
                            alt={track.title}
                            className="w-10 h-10 rounded-lg object-cover mr-3"
                          />
                          <div className="flex-1 min-w-0">
                            <p className={`font-medium truncate ${
                              track.id === currentTrack.id ? 'text-gold-400' : 'text-white'
                            }`}>
                              {track.title}
                            </p>
                            <p className="text-gray-400 text-sm truncate">{track.artist}</p>
                          </div>
                          <span className="text-gray-500 text-sm ml-2">
                            {formatTime(track.duration)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MusicPlayer;