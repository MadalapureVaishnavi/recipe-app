import React, { useEffect } from "react";
import "./modals.css";

function IngredientsModal({ ingredients, onClose }) {
    // Disable background scroll while modal is open
    useEffect(() => {
        document.body.classList.add("modal-open");
        return () => {
            document.body.classList.remove("modal-open");
        };
    }, []);

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content" onClick={stopPropagation}>
                <button className="close-button" onClick={onClose}>×</button>
                <h2>🍅 Ingredients</h2>
                <ul>
                    {ingredients.map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default IngredientsModal;
