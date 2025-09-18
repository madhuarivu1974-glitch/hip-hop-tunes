import React from 'react';
import { useParams } from 'react-router-dom';
import { Play, Heart, Share2, Clock, Calendar, Music } from 'lucide-react';
import { useMusicContext } from '../context/MusicContext';
import { mockTracks } from '../data/mockData';
import TrackRow from './TrackRow';

const Album: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { playTrack } = useMusicContext();
  
  // For demo purposes, we'll group tracks by album and find the matching one
  const albumTracks = mockTracks.filter(track => track.id === id || track.album.toLowerCase().includes(id?.toLowerCase() || ''));
  
  if (albumTracks.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Album not found</h2>
          <p className="text-gray-400">The album you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const album = {
    name: albumTracks[0].album,
    artist: albumTracks[0].artist,
    artwork: albumTracks[0].artwork,
    year: '2023', // Mock year
    totalTracks: albumTracks.length,
    duration: albumTracks.reduce((acc, track) => acc + track.duration, 0)
  };

  const formatTotalDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours} hr ${mins} min` : `${mins} min`;
  };

  const handlePlayAll = () => {
    if (albumTracks.length > 0) {
      playTrack(albumTracks[0], albumTracks, 0);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-burgundy-900/30 to-transparent">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="flex flex-col md:flex-row items-center md:items-end space-y-6 md:space-y-0 md:space-x-8">
            {/* Album Artwork */}
            <div className="relative">
              <img
                src={album.artwork}
                alt={album.name}
                className="w-64 h-64 md:w-80 md:h-80 rounded-2xl object-cover shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
            </div>
            
            {/* Album Info */}
            <div className="text-center md:text-left flex-1">
              <p className="text-gold-400 font-medium mb-2">Album</p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                {album.name}
              </h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-1 mb-6">
                <span className="text-xl text-white font-medium hover:underline cursor-pointer">
                  {album.artist}
                </span>
                <span className="text-gray-400 mx-2">•</span>
                <span className="text-gray-300">{album.year}</span>
                <span className="text-gray-400 mx-2">•</span>
                <span className="text-gray-300">{album.totalTracks} songs</span>
                <span className="text-gray-400 mx-2">•</span>
                <span className="text-gray-300">{formatTotalDuration(album.duration)}</span>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={handlePlayAll}
                  className="flex items-center space-x-3 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-full font-semibold hover:from-gold-600 hover:to-gold-700 transition-all duration-300 shadow-2xl hover:shadow-gold-500/25 hover:scale-105"
                >
                  <Play className="h-6 w-6 fill-current" />
                  <span>Play Album</span>
                </button>
                <button className="flex items-center space-x-3 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <Heart className="h-5 w-5" />
                  <span>Save</span>
                </button>
                <button className="flex items-center space-x-3 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tracklist */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
          {/* Tracklist Header */}
          <div className="px-6 py-4 border-b border-gray-700/50 bg-gradient-to-r from-gray-800/50 to-gray-900/50">
            <div className="flex items-center text-gray-400 text-sm font-medium">
              <div className="w-12 text-center">#</div>
              <div className="flex-1 min-w-0 ml-4">Title</div>
              <div className="hidden md:block w-48 px-4">Album</div>
              <div className="w-16 text-center">
                <Clock className="h-4 w-4 mx-auto" />
              </div>
            </div>
          </div>
          
          {/* Tracks */}
          <div className="divide-y divide-gray-700/30">
            {albumTracks.map((track, index) => (
              <div key={track.id} className="px-6">
                <TrackRow
                  track={track}
                  index={index + 1}
                  onPlay={() => playTrack(track, albumTracks, index)}
                  showIndex={true}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Album Details */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Credits */}
          <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-xl font-bold text-white mb-4">Album Info</h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Music className="h-5 w-5 mr-3 text-gold-400" />
                <span className="font-medium mr-2">Artist:</span>
                <span>{album.artist}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Calendar className="h-5 w-5 mr-3 text-gold-400" />
                <span className="font-medium mr-2">Release Year:</span>
                <span>{album.year}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Music className="h-5 w-5 mr-3 text-gold-400" />
                <span className="font-medium mr-2">Total Tracks:</span>
                <span>{album.totalTracks}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Clock className="h-5 w-5 mr-3 text-gold-400" />
                <span className="font-medium mr-2">Duration:</span>
                <span>{formatTotalDuration(album.duration)}</span>
              </div>
            </div>
          </div>

          {/* More from Artist */}
          <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-xl font-bold text-white mb-4">More from {album.artist}</h3>
            <div className="space-y-3">
              {mockTracks
                .filter(track => track.artist === album.artist && track.album !== album.name)
                .slice(0, 4)
                .map((track) => (
                  <div
                    key={track.id}
                    className="flex items-center p-3 rounded-lg hover:bg-gray-700/30 transition-colors cursor-pointer"
                    onClick={() => playTrack(track, mockTracks, mockTracks.findIndex(t => t.id === track.id))}
                  >
                    <img
                      src={track.artwork}
                      alt={track.title}
                      className="w-12 h-12 rounded-lg object-cover mr-3"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white truncate">{track.title}</p>
                      <p className="text-gray-400 text-sm truncate">{track.album}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Album;