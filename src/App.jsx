// App.jsx
import React, { useState, useEffect } from "react";
import YouTubeVideoCard from "./components/YouTubeVideoCard";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });
  const [showFavorites, setShowFavorites] = useState(false);

  const fetchVideos = async () => {
    setShowFavorites(false); // ✅ This line fixes it!

    if (!query) return;
    const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query} recipe&type=video&maxResults=10&key=AIzaSyAuJiMYD59l-LLHJGAHSJPEqT4k8rXtJfs
`);
    const data = await res.json();
    setVideos(data.items || []);
  };

  const toggleFavorite = (video) => {
    let updated;
    if (favorites.some((fav) => fav.id.videoId === video.id.videoId)) {
      updated = favorites.filter((fav) => fav.id.videoId !== video.id.videoId);
    } else {
      updated = [...favorites, video];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="App">
      <h1>🍽️ Recipe Finder</h1>

      <div className="search-bar">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for recipes (e.g., paneer, dosa)"
        />
        <button onClick={fetchVideos}>Search</button>
        <button onClick={() => setShowFavorites(!showFavorites)} style={{ marginLeft: "10px" }}>
          ❤️ Favorites
        </button>
      </div>

      <div className="grid-container">
        {(showFavorites ? favorites : videos).map((video) => (
          <YouTubeVideoCard
            key={video.id.videoId}
            video={video}
            onToggleFavorite={toggleFavorite}
            isFavorited={favorites.some((fav) => fav.id.videoId === video.id.videoId)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
