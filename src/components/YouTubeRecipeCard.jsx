import React, { useState, useEffect } from 'react';
import IngredientsModal from './IngredientsModal';
import InstructionsModal from './InstructionsModal';
import { guessRecipeDetails } from '../utils/aiGuessService';
import { isFavorite, toggleFavorite } from '../utils/favoritesHelper';
import './Modals.css';

function YouTubeRecipeCard({ video }) {
    const [showIngredients, setShowIngredients] = useState(false);
    const [showInstructions, setShowInstructions] = useState(false);
    const [isFav, setIsFav] = useState(false);

    const { videoId } = video.id;
    const { title, description, channelTitle } = video.snippet;

    useEffect(() => {
        setIsFav(isFavorite(videoId));
    }, [videoId]);

    const handleToggleFavorite = () => {
        toggleFavorite({ ...video, videoId });
        setIsFav(!isFav);
    };

    return (
        <div className="recipe-card">
            <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title={title}
                width="100%"
                height="200"
                allowFullScreen
            ></iframe>

            <h3>{title}</h3>
            <p><strong>Channel:</strong> {channelTitle}</p>

            <button onClick={() => setShowIngredients(true)}>🍅 Show Ingredients</button>
            <button onClick={() => setShowInstructions(true)}>📝 Show Full Recipe</button>
            <button onClick={handleToggleFavorite}>
                {isFav ? '💔 Remove Favorite' : '⭐ Add to Favorites'}
            </button>

            {showIngredients && (
                <IngredientsModal
                    ingredients={video.ingredients || []}
                    onClose={() => setShowIngredients(false)}
                />
            )}

            {showInstructions && (
                <InstructionsModal
                    instructions={video.steps || []}
                    onClose={() => setShowInstructions(false)}
                />
            )}
        </div>
    );
}

export default YouTubeRecipeCard;
