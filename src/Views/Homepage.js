// src/Views/Homepage.js
import React from 'react';
import './Homepage.css';
import Header from './Header.js';

const HomePage = () => {
    return (
        <div className="cafe-homepage">
            <div className="content-wrapper">
                <Header />
                {/* Add more content for your homepage here if needed */}
            </div>
        </div>
    );
};

export default HomePage;
