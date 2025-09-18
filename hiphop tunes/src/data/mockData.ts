import { Track, Playlist } from '../context/MusicContext';

export const mockTracks: Track[] = [
  {
    id: '1',
    title: 'Kanne Kalaimaane',
    artist: 'A.R. Rahman',
    album: 'Mouna Ragam',
    duration: 240,
    artwork: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '/audio/sample1.mp3',
    language: 'tamil',
    lyrics: 'Kanne kalaimaane kanne kalaimaane\nNenje nenjai kondre...',
    isLiked: false
  },
  {
    id: '2',
    title: 'Munbe Vaa',
    artist: 'A.R. Rahman',
    album: 'Sillunu Oru Kaadhal',
    duration: 320,
    artwork: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '/audio/sample2.mp3',
    language: 'tamil',
    lyrics: 'Munbe vaa munbe vaa\nManasal kooda vaa...',
    isLiked: false
  },
  {
    id: '3',
    title: 'Why This Kolaveri Di',
    artist: 'Dhanush',
    album: '3',
    duration: 185,
    artwork: 'https://images.pexels.com/photos/1021808/pexels-photo-1021808.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '/audio/sample3.mp3',
    language: 'tamil',
    lyrics: 'Yo boys I am singing song\nSoup song flop song...',
    isLiked: false
  },
  {
    id: '4',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: 200,
    artwork: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '/audio/sample4.mp3',
    language: 'english',
    isLiked: false
  },
  {
    id: '5',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    album: '÷ (Divide)',
    duration: 235,
    artwork: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '/audio/sample5.mp3',
    language: 'english',
    isLiked: false
  },
  {
    id: '6',
    title: 'Kaatru Veliyidai',
    artist: 'A.R. Rahman',
    album: 'Kaatru Veliyidai',
    duration: 280,
    artwork: 'https://images.pexels.com/photos/1677710/pexels-photo-1677710.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '/audio/sample6.mp3',
    language: 'tamil',
    isLiked: false
  }
];

export const mockPlaylists: Playlist[] = [
  {
    id: '1',
    name: 'Kollywood Classics: Golden Hits',
    description: 'Timeless Tamil melodies that defined generations',
    artwork: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=300',
    tracks: mockTracks.filter(t => t.language === 'tamil').slice(0, 3),
    isPublic: true
  },
  {
    id: '2',
    name: 'Indie Tamil Chill Mix',
    description: 'Contemporary Tamil tracks for relaxation',
    artwork: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300',
    tracks: [mockTracks[0], mockTracks[2], mockTracks[5]],
    isPublic: true
  },
  {
    id: '3',
    name: 'Tamil Love Ballads',
    description: 'Romantic melodies to touch your heart',
    artwork: 'https://images.pexels.com/photos/1021808/pexels-photo-1021808.jpeg?auto=compress&cs=tinysrgb&w=300',
    tracks: [mockTracks[0], mockTracks[1], mockTracks[5]],
    isPublic: true
  },
  {
    id: '4',
    name: 'Popular English Hits',
    description: 'Chart-topping international favorites',
    artwork: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300',
    tracks: mockTracks.filter(t => t.language === 'english'),
    isPublic: true
  }
];

export const mockArtists = [
  {
    id: '1',
    name: 'A.R. Rahman',
    bio: 'Oscar-winning composer known as the Mozart of Madras',
    image: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=300',
    followers: 2500000,
    topTracks: mockTracks.filter(t => t.artist === 'A.R. Rahman')
  },
  {
    id: '2',
    name: 'Dhanush',
    bio: 'Multi-talented actor, producer, lyricist, and playback singer',
    image: 'https://images.pexels.com/photos/1021808/pexels-photo-1021808.jpeg?auto=compress&cs=tinysrgb&w=300',
    followers: 1800000,
    topTracks: mockTracks.filter(t => t.artist === 'Dhanush')
  }
];