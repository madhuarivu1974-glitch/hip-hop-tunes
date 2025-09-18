import React, { useState } from 'react';
import { User, Heart, Clock, List, Settings, Download, Share2, Edit, Music, Play } from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';
import { useMusicContext } from '../context/MusicContext';
import TrackRow from './TrackRow';

const Profile: React.FC = () => {
  const { user, isAuthenticated, updatePreferences } = useAuthContext();
  const { likedTracks, playlists, playTrack } = useMusicContext();
  const [activeTab, setActiveTab] = useState('liked');
  const [showSettings, setShowSettings] = useState(false);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <User className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Sign in to view your profile</h2>
          <p className="text-gray-400">Create an account to save your favorite songs and playlists.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'liked', label: 'Liked Songs', icon: Heart, count: likedTracks.length },
    { id: 'playlists', label: 'Playlists', icon: List, count: playlists.length },
    { id: 'recent', label: 'Recently Played', icon: Clock, count: 12 },
    { id: 'downloads', label: 'Downloads', icon: Download, count: 0 }
  ];

  const handleLanguageChange = (language: 'tamil' | 'english') => {
    updatePreferences({ language });
  };

  const handleThemeChange = (theme: 'light' | 'dark') => {
    updatePreferences({ theme });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-burgundy-900/30 to-purple-900/30 rounded-3xl p-8 mb-8 border border-gray-700/50">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center shadow-2xl">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-16 w-16 text-white" />
                )}
              </div>
              <button className="absolute bottom-2 right-2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition-colors">
                <Edit className="h-4 w-4" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-white mb-2">{user.name}</h1>
              <p className="text-gray-400 mb-4">{user.email}</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-300 mb-6">
                <div className="flex items-center space-x-1">
                  <Heart className="h-4 w-4 text-red-400" />
                  <span>{likedTracks.length} liked songs</span>
                </div>
                <div className="flex items-center space-x-1">
                  <List className="h-4 w-4 text-blue-400" />
                  <span>{playlists.length} playlists</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Music className="h-4 w-4 text-green-400" />
                  <span>Member since 2023</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="flex items-center space-x-2 bg-gray-700/50 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-600/50 transition-colors"
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </button>
                <button className="flex items-center space-x-2 bg-gold-500 text-white px-6 py-3 rounded-full font-medium hover:bg-gold-600 transition-colors">
                  <Share2 className="h-5 w-5" />
                  <span>Share Profile</span>
                </button>
              </div>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="mt-8 p-6 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50">
              <h3 className="text-lg font-bold text-white mb-4">Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Preferred Language
                  </label>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleLanguageChange('tamil')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        user.preferences.language === 'tamil'
                          ? 'bg-burgundy-500 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      Tamil
                    </button>
                    <button
                      onClick={() => handleLanguageChange('english')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        user.preferences.language === 'english'
                          ? 'bg-burgundy-500 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      English
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Theme
                  </label>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleThemeChange('dark')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        user.preferences.theme === 'dark'
                          ? 'bg-gold-500 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      Dark
                    </button>
                    <button
                      onClick={() => handleThemeChange('light')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        user.preferences.theme === 'light'
                          ? 'bg-gold-500 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      Light
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 border-b border-gray-700/50">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all duration-200 border-b-2 ${
                    activeTab === tab.id
                      ? 'text-gold-400 border-gold-400'
                      : 'text-gray-400 border-transparent hover:text-white hover:border-gray-600'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                  {tab.count > 0 && (
                    <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'liked' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Liked Songs</h2>
                {likedTracks.length > 0 && (
                  <button
                    onClick={() => playTrack(likedTracks[0], likedTracks, 0)}
                    className="flex items-center space-x-2 bg-gold-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-gold-600 transition-colors"
                  >
                    <Play className="h-4 w-4 fill-current" />
                    <span>Play All</span>
                  </button>
                )}
              </div>
              {likedTracks.length > 0 ? (
                <div className="space-y-2">
                  {likedTracks.map((track, index) => (
                    <TrackRow
                      key={track.id}
                      track={track}
                      index={index + 1}
                      onPlay={() => playTrack(track, likedTracks, index)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Heart className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-white mb-2">No liked songs yet</h3>
                  <p className="text-gray-400">Songs you like will appear here</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'playlists' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Your Playlists</h2>
                <button className="flex items-center space-x-2 bg-gold-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-gold-600 transition-colors">
                  <List className="h-4 w-4" />
                  <span>Create Playlist</span>
                </button>
              </div>
              {playlists.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {playlists.map((playlist) => (
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
              ) : (
                <div className="text-center py-16">
                  <List className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-white mb-2">No playlists yet</h3>
                  <p className="text-gray-400">Create your first playlist to get started</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'recent' && (
            <div className="text-center py-16">
              <Clock className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">No recent activity</h3>
              <p className="text-gray-400">Your recently played songs will appear here</p>
            </div>
          )}

          {activeTab === 'downloads' && (
            <div className="text-center py-16">
              <Download className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">No downloads</h3>
              <p className="text-gray-400">Downloaded songs will appear here when available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;