import React from 'react';
import './Modals.css';

function InstructionsModal({ instructions, onClose }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>✖</button>
                <h2>📝 Full Recipe</h2>
                <ol>
                    {instructions.map((step, index) => (
                        <li key={index}>👉 {step}</li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

export default InstructionsModal;
