import React from 'react';
import { Play, Heart, Plus, TrendingUp, Star, Music } from 'lucide-react';
import { useMusicContext } from '../context/MusicContext';
import { mockTracks, mockPlaylists } from '../data/mockData';
import TrackRow from './TrackRow';

const Homepage: React.FC = () => {
  const { playTrack } = useMusicContext();

  const featuredPlaylist = mockPlaylists[0];
  const tamilTracks = mockTracks.filter(track => track.language === 'tamil');
  const englishTracks = mockTracks.filter(track => track.language === 'english');
  const newReleases = mockTracks.slice(0, 4);

  const handlePlayPlaylist = (playlist: any) => {
    if (playlist.tracks.length > 0) {
      playTrack(playlist.tracks[0], playlist.tracks, 0);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-burgundy-900 via-purple-900 to-burgundy-800">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Feel the{' '}
                <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
                  Rhythm
                </span>
                <br />
                of Tamil Music
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Discover the rich heritage of Tamil music with our curated collection of classics, 
                contemporary hits, and emerging artists.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => handlePlayPlaylist(featuredPlaylist)}
                  className="flex items-center justify-center space-x-3 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-full font-semibold hover:from-gold-600 hover:to-gold-700 transition-all duration-300 shadow-2xl hover:shadow-gold-500/25 hover:scale-105"
                >
                  <Play className="h-5 w-5 fill-current" />
                  <span>Play Now</span>
                </button>
                <button className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <Heart className="h-5 w-5" />
                  <span>Save to Library</span>
                </button>
              </div>
            </div>
            
            {/* Featured Playlist Card */}
            <div className="relative">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="flex items-center space-x-3 mb-4">
                  <Star className="h-6 w-6 text-gold-400 fill-current" />
                  <span className="text-gold-400 font-medium">Featured Playlist</span>
                </div>
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={featuredPlaylist.artwork}
                    alt={featuredPlaylist.name}
                    className="w-16 h-16 rounded-xl object-cover shadow-lg"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white">{featuredPlaylist.name}</h3>
                    <p className="text-gray-300">{featuredPlaylist.tracks.length} songs</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6">{featuredPlaylist.description}</p>
                <button
                  onClick={() => handlePlayPlaylist(featuredPlaylist)}
                  className="w-full bg-gradient-to-r from-burgundy-600 to-burgundy-700 text-white py-3 rounded-xl font-medium hover:from-burgundy-700 hover:to-burgundy-800 transition-all duration-200 shadow-lg"
                >
                  Listen Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* New Releases */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-2 rounded-xl">
                <Music className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">New Releases</h2>
            </div>
            <button className="text-gold-400 hover:text-gold-300 font-medium transition-colors">
              View All
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {newReleases.map((track) => (
              <div
                key={track.id}
                className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-4 hover:from-gray-700/50 hover:to-gray-800/50 transition-all duration-300 cursor-pointer border border-gray-700/50 hover:border-gray-600/50"
                onClick={() => playTrack(track, mockTracks, mockTracks.findIndex(t => t.id === track.id))}
              >
                <div className="relative mb-4">
                  <img
                    src={track.artwork}
                    alt={track.title}
                    className="w-full aspect-square object-cover rounded-xl shadow-lg"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                    <Play className="h-12 w-12 text-white fill-current" />
                  </div>
                </div>
                <h3 className="font-semibold text-white mb-1 group-hover:text-gold-300 transition-colors line-clamp-1">
                  {track.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-1">{track.artist}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Trending Tamil */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-burgundy-500 to-burgundy-600 p-2 rounded-xl">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Trending Tamil</h2>
            </div>
            <button className="text-gold-400 hover:text-gold-300 font-medium transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-2">
            {tamilTracks.map((track, index) => (
              <TrackRow
                key={track.id}
                track={track}
                index={index + 1}
                onPlay={() => playTrack(track, tamilTracks, index)}
              />
            ))}
          </div>
        </section>

        {/* Editor's Picks */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-2 rounded-xl">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Editor's Picks</h2>
            </div>
            <button className="text-gold-400 hover:text-gold-300 font-medium transition-colors">
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockPlaylists.map((playlist) => (
              <div
                key={playlist.id}
                className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 hover:from-gray-700/50 hover:to-gray-800/50 transition-all duration-300 cursor-pointer border border-gray-700/50 hover:border-gray-600/50"
                onClick={() => handlePlayPlaylist(playlist)}
              >
                <div className="relative mb-4">
                  <img
                    src={playlist.artwork}
                    alt={playlist.name}
                    className="w-full aspect-square object-cover rounded-xl shadow-lg"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                    <Play className="h-12 w-12 text-white fill-current" />
                  </div>
                </div>
                <h3 className="font-semibold text-white mb-2 group-hover:text-gold-300 transition-colors">
                  {playlist.name}
                </h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{playlist.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{playlist.tracks.length} songs</span>
                  <button className="text-gold-400 hover:text-gold-300 transition-colors">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular English Tracks */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-2 rounded-xl">
                <Music className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Popular English Tracks</h2>
            </div>
            <button className="text-gold-400 hover:text-gold-300 font-medium transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-2">
            {englishTracks.map((track, index) => (
              <TrackRow
                key={track.id}
                track={track}
                index={index + 1}
                onPlay={() => playTrack(track, englishTracks, index)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Homepage;