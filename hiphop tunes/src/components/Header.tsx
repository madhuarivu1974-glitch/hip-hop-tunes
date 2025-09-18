import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, Heart, Music, Menu, X } from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, isAuthenticated, login, logout } = useAuthContext();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/browse', label: 'Browse' },
    { path: '/search', label: 'Search' }
  ];

  const isActiveLink = (path: string) => location.pathname === path;

  return (
    <>
      <header className="bg-gradient-to-r from-burgundy-900/95 to-burgundy-800/95 backdrop-blur-md border-b border-burgundy-700/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="bg-gradient-to-br from-gold-400 to-gold-600 p-2 rounded-xl group-hover:scale-105 transition-transform">
                <Music className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gold-200 bg-clip-text text-transparent">
                Rhythmic Tune
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActiveLink(item.path)
                      ? 'bg-gold-500 text-white shadow-md'
                      : 'text-gray-300 hover:text-white hover:bg-burgundy-700/50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Quick Search */}
              <Link
                to="/search"
                className="p-2 rounded-lg bg-burgundy-700/50 text-gray-300 hover:text-white hover:bg-burgundy-600/50 transition-colors"
              >
                <Search className="h-5 w-5" />
              </Link>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/profile"
                    className="p-2 rounded-lg bg-burgundy-700/50 text-gray-300 hover:text-white hover:bg-burgundy-600/50 transition-colors"
                  >
                    <Heart className="h-5 w-5" />
                  </Link>
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm text-gray-300 hidden lg:block">{user?.name}</span>
                    <button
                      onClick={logout}
                      className="text-sm text-gray-400 hover:text-white transition-colors hidden lg:block"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-4 py-2 rounded-lg font-medium hover:from-gold-600 hover:to-gold-700 transition-all duration-200 shadow-md"
                >
                  Sign In
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-burgundy-700/50 transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-burgundy-800/95 border-t border-burgundy-700/50">
            <div className="px-4 py-3 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActiveLink(item.path)
                      ? 'bg-gold-500 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-burgundy-700/50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
              <button
                onClick={() => setShowAuthModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await login('demo@example.com', 'password');
                setShowAuthModal(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-colors"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-colors"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-white py-2 rounded-lg font-medium hover:from-gold-600 hover:to-gold-700 transition-all duration-200"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;