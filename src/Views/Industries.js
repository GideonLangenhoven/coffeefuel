// src/Views/Industries.js
import React from 'react';
import Header from './Header';
import Footer from '../Components/Footer';
import './PageStyles.css';

const Industries = () => {
  // Function to scroll to section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Check for URL parameters on component mount
  React.useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        scrollToSection(hash);
      }, 100);
    }
  }, []);

  return (
    <div className="page-wrapper">
      <Header />
      <div className="page-container">
        <h1 className="page-title">Industries</h1>
        
        <div className="section-nav">
          <button onClick={() => scrollToSection('manufacturing')}>Manufacturing</button>
          <button onClick={() => scrollToSection('automotive')}>Automotive</button>
          <button onClick={() => scrollToSection('healthcare')}>Healthcare</button>
        </div>

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
      <Footer />
    </div>
  );
};

export default Industries;