import React, { useEffect, useState } from "react";
import YouTubeRecipeCard from "./components/YouTubeRecipeCard";
import "./App.css";
import { fetchYouTubeVideos } from "./utils/youtubeApi";
import { FaHeart } from "react-icons/fa";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [videos, setVideos] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [viewMode, setViewMode] = useState("search"); // "search" or "favorites"

  useEffect(() => {
    if (viewMode === "search" && searchTerm.trim()) {
      fetchVideos(searchTerm);
    }
  }, [viewMode]);

  const fetchVideos = async (term) => {
    if (!term.trim()) return;
    const results = await fetchYouTubeVideos(term);
    setVideos(results);
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    setViewMode("search"); // Switch to search mode
    fetchVideos(searchTerm);
  };

  const handleFavoriteToggle = (video) => {
    const exists = favorites.find((fav) => fav.id.videoId === video.id.videoId);
    if (exists) {
      setFavorites(favorites.filter((fav) => fav.id.videoId !== video.id.videoId));
    } else {
      setFavorites([...favorites, video]);
    }
  };

  const displayedVideos = viewMode === "favorites" ? favorites : videos;

  return (
    <div className="App">
      <h1>🍽️ Recipe Finder</h1>

      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          placeholder="Search recipes like khichadi, paneer..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>

        <button onClick={() => setViewMode("favorites")}>
          <FaHeart color={viewMode === "favorites" ? "red" : "black"} /> Favorites
        </button>
      </div>

      <div className="grid-container">
        {displayedVideos.length > 0 ? (
          displayedVideos.map((video) => (
            <YouTubeRecipeCard
              key={video.id.videoId}
              video={video}
              isFavorite={favorites.some((fav) => fav.id.videoId === video.id.videoId)}
              onToggleFavorite={() => handleFavoriteToggle(video)} // ✅ Match this to the card prop
            />

          ))
        ) : (
          <p style={{ color: "white" }}>No videos found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
