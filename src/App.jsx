import React, { useState, useEffect } from 'react';
import axios from 'axios';
import YouTubeRecipeCard from './components/YouTubeRecipeCard';
import './App.css';

const API_KEY = 'AIzaSyAuJiMYD59l-LLHJGAHSJPEqT4k8rXtJfs'; // Replace with your key

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState([]);

  const fetchYouTubeVideos = async (query) => {
    const res = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: `${query} recipe`,
        type: 'video',
        maxResults: 10,
        key: API_KEY,
        regionCode: 'IN'
      }
    });

    setVideos(res.data.items);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      fetchYouTubeVideos(searchTerm);
    }
  };

  return (
    <div className="App">
      <h1>🍽️ YouTube Recipe Finder</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search a recipe (e.g., paneer)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="grid-container">
        {videos.map((video) => (
          <YouTubeRecipeCard key={video.id.videoId} video={video} />
        ))}
      </div>
    </div>
  );
}

export default App;
