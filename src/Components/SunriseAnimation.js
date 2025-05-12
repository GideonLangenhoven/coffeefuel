// --- File: src/Components/SunriseAnimation.js ---
import React from 'react';
// Assuming the necessary CSS for this animation is in a global file
// or in the CSS of the component that uses this (like ContactSectionCTA.css if you create one)
// If styles are specific, create and import './SunriseAnimation.css'

const SunriseAnimation = ({ isAnimating }) => {
    // Ensure necessary CSS rules for .sunrise-animation-wrapper, .container, .sky, .sea, .light, .sun, .bird etc.
    // and the @keyframes are defined in a loaded CSS file (e.g., Homepage.css or a dedicated one).
    const animationClass = isAnimating ? 'animate-sunrise' : '';

    // Note: Ensure the keyframes (riseSun, sunLight, etc.) and the
    // base styles for .container, .sky, .sea, .sun, .bird etc. are present
    // in a CSS file that's imported globally or by the parent component.
    // We are taking the structure from Homepage.js
    return (
        <div className={`sunrise-animation-wrapper ${animationClass}`}>
            <div className="container">
                <div className="sky"></div>
                <div className="sea">
                    <div className="light"></div>
                </div>
                <div className="sun"></div>
                <div className="bird1"></div>
                <div className="birdr1"></div>
                <div className="bird"></div>
                <div className="birdr"></div>
                <div className="fin">
                    <div className="wave"></div>
                </div>
            </div>
        </div>
    );
};

export default SunriseAnimation;