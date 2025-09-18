import React from 'react';
import { Play, Pause, Heart, MoreHorizontal } from 'lucide-react';
import { Track } from '../context/MusicContext';
import { useMusicContext } from '../context/MusicContext';

interface TrackRowProps {
  track: Track;
  index: number;
  onPlay: () => void;
  showIndex?: boolean;
}

const TrackRow: React.FC<TrackRowProps> = ({ track, index, onPlay, showIndex = true }) => {
  const { currentTrack, isPlaying, toggleLike, likedTracks } = useMusicContext();
  const isCurrentTrack = currentTrack?.id === track.id;
  const isLiked = likedTracks.some(t => t.id === track.id);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`group flex items-center p-3 rounded-xl hover:bg-gray-800/50 transition-all duration-200 cursor-pointer ${
      isCurrentTrack ? 'bg-burgundy-900/30 border border-burgundy-700/50' : ''
    }`}>
      {/* Index/Play Button */}
      <div className="flex items-center justify-center w-12 mr-4">
        <button
          onClick={onPlay}
          className="relative group-hover:opacity-100 transition-opacity"
        >
          {showIndex && !isCurrentTrack && (
            <span className="text-gray-400 group-hover:hidden text-sm font-medium">
              {index}
            </span>
          )}
          {isCurrentTrack && isPlaying ? (
            <Pause className="h-5 w-5 text-gold-400 fill-current" />
          ) : (
            <Play className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 fill-current" />
          )}
        </button>
      </div>

      {/* Track Info */}
      <div className="flex items-center flex-1 min-w-0">
        <img
          src={track.artwork}
          alt={track.title}
          className="w-12 h-12 rounded-lg object-cover mr-4 shadow-md"
        />
        <div className="flex-1 min-w-0">
          <h4 className={`font-medium truncate ${
            isCurrentTrack ? 'text-gold-400' : 'text-white'
          }`}>
            {track.title}
          </h4>
          <p className="text-gray-400 text-sm truncate">{track.artist}</p>
        </div>
      </div>

      {/* Album */}
      <div className="hidden md:block flex-1 min-w-0 px-4">
        <p className="text-gray-400 text-sm truncate">{track.album}</p>
      </div>

      {/* Language Badge */}
      <div className="hidden sm:block mr-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          track.language === 'tamil' 
            ? 'bg-burgundy-900/50 text-burgundy-200 border border-burgundy-700/50'
            : 'bg-blue-900/50 text-blue-200 border border-blue-700/50'
        }`}>
          {track.language === 'tamil' ? 'Tamil' : 'English'}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleLike(track.id);
          }}
          className={`p-2 rounded-lg transition-colors ${
            isLiked 
              ? 'text-red-400 hover:text-red-300' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
        </button>
        <button className="p-2 rounded-lg text-gray-400 hover:text-white transition-colors">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      {/* Duration */}
      <div className="text-gray-400 text-sm font-medium ml-4 w-12 text-right">
        {formatDuration(track.duration)}
      </div>
    </div>
  );
};

export default TrackRow;