import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Header.css';
import NavigationBar from './Navigation'; // Updated import
import picture1 from '../assets/images/Picture.png';
import picture2 from '../assets/images/Picture2.png';
import picture3 from '../assets/images/Picture3.png';

const Header = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const images = [picture1, picture2, picture3];
  const [showVideoPopup, setShowVideoPopup] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    const imageRotation = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(imageRotation);
    };
  }, [images.length]);

  const handleWatchVideo = (e) => {
    e.preventDefault();
    setShowVideoPopup(true);
  };

  const handleCloseVideo = () => {
    setShowVideoPopup(false);
  };

  return (
    <div className="header">
      <NavigationBar isScrolled={isScrolled} />
      <div className="header-content">
        <div className="text-content">
          <div className="main">
            <h1>
            Empowering dreamers 
            <br />
            visionaries and doers
              <br />
              to realise their ambitions
            </h1>
            <div className="roller">
              <div id="rolltext">
                Innovation
                <br />
                <span>Transformation</span>
                <br />
                Agility
                <br />
                <span>Empowerment</span>
                <br />
                Strategy
                <br />
                Vision
                <br />
                Growth
                <br />
                Adaptability
              </div>
            </div>
          </div>
          <div className="cta-container">
            <a href="#video" className="cta-button" onClick={handleWatchVideo}>
              WATCH THE VIDEO
            </a>
          </div>
        </div>
        <div className="image-content">
          <div className="main-image">
            <img src={images[currentImage]} alt="Team Collaboration" />
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <span>SCROLL</span>
        <div className="scroll-line"></div>
      </div>
      <div className="ocean">
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
      {showVideoPopup && (
        <div className="video-popup">
          <div className="video-popup-content">
            <button className="video-popup-close" onClick={handleCloseVideo}>
              &times;
            </button>
            <div className="video-container">
              <iframe
                src="https://www.youtube.com/embed/uQfXIDnoSxE?rel=0"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                sandbox="allow-scripts allow-same-origin"
                title="Video"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
