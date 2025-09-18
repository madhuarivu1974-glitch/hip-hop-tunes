import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './components/Homepage';
import Browse from './components/Browse';
import Artist from './components/Artist';
import Album from './components/Album';
import Search from './components/Search';
import Profile from './components/Profile';
import MusicPlayer from './components/MusicPlayer';
import { MusicProvider } from './context/MusicContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <MusicProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <Header />
            <main className="pb-24">
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/artist/:id" element={<Artist />} />
                <Route path="/album/:id" element={<Album />} />
                <Route path="/search" element={<Search />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>
            <MusicPlayer />
          </div>
        </Router>
      </MusicProvider>
    </AuthProvider>
  );
}

export default App;