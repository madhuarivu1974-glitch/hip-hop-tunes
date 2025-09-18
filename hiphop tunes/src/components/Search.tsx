import React, { useState, useMemo } from 'react';
import { Search as SearchIcon, Filter, X, Clock, TrendingUp, Music } from 'lucide-react';
import { useMusicContext } from '../context/MusicContext';
import { mockTracks, mockPlaylists, mockArtists } from '../data/mockData';
import TrackRow from './TrackRow';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const { playTrack } = useMusicContext();

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'tracks', label: 'Songs' },
    { id: 'artists', label: 'Artists' },
    { id: 'playlists', label: 'Playlists' },
    { id: 'tamil', label: 'Tamil' },
    { id: 'english', label: 'English' }
  ];

  const recentSearches = ['A.R. Rahman', 'Tamil Love Songs', 'Kanne Kalaimaane', 'Indie Tamil'];
  const trendingSearches = ['Why This Kolaveri', 'Dhanush hits', 'Tamil Classical', 'Modern Tamil'];

  const searchResults = useMemo(() => {
    if (!query.trim()) return { tracks: [], artists: [], playlists: [] };

    const searchTerm = query.toLowerCase();
    
    const tracks = mockTracks.filter(track => 
      track.title.toLowerCase().includes(searchTerm) ||
      track.artist.toLowerCase().includes(searchTerm) ||
      track.album.toLowerCase().includes(searchTerm)
    );

    const artists = mockArtists.filter(artist =>
      artist.name.toLowerCase().includes(searchTerm)
    );

    const playlists = mockPlaylists.filter(playlist =>
      playlist.name.toLowerCase().includes(searchTerm) ||
      playlist.description.toLowerCase().includes(searchTerm)
    );

    return { tracks, artists, playlists };
  }, [query]);

  const filteredResults = useMemo(() => {
    const { tracks, artists, playlists } = searchResults;
    
    switch (activeFilter) {
      case 'tracks':
        return { tracks, artists: [], playlists: [] };
      case 'artists':
        return { tracks: [], artists, playlists: [] };
      case 'playlists':
        return { tracks: [], artists: [], playlists };
      case 'tamil':
        return { 
          tracks: tracks.filter(t => t.language === 'tamil'), 
          artists, 
          playlists 
        };
      case 'english':
        return { 
          tracks: tracks.filter(t => t.language === 'english'), 
          artists, 
          playlists 
        };
      default:
        return { tracks, artists, playlists };
    }
  }, [searchResults, activeFilter]);

  const hasResults = filteredResults.tracks.length > 0 || 
                   filteredResults.artists.length > 0 || 
                   filteredResults.playlists.length > 0;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-6">Search</h1>
          
          {/* Search Input */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <SearchIcon className="h-6 w-6 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for songs, artists, albums..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-200 text-lg"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4 overflow-x-auto scrollbar-hide">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-200 whitespace-nowrap ${
                    activeFilter === filter.id
                      ? 'bg-gold-500 text-white shadow-lg'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 rounded-lg bg-gray-700/50 text-gray-300 hover:text-white hover:bg-gray-600/50 transition-colors ml-4"
            >
              <Filter className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Search Results */}
        {query ? (
          <div className="space-y-8">
            {hasResults ? (
              <>
                {/* Tracks */}
                {filteredResults.tracks.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                      <Music className="h-6 w-6 mr-3 text-gold-400" />
                      Songs ({filteredResults.tracks.length})
                    </h2>
                    <div className="space-y-2">
                      {filteredResults.tracks.slice(0, 10).map((track, index) => (
                        <TrackRow
                          key={track.id}
                          track={track}
                          index={index + 1}
                          onPlay={() => playTrack(track, filteredResults.tracks, index)}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* Artists */}
                {filteredResults.artists.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-bold text-white mb-6">Artists</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {filteredResults.artists.map((artist) => (
                        <div
                          key={artist.id}
                          className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-4 hover:from-gray-700/50 hover:to-gray-800/50 transition-all duration-300 cursor-pointer border border-gray-700/50 hover:border-gray-600/50"
                        >
                          <div className="text-center">
                            <img
                              src={artist.image}
                              alt={artist.name}
                              className="w-24 h-24 rounded-full object-cover mx-auto mb-4 shadow-lg"
                            />
                            <h3 className="font-semibold text-white mb-1 group-hover:text-gold-300 transition-colors">
                              {artist.name}
                            </h3>
                            <p className="text-gray-400 text-sm">{artist.followers.toLocaleString()} followers</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Playlists */}
                {filteredResults.playlists.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-bold text-white mb-6">Playlists</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {filteredResults.playlists.map((playlist) => (
                        <div
                          key={playlist.id}
                          className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-4 hover:from-gray-700/50 hover:to-gray-800/50 transition-all duration-300 cursor-pointer border border-gray-700/50 hover:border-gray-600/50"
                          onClick={() => {
                            if (playlist.tracks.length > 0) {
                              playTrack(playlist.tracks[0], playlist.tracks, 0);
                            }
                          }}
                        >
                          <img
                            src={playlist.artwork}
                            alt={playlist.name}
                            className="w-full aspect-square object-cover rounded-xl shadow-lg mb-4"
                          />
                          <h3 className="font-semibold text-white mb-1 group-hover:text-gold-300 transition-colors line-clamp-1">
                            {playlist.name}
                          </h3>
                          <p className="text-gray-400 text-sm line-clamp-2">{playlist.description}</p>
                          <p className="text-gray-500 text-xs mt-2">{playlist.tracks.length} songs</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <SearchIcon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">No results found</h3>
                <p className="text-gray-400">Try different keywords or browse our collections</p>
              </div>
            )}
          </div>
        ) : (
          /* Default State */
          <div className="space-y-8">
            {/* Recent Searches */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Clock className="h-6 w-6 mr-3 text-gold-400" />
                Recent Searches
              </h2>
              <div className="flex flex-wrap gap-3">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setQuery(search)}
                    className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full hover:bg-gray-600/50 hover:text-white transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </section>

            {/* Trending Searches */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <TrendingUp className="h-6 w-6 mr-3 text-burgundy-400" />
                Trending Searches
              </h2>
              <div className="flex flex-wrap gap-3">
                {trendingSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setQuery(search)}
                    className="px-4 py-2 bg-gradient-to-r from-burgundy-600/20 to-burgundy-700/20 border border-burgundy-500/30 text-burgundy-200 rounded-full hover:from-burgundy-600/30 hover:to-burgundy-700/30 transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </section>

            {/* Browse Categories */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">Browse Categories</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[
                  { name: 'Tamil Classics', color: 'from-burgundy-500 to-burgundy-700' },
                  { name: 'Film Songs', color: 'from-gold-500 to-gold-700' },
                  { name: 'Independent Tamil', color: 'from-purple-500 to-purple-700' },
                  { name: 'Devotional', color: 'from-orange-500 to-orange-700' },
                  { name: 'Folk Music', color: 'from-green-500 to-green-700' },
                  { name: 'English Hits', color: 'from-blue-500 to-blue-700' },
                  { name: 'Remix & DJ', color: 'from-pink-500 to-pink-700' },
                  { name: 'Chill Tamil', color: 'from-teal-500 to-teal-700' },
                ].map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setQuery(category.name)}
                    className={`bg-gradient-to-br ${category.color} p-6 rounded-2xl text-white font-semibold text-lg hover:scale-105 transition-transform shadow-lg`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;