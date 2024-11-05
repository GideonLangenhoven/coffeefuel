// src/Views/Industries.js
import React from 'react';
import './PageStyles.css';

const Industries = () => {
  // Function to scroll to section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Industries</h1>
      
      {/* Navigation Links */}
      <div className="section-nav">
        <button onClick={() => scrollToSection('manufacturing')}>Manufacturing</button>
        <button onClick={() => scrollToSection('automotive')}>Automotive</button>
        <button onClick={() => scrollToSection('healthcare')}>Healthcare</button>
      </div>

      {/* Content Sections */}
      <section id="manufacturing" className="content-section">
        <h2>Manufacturing</h2>
        <p>Comprehensive solutions for the manufacturing sector...</p>
      </section>

      <section id="automotive" className="content-section">
        <h2>Automotive</h2>
        <p>Innovative approaches for automotive industry challenges...</p>
      </section>

      <section id="healthcare" className="content-section">
        <h2>Healthcare</h2>
        <p>Advanced solutions for healthcare providers...</p>
      </section>
    </div>
  );
};

export default Industries;