// src/Views/Services.js
import React from 'react';
import './PageStyles.css';

const Services = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Services</h1>
      
      <div className="section-nav">
        <button onClick={() => scrollToSection('consulting')}>Consulting</button>
        <button onClick={() => scrollToSection('strategy')}>Strategy</button>
        <button onClick={() => scrollToSection('technology')}>Technology</button>
      </div>

      <section id="consulting" className="content-section">
        <h2>Consulting</h2>
        <p>Expert consulting services for business growth...</p>
      </section>

      <section id="strategy" className="content-section">
        <h2>Strategy</h2>
        <p>Strategic planning and implementation services...</p>
      </section>

      <section id="technology" className="content-section">
        <h2>Technology</h2>
        <p>Cutting-edge technology solutions...</p>
      </section>
    </div>
  );
};

export default Services;