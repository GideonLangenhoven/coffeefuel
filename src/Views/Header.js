// src/Views/Header.js
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/images/logo512.png';
import picture1 from '../assets/images/Picture.png';
import picture2 from '../assets/images/Picture2.png';
import picture3 from '../assets/images/Picture3.png';
import Banner from './Banner';
import VideoPopup from '../Components/VideoPopup';

const Header = () => {
  const navigate = useNavigate();
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const images = [picture1, picture2, picture3];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showVideoPopup, setShowVideoPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldAnimate(true);
    }, 100);

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Image rotation
    const imageRotation = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(imageRotation);
    };
  }, []);

  const handleTerbigenClick = () => {
    navigate('/', { replace: true });
    window.location.reload();
  };

  const handleBBEEEClick = () => {
    console.log('BBEEE button clicked');
    // You can add logic here for the BBEEE button click
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleWatchVideo = (e) => {
    e.preventDefault();
    setShowVideoPopup(true);
  };

  const handleCloseVideo = () => {
    setShowVideoPopup(false);
  };

  return (
    <header className="header">
      <nav className={`top-nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="left-nav">
          <div className="logo-container" onClick={handleTerbigenClick}>
            <img src={logo} alt="Terbigen Logo" className="logo" />
            <span className="brand-slogan">
              <span className="terbigen-text">Terbigen</span>
            </span>
          </div>
          <ul className="main-nav-links">
            <li><Link to="/home" className="nav-link">Home</Link></li>
            <li><Link to="/about" className="nav-link">About</Link></li>
            <li><Link to="/services" className="nav-link">Services</Link></li>
          </ul>
          <div className={`burger-menu ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <div className="burger-bar"></div>
            <div className="burger-bar"></div>
            <div className="burger-bar"></div>
          </div>
        </div>
        <div className="right-nav">
          <button className="bbeee-button" onClick={handleBBEEEClick}>BBEEE Level 1 contributor</button>
          <a href="#contact" className="contact-button">CONTACT</a>
        </div>
        <ul className={`mobile-nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><a href="#home" onClick={toggleMenu}>Home</a></li>
          <li><a href="#about" onClick={toggleMenu}>About</a></li>
          <li><a href="#services" onClick={toggleMenu}>Services</a></li>
          <li><a href="#contact" className="contact-button" onClick={toggleMenu}>Contact</a></li>
          <li><button className="bbeee-button" onClick={() => { handleBBEEEClick(); toggleMenu(); }}>BBEEE Level 1 contributor</button></li>
        </ul>
      </nav>
      
      <div className="header-content">
        <div className="text-content">
          <div className="main">
            <h1>A Fresh Approach to Growing<br />People and Business: 
              <div className="roller">
                <span id="rolltext">
                  Innovation<br/>
                  <span>Transformation</span><br/>
                  Agility<br/>
                  <span>Empowerment</span><br/>
                  Strategy<br/>
                  Vision<br/>
                  Growth<br/>
                  Adaptability<br/>
                </span>
              </div>
            </h1>
          </div>
          <div className="cta-container">
            <a href="#video" className="cta-button" onClick={handleWatchVideo}>WATCH THE VIDEO</a>
          </div>
        </div>
        <div className="image-content">
          <div className="main-image">
            <img 
              key={currentImage}
              src={images[currentImage]} 
              alt="Team Collaboration" 
            />
          </div>
        </div>
      </div>
      {showVideoPopup && (
        <VideoPopup
          videoUrl="https://www.youtube.com/watch?v=uQfXIDnoSxE"
          onClose={handleCloseVideo}
        />
      )}
      {/* You can add more content here for the remaining 2 viewport heights */}
    </header>
  );
};

export default Header;
