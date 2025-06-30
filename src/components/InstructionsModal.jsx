import React, { useEffect } from 'react';
import './modals.css';

function InstructionsModal({ instructions, onClose }) {

    // Disable background scroll while modal is open
    useEffect(() => {
        document.body.classList.add("modal-open");
        return () => {
            document.body.classList.remove("modal-open");
        };
    }, []);

    const stopPropagation = (e) => {
        e.stopPropagation(); // Prevent clicks from closing or bubbling
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content" onClick={stopPropagation}>
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
