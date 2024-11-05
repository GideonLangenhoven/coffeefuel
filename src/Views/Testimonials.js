import React from 'react';
import './PageStyles.css';

const Testimonials = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Testimonials</h1>
      
      <div className="section-nav">
        <button onClick={() => scrollToSection('client-stories')}>Client Stories</button>
        <button onClick={() => scrollToSection('success-cases')}>Success Cases</button>
        <button onClick={() => scrollToSection('feedback')}>Feedback</button>
      </div>

      <section id="client-stories" className="content-section">
        <h2>Client Stories</h2>
        <p>Real stories from our clients...</p>
      </section>

      <section id="success-cases" className="content-section">
        <h2>Success Cases</h2>
        <p>Our successful project implementations...</p>
      </section>

      <section id="feedback" className="content-section">
        <h2>Feedback</h2>
        <p>What our clients say about us...</p>
      </section>
    </div>
  );
};

export default Testimonials; 