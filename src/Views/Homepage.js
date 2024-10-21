// src/Views/Homepage.js
import React from 'react';
import './Homepage.css';
import Header from './Header.js';
import Banner from './Banner';

const HomePage = () => {
  return (
    <div className="container-fluid">
      <div className="background">
        <div className="cube"></div>
        <div className="cube"></div>
        <div className="cube"></div>
        <div className="cube"></div>
        <div className="cube"></div>
      </div>
      <div className="scrollable-content">
        {/* <Banner /> */}
        <Header />
        
        {/* Add more content for your homepage here if needed */}
      </div>
    </div>
  );
};

export default HomePage;
