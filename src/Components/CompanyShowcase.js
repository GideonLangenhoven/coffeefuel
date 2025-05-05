// src/Components/CompanyShowcase.js
import React, { useState, useEffect, useRef } from 'react';
import './CompanyShowcase.css'; // Import CSS
import Button from './Button'; // Use reusable Button
import VideoPopup from './VideoPopup'; // Import VideoPopup

// TODO: Update with actual SolPower partner/client logos or remove logo section
import Logo1 from '../assets/images/client-logo-placeholder1.png';
import Logo2 from '../assets/images/client-logo-placeholder2.png';
import Logo3 from '../assets/images/client-logo-placeholder3.png';
import Logo4 from '../assets/images/client-logo-placeholder4.png';
// ... add more logos as needed

// TODO: Update with relevant SolPower image/video
import showcaseImage from '../assets/images/solar-installation-showcase.jpg'; // Example image

const CompanyShowcase = () => {
  // State for Video Popup
  const [showVideo, setShowVideo] = useState(false);
  // TODO: Update with actual SolPower video URL
  const videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ";

  // State & Ref for Intersection Observer animations
  const [isVisible, setIsVisible] = useState(false);
  const showcaseRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Observe only once
        }
      },
      { threshold: 0.1 } // Trigger when 10% is visible
    );

    const currentRef = showcaseRef.current; // Capture ref value
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef); // Cleanup observer
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  const toggleVideo = () => setShowVideo(!showVideo);

  // TODO: Update logo array
  const logos = [Logo1, Logo2, Logo3, Logo4]; // Example logos

  // TODO: Update text content for SolPower "Why Choose Us?" or similar section
  return (
    <section // Changed div to section for semantics
      ref={showcaseRef}
      id="company-showcase" // ID for potential navigation
      // Apply visibility class based on state for animations
      className={`company-showcase-bg ${isVisible ? 'visible' : 'hidden'}`}
    >
      <div className="company-showcase-container">
        {/* Optional: Logo Grid */}
        {logos.length > 0 && (
          <div className={`company-showcase-logo-grid ${isVisible ? 'animate-logos' : ''}`}>
            {logos.map((logoSrc, index) => (
              <div key={index} className="company-showcase-logo-item">
                <img src={logoSrc} alt={`Partner/Client Logo ${index + 1}`} />
              </div>
            ))}
          </div>
        )}

        {/* Content Section (Text + Image/Video) */}
        <div className="company-showcase-content">
          {/* Text Content */}
          <div className={`company-showcase-text ${isVisible ? 'animate-text' : ''}`}>
            <h2 className="company-showcase-title"> {/* Changed h1 to h2 if not main page title */}
              Why Choose <span className="empowering-word">SolPower?</span>
            </h2>
            <p className="company-showcase-description">
              Experience the SolPower difference: We combine top-quality solar panels and backup systems with expert installation and dedicated local support. We understand the challenges South Africans face with energy reliability and costs. Our mission is to provide sustainable, affordable solutions tailored to your home or business needs, ensuring peace of mind and long-term savings.
            </p>
            {/* Use reusable Button component */}
            <Button variant="primary" className="company-showcase-button" onClick={() => console.log('Discover clicked')}>
              Learn More About Our Approach
            </Button>
          </div>

          {/* Media Content */}
          <div className={`company-showcase-media ${isVisible ? 'animate-image' : ''}`}>
            <img
              src={showcaseImage}
              alt="SolPower solar panel installation"
              className="company-showcase-image"
              onClick={toggleVideo} // Make image clickable to show video
            />
            {/* Video Popup Component Rendered Conditionally */}
            {showVideo && (
              <VideoPopup videoUrl={videoUrl} onClose={toggleVideo} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyShowcase;