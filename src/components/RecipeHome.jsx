import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchYouTubeVideos } from "../utils/youtubeApi";
import { generateRecipeFromIngredients } from "../utils/aiRecipeService";
import YouTubeRecipeCard from "./YouTubeRecipeCard";
import { FaHeart } from "react-icons/fa";
import "../App.css";

function RecipeHome() {
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState("");
    const [videos, setVideos] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [recipeText, setRecipeText] = useState("");
    const [aiRecipe, setAiRecipe] = useState("");
    const [loading, setLoading] = useState("");
    const [viewMode, setViewMode] = useState("search");

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
        setAiRecipe("");        // clear AI recipe
        setRecipeText("");      // clear textarea
        setLoading("searching");
        fetchVideos(searchTerm).finally(() => setLoading(""));
    };

    const handleGenerate = async () => {
        setVideos([]);         // clear YouTube cards
        setSearchTerm("");     // clear search bar
        setLoading("generating");
        const result = await generateRecipeFromIngredients(recipeText);
        setAiRecipe(result);
        setLoading("");
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

            {/* 🔍 Search and Navigation */}
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

            {/* 🧠 AI Recipe Generator Section */}
            <div style={{ margin: "30px 0", textAlign: "left" }}>
                <h2>🧠 Generate Recipe from Ingredients</h2>
                <textarea
                    placeholder="Enter ingredients like rice, onion, tomato..."
                    value={recipeText}
                    onChange={(e) => setRecipeText(e.target.value)}
                    rows={4}
                    cols={50}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px" }}
                />
                <br />
                <button onClick={handleGenerate} style={{ marginTop: "10px" }}>
                    Generate Recipe
                </button>

                {/* 🔄 Loading message */}
                {loading === "generating" && (
                    <p style={{ color: "white", fontWeight: "bold" }}>🤖 Generating recipe...</p>
                )}

                {aiRecipe && (
                    <div
                        style={{
                            background: "#fff0f0",
                            color: "#333",
                            padding: "20px",
                            marginTop: "20px",
                            borderRadius: "10px",
                        }}
                    >
                        <pre style={{ whiteSpace: "pre-wrap", fontSize: "1rem" }}>
                            {aiRecipe}
                        </pre>
                    </div>
                )}
            </div>

            {/* 🎬 YouTube Video Cards */}
            <div className="grid-container">
                {loading === "searching" && (
                    <p style={{ color: "white", fontWeight: "bold" }}>🔎 Searching...</p>
                )}
                {displayedVideos.length > 0 ? (
                    displayedVideos.map((video) => (
                        <YouTubeRecipeCard
                            key={video.id.videoId}
                            video={video}
                            isFavorite={favorites.some(
                                (fav) => fav.id.videoId === video.id.videoId
                            )}
                            onToggleFavorite={() => handleFavoriteToggle(video)}
                        />
                    ))
                ) : (
                    !loading && <p style={{ color: "white" }}>No videos found.</p>
                )}
            </div>
        </div>
    );
}

export default RecipeHome;
