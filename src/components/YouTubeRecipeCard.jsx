import React, { useState } from "react";
import IngredientsModal from "./IngredientsModal";
import InstructionsModal from "./InstructionsModal";
import { guessRecipeDetails } from "../utils/aiGuessService";
import "./modals.css";
import jsPDF from "jspdf";


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



    const handleDownloadPDF = async () => {
        const { ingredients, steps } = await guessRecipeDetails(`${title}\n${description}`);
        const doc = new jsPDF();

        const imgUrl = video.snippet.thumbnails?.high?.url;

        // Load the image as base64
        const getImageBase64 = async (url) => {
            const res = await fetch(url);
            const blob = await res.blob();
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(blob);
            });
        };

        const imageBase64 = await getImageBase64(imgUrl);

        // Insert image
        doc.addImage(imageBase64, "JPEG", 10, 10, 60, 45);

        let y = 60;

        doc.setFontSize(16);
        doc.text(title, 10, y);
        y += 10;

        doc.setFontSize(12);
        doc.text("🍅 Ingredients:", 10, y);
        y += 7;
        ingredients.forEach((item) => {
            doc.text(`- ${item}`, 10, y);
            y += 7;
        });

        y += 5;
        doc.text("📝 Instructions:", 10, y);
        y += 7;
        steps.forEach((step, i) => {
            doc.text(`${i + 1}. ${step}`, 10, y);
            y += 7;
        });

        doc.save(`${title}.pdf`);
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
            <button onClick={handleDownloadPDF}>📄 Download PDF</button>

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
