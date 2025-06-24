import React, { useState } from 'react';
import IngredientsModal from './IngredientsModal';
import InstructionsModal from './InstructionsModal';
import YouTubeVideos from './YouTubeVideos';
import './modals.css';

function RecipeCard({ recipe, searchTerm }) {
    const [showIngredients, setShowIngredients] = useState(false);
    const [showInstructions, setShowInstructions] = useState(false);

    const getIngredients = () => {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ing = recipe[`strIngredient${i}`];
            const measure = recipe[`strMeasure${i}`];
            if (ing && ing.trim() !== '') {
                ingredients.push(`${measure} ${ing}`);
            }
        }
        return ingredients;
    };

    const query = searchTerm || recipe.strMeal;

    return (
        <div className="recipe-card">
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <h3>{recipe.strMeal}</h3>
            <p><strong>Category:</strong> {recipe.strCategory}</p>

            <button onClick={() => setShowIngredients(true)}>🍅 Show Ingredients</button>
            <button onClick={() => setShowInstructions(true)}>📝 Show Full Recipe</button>

            {showIngredients && (
                <IngredientsModal
                    ingredients={getIngredients()}
                    onClose={() => setShowIngredients(false)}
                />
            )}

            {showInstructions && (
                <InstructionsModal
                    instructions={recipe.strInstructions}
                    onClose={() => setShowInstructions(false)}
                />
            )}

            {/* Show all related YouTube videos automatically below */}
            <YouTubeVideos query={recipe.strMeal} />
        </div>
    );
}

export default RecipeCard;
