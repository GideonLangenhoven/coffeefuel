// src/Views/Banner.js
import React from 'react';
import './Banner.css'; // Import CSS

const Banner = () => {
    return (
        // Use class from CSS file
        <div className="banner">
            <h1>SolPower</h1> {/* Updated Brand */}
            <p>Your Partner for Reliable Energy Solutions</p> {/* Updated Tagline */}
        </div>
    );
};

export default Banner;