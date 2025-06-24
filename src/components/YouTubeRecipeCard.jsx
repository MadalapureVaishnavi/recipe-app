import React, { useState } from "react";
import IngredientsModal from "./IngredientsModal";
import InstructionsModal from "./InstructionsModal";
import { guessRecipeDetails } from "../utils/aiGuessService";
import "./modals.css";

function YouTubeRecipeCard({ video, isFavorite, onToggleFavorite }) {
    const [showIngredients, setShowIngredients] = useState(false);
    const [showInstructions, setShowInstructions] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);

    const { videoId } = video.id;
    const { title, description, channelTitle } = video.snippet;

    const fetchRecipeDetails = async () => {
        const result = await guessRecipeDetails(`${title}\n${description}`);
        setIngredients(result.ingredients);
        setSteps(result.steps);
    };

    const handleShowIngredients = () => {
        fetchRecipeDetails();
        setShowIngredients(true);
    };

    const handleShowInstructions = () => {
        fetchRecipeDetails();
        setShowInstructions(true);
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

            <button onClick={handleShowIngredients}>🍅 Show Ingredients</button>
            <button onClick={handleShowInstructions}>📝 Show Full Recipe</button>
            <button onClick={onToggleFavorite}>
                {isFavorite ? "❌ Remove from Favorites" : "❤️ Add to Favorites"}
            </button>

            {showIngredients && (
                <IngredientsModal
                    ingredients={ingredients}
                    onClose={() => setShowIngredients(false)}
                />
            )}

            {showInstructions && (
                <InstructionsModal
                    instructions={steps}
                    onClose={() => setShowInstructions(false)}
                />
            )}
        </div>
    );
}

export default YouTubeRecipeCard;
