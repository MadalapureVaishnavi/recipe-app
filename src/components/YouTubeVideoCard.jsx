// YouTubeVideoCard.jsx
import React, { useState } from 'react';
import IngredientsModal from './IngredientsModal';
import InstructionsModal from './InstructionsModal';
import { guessRecipeDetails } from '../utils/aiGuessService';
import './YouTubeVideoCard.css';

function YouTubeVideoCard({ video, onToggleFavorite, isFavorited }) {
    const [showIngredients, setShowIngredients] = useState(false);
    const [showInstructions, setShowInstructions] = useState(false);
    const [details, setDetails] = useState(null);

    const { videoId } = video.id;
    const { title, description, channelTitle } = video.snippet;

    const fetchRecipeDetails = async () => {
        if (!details) {
            const result = await guessRecipeDetails(title);
            setDetails(result);
        }
    };

    return (
        <div className="video-card">
            <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title={title}
                width="100%"
                height="200"
                allowFullScreen
            ></iframe>

            <div className="video-info">
                <h4>{title}</h4>
                <p><strong>Channel:</strong> {channelTitle}</p>
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
                <button onClick={() => {
                    fetchRecipeDetails();
                    setShowIngredients(true);
                }}>🍅 Show Ingredients</button>

                <button onClick={() => {
                    fetchRecipeDetails();
                    setShowInstructions(true);
                }}>📝 Show Full Recipe</button>

                <button onClick={() => onToggleFavorite(video)}>
                    {isFavorited ? "💔 Remove Favorite" : "❤️ Add to Favorite"}
                </button>
            </div>

            {showIngredients && (
                <IngredientsModal
                    ingredients={details?.ingredients || []}
                    onClose={() => setShowIngredients(false)}
                />
            )}

            {showInstructions && (
                <InstructionsModal
                    instructions={details?.steps || []}
                    onClose={() => setShowInstructions(false)}
                />
            )}
        </div>
    );
}

export default YouTubeVideoCard;
