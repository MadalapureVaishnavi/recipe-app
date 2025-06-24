import React from 'react';
import './Modals.css';

function IngredientsModal({ ingredients, onClose }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>✖</button>
                <h2>🍅 Ingredients</h2>
                <ul>
                    {ingredients.map((item, index) => (
                        <li key={index}>🔹 {item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default IngredientsModal;
