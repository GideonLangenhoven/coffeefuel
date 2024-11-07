import React, { useState, useEffect, useRef } from 'react';
import './CompanyShowcase.css';

// Import your logo images
import Logo1 from '../assets/images/Logo1.png';
import Moore from '../assets/images/Moore.png';
import Rein from '../assets/images/Rein.png';
import TMA from '../assets/images/TMA.png';
import Connect from '../assets/images/Connect2.png';
import Gold from '../assets/images/Gold-Youth.png';
import chamber from '../assets/images/Chamber.png';
import City from '../assets/images/CityofCapeTown.png';
import Chat2Brand from '../assets/images/Chat2Brand.png';
// Import the new image
import TotoImage from '../assets/images/Toto.png'; // Adjust the extension if needed
import Animation from '../assets/images/Animation.png';

const CompanyShowcase = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [hasScrolledIntoView, setHasScrolledIntoView] = useState(false);
  const [startAnimations, setStartAnimations] = useState(false);
  const showcaseRef = useRef(null);

  const toggleVideo = () => setShowVideo(!showVideo);

  // Array of logo image paths
  const logos = [
    Logo1,
    Moore,
    Rein,
    TMA,
    Connect,
    Gold,
    chamber,
    City,
    Chat2Brand,
  ];

  // Observer to detect when the component is in view
  useEffect(() => {
    const element = document.getElementById('company-showcase');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasScrolledIntoView(true);

          // Start the animations after a 0.5-second delay
          setTimeout(() => {
            setStartAnimations(true);
          }, 500);
        }
      },
      { threshold: 0.1 }
    );

    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (showcaseRef.current) {
        const scrollY = window.scrollY;
        const element = showcaseRef.current;
        const rect = element.getBoundingClientRect();
        
        // Only apply the effect when the element is in view
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const scrollPosition = (scrollY - rect.top) * 0.1;
          element.style.backgroundPosition = `0 ${scrollPosition}px`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={showcaseRef}
      id="company-showcase"
      className={`company-showcase-bg ${hasScrolledIntoView ? 'visible' : 'hidden'}`}
    >
      <div className="company-showcase-container">
        {/* Logo Grid */}
        <div className={`company-showcase-logo-grid ${hasScrolledIntoView ? 'animate-logos' : ''}`}>
          {logos.map((logoSrc, index) => (
            <div key={index} className="company-showcase-logo-item">
              <img src={logoSrc} alt={`Company Logo ${index + 1}`} />
            </div>
          ))}
        </div>

        {/* Content Section */}
        <div className="company-showcase-content">
          {/* Text Content */}
          <div className={`company-showcase-text ${startAnimations ? 'animate-text' : ''}`}>
            <h1 className="company-showcase-title">
              <span className="empowering-word">Empowering</span> Your Business Growth Story
            </h1>
            <p className="company-showcase-description">
              Growing a small to medium business can be challenging. Many entrepreneurs struggle to launch new ideas,
              find the right growth path, or plan a successful exit strategy. At Terbigen, we understand these pain
              points. We offer structured expertise to help you overcome obstacles and achieve your goals. With our
              specialized Reinvention tools, we guide you through clear pathways towards revitalization and sustainable
              growth. Let us help you unlock your business's full potential.
            </p>
            <button className="company-showcase-button">Discover What We Do</button>
          </div>

          {/* Media Content */}
          <div className={`company-showcase-media ${startAnimations ? 'animate-image' : ''}`}>
            <img
              src={Animation}
              alt="Video Thumbnail"
              className="company-showcase-image"
              onClick={toggleVideo}
            />
            {showVideo && (
              <div
                className="company-showcase-video-overlay"
                onClick={toggleVideo}
              >
                <div
                  className="company-showcase-video-container"
                  onClick={(e) => e.stopPropagation()}
                >
                  <iframe
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    className="company-showcase-video"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title="Company Video"
                  ></iframe>
                  <button
                    className="company-showcase-close-button"
                    onClick={toggleVideo}
                    aria-label="Close Video"
                  >
                    &times;
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyShowcase;
