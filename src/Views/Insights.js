// src/Views/Insights.js
import React from 'react';
import Header from './Header';
import Footer from '../Components/Footer';
import './PageStyles.css';

const Insights = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
        <h1 className="page-title">Insights</h1>
        
        <div className="section-nav">
          <button onClick={() => scrollToSection('blog')}>Blog</button>
          <button onClick={() => scrollToSection('news')}>News</button>
          <button onClick={() => scrollToSection('events')}>Events</button>
        </div>

        <section id="blog" className="content-section">
          <h2>Blog</h2>
          <p>Latest insights and thought leadership...</p>
        </section>

        <section id="news" className="content-section">
          <h2>News</h2>
          <p>Latest company and industry news...</p>
        </section>

        <section id="events" className="content-section">
          <h2>Events</h2>
          <p>Upcoming events and conferences...</p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Insights;