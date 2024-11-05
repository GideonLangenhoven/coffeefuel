// src/Views/AboutUs.js
import React from 'react';
import './PageStyles.css';

const AboutUs = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">About Us</h1>
      
      <div className="section-nav">
        <button onClick={() => scrollToSection('company')}>Company</button>
        <button onClick={() => scrollToSection('team')}>Team</button>
        <button onClick={() => scrollToSection('careers')}>Careers</button>
      </div>

      <section id="company" className="content-section">
        <h2>Company</h2>
        <p>Our story and mission...</p>
      </section>

      <section id="team" className="content-section">
        <h2>Team</h2>
        <p>Meet our expert team...</p>
      </section>

      <section id="careers" className="content-section">
        <h2>Careers</h2>
        <p>Join our growing team...</p>
      </section>
    </div>
  );
};

export default AboutUs;