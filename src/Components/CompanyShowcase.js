import React, { useState } from 'react';
import './CompanyShowcase.css';

const CompanyShowcase = () => {
  const [showVideo, setShowVideo] = useState(false);

  const toggleVideo = () => setShowVideo(!showVideo);

  return (
    <div className="company-showcase-bg">
      <div className="company-showcase-container">
        {/* Logo placeholders */}
        <div className="company-showcase-logo-grid">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="company-showcase-logo-item">
              Logo {i + 1}
            </div>
          ))}
        </div>

        <div className="company-showcase-content">
          <div className="company-showcase-text">
            <h2 className="company-showcase-title">Comprehensive expertise from strategy to execution</h2>
            <p className="company-showcase-description">
              From business model innovation to operational improvement, we help our clients break
              away from the pack. We craft tailored, state of the art solutions. Never copy and paste.
              We continually enhance our existing capabilities, focusing on the tech of tomorrow, to
              deliver boardroom level strategy through to execution.
            </p>
            <button className="company-showcase-button">
              What we do
            </button>
          </div>
          <div className="company-showcase-media">
            <img
              src="/placeholder.svg"
              alt="Decorative image"
              className="company-showcase-image"
              onClick={toggleVideo}
            />
            {showVideo && (
              <div className="company-showcase-video-overlay">
                <div className="company-showcase-video-container">
                  <iframe
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    className="company-showcase-video"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                </div>
                <button
                  className="company-showcase-close-button"
                  onClick={toggleVideo}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyShowcase;
