import React, { useState } from 'react';
import { Filter, Grid, List } from 'lucide-react';
import { mockTracks, mockPlaylists } from '../data/mockData';
import { useMusicContext } from '../context/MusicContext';
import TrackRow from './TrackRow';

const Browse: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMood, setSelectedMood] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const { playTrack } = useMusicContext();

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'latest', label: 'Latest' },
    { id: 'classical', label: 'Classical' },
    { id: 'film', label: 'Film Songs' },
    { id: 'independent', label: 'Independent' },
    { id: 'devotional', label: 'Devotional' },
    { id: 'folk', label: 'Folk' },
    { id: 'remix', label: 'Remix' }
  ];

  const moods = [
    { id: 'all', label: 'All Moods' },
    { id: 'chill', label: 'Chill' },
    { id: 'party', label: 'Party' },
    { id: 'romantic', label: 'Romantic' },
    { id: 'sad', label: 'Sad' },
    { id: 'energetic', label: 'Energetic' }
  ];

  const languages = [
    { id: 'all', label: 'All Languages' },
    { id: 'tamil', label: 'Tamil' },
    { id: 'english', label: 'English' }
  ];

  const filteredTracks = mockTracks.filter(track => {
    if (selectedLanguage !== 'all' && track.language !== selectedLanguage) return false;
    // Add more filtering logic based on category and mood
    return true;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Browse Music</h1>
            <p className="text-gray-400">Discover your next favorite song</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-gold-500 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-gold-500 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-700/50">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="h-5 w-5 text-gray-400" />
            <h3 className="text-lg font-medium text-white">Filters</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Categories */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-gold-500 text-white shadow-md'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Moods */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Mood</label>
              <div className="flex flex-wrap gap-2">
                {moods.map((mood) => (
                  <button
                    key={mood.id}
                    onClick={() => setSelectedMood(mood.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedMood === mood.id
                        ? 'bg-burgundy-500 text-white shadow-md'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                    }`}
                  >
                    {mood.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Language</label>
              <div className="flex flex-wrap gap-2">
                {languages.map((language) => (
                  <button
                    key={language.id}
                    onClick={() => setSelectedLanguage(language.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedLanguage === language.id
                        ? 'bg-teal-500 text-white shadow-md'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                    }`}
                  >
                    {language.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-8">
          {/* Featured Playlists */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Featured Playlists</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {mockPlaylists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-4 hover:from-gray-700/50 hover:to-gray-800/50 transition-all duration-300 cursor-pointer border border-gray-700/50 hover:border-gray-600/50"
                  onClick={() => {
                    if (playlist.tracks.length > 0) {
                      playTrack(playlist.tracks[0], playlist.tracks, 0);
                    }
                  }}
                >
                  <div className="relative mb-4">
                    <img
                      src={playlist.artwork}
                      alt={playlist.name}
                      className="w-full aspect-square object-cover rounded-xl shadow-lg"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                      <div className="bg-white text-black p-3 rounded-full">
                        <svg className="h-6 w-6 fill-current ml-0.5" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-white mb-1 group-hover:text-gold-300 transition-colors">
                    {playlist.name}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2">{playlist.description}</p>
                  <p className="text-gray-500 text-xs mt-2">{playlist.tracks.length} songs</p>
                </div>
              ))}
            </div>
          </section>

          {/* Tracks */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {selectedLanguage === 'all' ? 'All Tracks' : 
                 selectedLanguage === 'tamil' ? 'Tamil Tracks' : 'English Tracks'}
              </h2>
              <span className="text-gray-400">{filteredTracks.length} songs</span>
            </div>
            
            {viewMode === 'list' ? (
              <div className="space-y-2">
                {filteredTracks.map((track, index) => (
                  <TrackRow
                    key={track.id}
                    track={track}
                    index={index + 1}
                    onPlay={() => playTrack(track, filteredTracks, index)}
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {filteredTracks.map((track, index) => (
                  <div
                    key={track.id}
                    className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-4 hover:from-gray-700/50 hover:to-gray-800/50 transition-all duration-300 cursor-pointer border border-gray-700/50 hover:border-gray-600/50"
                    onClick={() => playTrack(track, filteredTracks, index)}
                  >
                    <div className="relative mb-3">
                      <img
                        src={track.artwork}
                        alt={track.title}
                        className="w-full aspect-square object-cover rounded-xl shadow-lg"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                        <div className="bg-white text-black p-2 rounded-full">
                          <svg className="h-4 w-4 fill-current ml-0.5" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                      <div className="absolute top-2 right-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          track.language === 'tamil' 
                            ? 'bg-burgundy-900/70 text-burgundy-200'
                            : 'bg-blue-900/70 text-blue-200'
                        }`}>
                          {track.language === 'tamil' ? 'Tamil' : 'Eng'}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-medium text-white mb-1 group-hover:text-gold-300 transition-colors line-clamp-1 text-sm">
                      {track.title}
                    </h3>
                    <p className="text-gray-400 text-xs line-clamp-1">{track.artist}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Browse;