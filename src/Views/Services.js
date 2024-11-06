// src/Views/Services.js

import React, { useEffect } from 'react';
import NavigationBar from './Navigation'; // Ensure this path is correct based on your project structure
import Footer from '../Components/Footer';
import './Services.css'; // Make sure to create this CSS file

const Services = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Adjust for fixed header height if necessary
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        scrollToSection(hash);
      }, 100);
    }
  }, []);

  return (
    <div className="services-page">
      <NavigationBar />
      <div className="services-container">
        <h1 className="services-title">Our Services</h1>
        <p className="services-subtitle">
          We offer a range of services designed to help your business thrive in today's competitive environment.
        </p>

        {/* Sections Navigation */}
        <div className="services-nav">
          <button onClick={() => scrollToSection('certified-reinvention-practitioners')}>
            Certified Reinvention Practitioners
          </button>
          <button onClick={() => scrollToSection('business-coaching')}>
            Business Coaching
          </button>
          <button onClick={() => scrollToSection('management-consulting')}>
            Management Consulting
          </button>
          <button onClick={() => scrollToSection('leadership-experience')}>
            Leadership Experience
          </button>
        </div>

        {/* Service Sections */}
        <section id="certified-reinvention-practitioners" className="service-section">
          <div className="service-content">
            <h2>Certified Reinvention Practitioners</h2>
            <p>
              Our Certified Reinvention Practitioners specialize in reinvention consulting, transformational leadership, and business reinvention strategies. We help organizations navigate change and emerge stronger.
            </p>
          </div>
        </section>

        <section id="business-coaching" className="service-section">
          <div className="service-content">
            <h2>Business Coaching</h2>
            <p>
              We offer executive coaching for business leaders, leadership development coaching, and business growth coaching to empower you to achieve your professional goals.
            </p>
          </div>
        </section>

        <section id="management-consulting" className="service-section">
          <div className="service-content">
            <h2>Management Consulting</h2>
            <p>
              Our management consulting services include strategic management consulting, change management consulting, and organizational transformation services to drive your business forward.
            </p>
          </div>
        </section>

        <section id="leadership-experience" className="service-section">
          <div className="service-content">
            <h2>Leadership Experience</h2>
            <p>
              Benefit from the expertise of our experienced business leaders, leadership expertise, and seasoned management consultants to guide your organization to success.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
