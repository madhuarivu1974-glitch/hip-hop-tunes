import React from 'react';
import { useParams } from 'react-router-dom';
import { Play, Heart, Share2, Users, Music, Clock } from 'lucide-react';
import { useMusicContext } from '../context/MusicContext';
import { mockArtists, mockTracks } from '../data/mockData';
import TrackRow from './TrackRow';

const Artist: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { playTrack } = useMusicContext();
  
  // Find artist by ID
  const artist = mockArtists.find(a => a.id === id);
  
  if (!artist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Artist not found</h2>
          <p className="text-gray-400">The artist you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const artistTracks = mockTracks.filter(track => track.artist === artist.name);
  const totalDuration = artistTracks.reduce((acc, track) => acc + track.duration, 0);
  
  const formatTotalDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const handlePlayAll = () => {
    if (artistTracks.length > 0) {
      playTrack(artistTracks[0], artistTracks, 0);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-burgundy-900/50 to-transparent">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="flex flex-col md:flex-row items-center md:items-end space-y-6 md:space-y-0 md:space-x-8">
            {/* Artist Image */}
            <div className="relative">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-full"></div>
            </div>
            
            {/* Artist Info */}
            <div className="text-center md:text-left flex-1">
              <p className="text-gold-400 font-medium mb-2">Artist</p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
                {artist.name}
              </h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-300 mb-6">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>{artist.followers.toLocaleString()} followers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Music className="h-5 w-5" />
                  <span>{artistTracks.length} songs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>{formatTotalDuration(totalDuration)}</span>
                </div>
              </div>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl leading-relaxed">
                {artist.bio}
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={handlePlayAll}
                  className="flex items-center space-x-3 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-full font-semibold hover:from-gold-600 hover:to-gold-700 transition-all duration-300 shadow-2xl hover:shadow-gold-500/25 hover:scale-105"
                >
                  <Play className="h-5 w-5 fill-current" />
                  <span>Play All</span>
                </button>
                <button className="flex items-center space-x-3 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <Heart className="h-5 w-5" />
                  <span>Follow</span>
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

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Popular Tracks */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">Popular Tracks</h2>
            <button className="text-gold-400 hover:text-gold-300 font-medium transition-colors">
              Show All
            </button>
          </div>
          <div className="space-y-2">
            {artistTracks.slice(0, 10).map((track, index) => (
              <TrackRow
                key={track.id}
                track={track}
                index={index + 1}
                onPlay={() => playTrack(track, artistTracks, index)}
              />
            ))}
          </div>
        </section>

        {/* Discography */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Discography</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {/* Get unique albums from tracks */}
            {Array.from(new Set(artistTracks.map(track => track.album))).map((albumName, index) => {
              const albumTracks = artistTracks.filter(track => track.album === albumName);
              const albumArtwork = albumTracks[0]?.artwork;
              
              return (
                <div
                  key={albumName}
                  className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-4 hover:from-gray-700/50 hover:to-gray-800/50 transition-all duration-300 cursor-pointer border border-gray-700/50 hover:border-gray-600/50"
                >
                  <div className="relative mb-4">
                    <img
                      src={albumArtwork}
                      alt={albumName}
                      className="w-full aspect-square object-cover rounded-xl shadow-lg"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                      <Play className="h-12 w-12 text-white fill-current" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-white mb-1 group-hover:text-gold-300 transition-colors line-clamp-2">
                    {albumName}
                  </h3>
                  <p className="text-gray-400 text-sm">{albumTracks.length} songs</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Related Artists */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8">Similar Artists</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockArtists.filter(a => a.id !== artist.id).map((relatedArtist) => (
              <div
                key={relatedArtist.id}
                className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 hover:from-gray-700/50 hover:to-gray-800/50 transition-all duration-300 cursor-pointer border border-gray-700/50 hover:border-gray-600/50"
              >
                <div className="text-center">
                  <img
                    src={relatedArtist.image}
                    alt={relatedArtist.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4 shadow-lg group-hover:scale-105 transition-transform"
                  />
                  <h3 className="font-semibold text-white mb-1 group-hover:text-gold-300 transition-colors">
                    {relatedArtist.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{relatedArtist.followers.toLocaleString()} followers</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Artist;