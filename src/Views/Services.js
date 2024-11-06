import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavigationBar from './Navigation'; // Ensure this path is correct
import Footer from '../Components/Footer';
import './Services.css';

const Services = () => {
  const location = useLocation();

  const scrollToSection = (id) => {
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const yOffset = -80; // Adjust based on header height
        const yPosition = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: yPosition, behavior: 'smooth' });
      }
    }, 0);
  };

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      scrollToSection(hash);
    }
  }, [location]);

  return (
    <div className="services-page">
      <NavigationBar />
      <div className="services-hero">
        <div className="services-header-container">
          <div className="services-header-content">
            <h5 className="services-header-title">SERVICES</h5>
            <p className="services-header-description">
              We are continuously building out our capabilities to help you supercharge every stage of your business journey, providing expertise from boardroom-level strategy to execution.
            </p>
          </div>
        </div>
      </div>

      <div className="services-nav">
        <button onClick={() => scrollToSection('reinvention')}>Reinvention Practitioners</button>
        <button onClick={() => scrollToSection('coaching')}>Business Coaching</button>
        <button onClick={() => scrollToSection('consulting')}>Management Consulting</button>
        <button onClick={() => scrollToSection('leadership')}>Leadership Experience</button>
      </div>

      <section id="reinvention" className="service-section">
        <div className="service-card">
          <h2>Certified Reinvention Practitioners</h2>
          <p>Guiding organizations through transformational change to emerge stronger and more resilient.</p>
        </div>
      </section>

      <section id="coaching" className="service-section">
        <div className="service-card">
          <h2>Business Coaching</h2>
          <p>Empowering leaders with the skills and strategies needed to achieve professional excellence.</p>
        </div>
      </section>

      <section id="consulting" className="service-section">
        <div className="service-card">
          <h2>Management Consulting</h2>
          <p>Delivering insights and solutions that drive organizational growth and efficiency.</p>
        </div>
      </section>

      <section id="leadership" className="service-section">
        <div className="service-card">
          <h2>Leadership Experience</h2>
          <p>Leveraging seasoned expertise to guide your organization towards sustained success.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
