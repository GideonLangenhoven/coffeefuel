// CompanyShowcase.js

import React, { useState } from 'react';
import './CompanyShowcase.css';

// Import your logo images
import Logo1 from '../assets/images/Logo1.png';
import Logo4 from '../assets/images/Logo4.png';

// Import the new image
import TotoImage from '../assets/images/Toto.png'; // Adjust the extension if needed

const CompanyShowcase = () => {
  const [showVideo, setShowVideo] = useState(false);

  const toggleVideo = () => setShowVideo(!showVideo);

  // Array of logo image paths
  const logos = [Logo1, Logo4];

  return (
    <div className="company-showcase-bg">
      <div className="company-showcase-container">
        {/* Logo Grid */}
        <div className="company-showcase-logo-grid">
          {logos.map((logoSrc, index) => (
            <div key={index} className="company-showcase-logo-item">
              <img src={logoSrc} alt={`Company Logo ${index + 1}`} />
            </div>
          ))}
        </div>

        {/* Content Section */}
        <div className="company-showcase-content">
          {/* Text Content */}
          <div className="company-showcase-text">
            <h2 className="company-showcase-title">
              Empowering Your Business Growth Story
            </h2>
            <p className="company-showcase-description">
              Growing a small to medium business can be challenging. Many entrepreneurs struggle to launch new ideas, find the right growth path, or plan a successful exit strategy. At Terbigen, we understand these pain points. We offer structured expertise to help you overcome obstacles and achieve your goals. With our specialized Reinvention tools, we guide you through clear pathways towards revitalization and sustainable growth. Let us help you unlock your business's full potential.
            </p>
            <button className="company-showcase-button">Discover What We Do</button>
          </div>

          {/* Media Content */}
          <div className="company-showcase-media">
            <img
              src={TotoImage}
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
