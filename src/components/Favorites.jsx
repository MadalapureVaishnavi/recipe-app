import React, { useEffect, useState } from 'react';
import { getFavorites } from '../utils/favoritesHelper';
import YouTubeRecipeCard from './YouTubeRecipeCard';

function Favorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        setFavorites(getFavorites());
    }, []);

    return (
        <div className="App">
            <h2>⭐ Your Favorite Recipes</h2>
            <div className="grid-container">
                {favorites.map((video, idx) => (
                    <YouTubeRecipeCard key={idx} video={video} />
                ))}
            </div>
        </div>
    );
}

export default Favorites;
