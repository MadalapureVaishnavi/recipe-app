import React, { useState } from 'react';
import IngredientsModal from './IngredientsModal';
import InstructionsModal from './InstructionsModal';
import { guessRecipeDetails } from '../utils/aiGuessService';
import './YouTubeVideoCard.css';

function YouTubeRecipeCard({ video }) {
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showIngredients, setShowIngredients] = useState(false);
    const [showInstructions, setShowInstructions] = useState(false);

    const { videoId } = video.id;
    const { title, channelTitle } = video.snippet;

    const fetchRecipeDetails = async () => {
        setLoading(true);
        const { ingredients, steps } = await guessRecipeDetails(title);
        setIngredients(ingredients);
        setSteps(steps);
        setLoading(false);
    };

    const handleShowIngredients = async () => {
        if (ingredients.length === 0) await fetchRecipeDetails();
        setShowIngredients(true);
    };

    const handleShowInstructions = async () => {
        if (steps.length === 0) await fetchRecipeDetails();
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

            {loading && <p>Loading AI Recipe...</p>}
        </div>
    );
}

export default YouTubeRecipeCard;
