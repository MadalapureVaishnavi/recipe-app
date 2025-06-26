import React, { useState, useEffect } from "react";
import IngredientsModal from "./IngredientsModal";
import InstructionsModal from "./InstructionsModal";
import { guessRecipeDetails } from "../utils/aiGuessService";
import jsPDF from "jspdf";
import "./modals.css";

function YouTubeRecipeCard({ video, isFavorite, onToggleFavorite }) {
    const [showIngredients, setShowIngredients] = useState(false);
    const [showInstructions, setShowInstructions] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);

    const { videoId } = video.id;
    const { title, description, channelTitle } = video.snippet;

    // Toggle modal-open class on body to block background when modal is open
    useEffect(() => {
        const isModalOpen = showIngredients || showInstructions;
        document.body.classList.toggle("modal-open", isModalOpen);

        return () => {
            document.body.classList.remove("modal-open");
        };
    }, [showIngredients, showInstructions]);

    // Fetch recipe details (ingredients and steps)
    const fetchRecipeDetails = async () => {
        const result = await guessRecipeDetails(`${title}\n${description}`);
        setIngredients(result.ingredients);
        setSteps(result.steps);
    };

    const handleShowIngredients = async () => {
        await fetchRecipeDetails();
        setShowIngredients(true);
    };

    const handleShowInstructions = async () => {
        await fetchRecipeDetails();
        setShowInstructions(true);
    };

    // Generate PDF
    const handleDownloadPDF = async () => {
        const result = await guessRecipeDetails(`${title}\n${description}`);
        const { ingredients, steps } = result;

        const doc = new jsPDF();
        const imgUrl = video.snippet.thumbnails?.high?.url;

        const imgBlob = await fetch(imgUrl).then(res => res.blob());
        const imageBase64 = await new Promise(resolve => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(imgBlob);
        });

        doc.addImage(imageBase64, "JPEG", 10, 10, 60, 45);

        let y = 60;
        doc.setFontSize(16);
        doc.text(title, 10, y);
        y += 10;

        doc.setFontSize(12);
        doc.text("🍅 Ingredients:", 10, y);
        y += 7;
        ingredients.forEach(item => {
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
        <div className={`recipe-card ${showIngredients || showInstructions ? 'no-interaction' : ''}`}>
            <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title={title}
                width="100%"
                height="200"
                allowFullScreen
            />

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
