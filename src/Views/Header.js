// src/Views/Header.js
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/images/logo512.png';
import picture1 from '../assets/images/Picture.png';
import picture2 from '../assets/images/Picture2.png';
import picture3 from '../assets/images/Picture3.png';
import VideoPopup from '../Components/VideoPopup';

const Header = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const images = [picture1, picture2, picture3];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showVideoPopup, setShowVideoPopup] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    // Image rotation
    const imageRotation = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => {
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
      {/* Navigation Bar */}
      <nav className={`top-nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="logo-container" onClick={handleTerbigenClick}>
          <img src={logo} alt="Terbigen Logo" className="logo" />
          <span className="brand-slogan">
            <span className="terbigen-text">Terbigen</span>
          </span>
        </div>
        <ul className="nav-links">
          {/* Navigation Links with Drop-Down Menus */}
          <li className="nav-link">
            <span>
              Industries <span className="dropdown-arrow">&#9662;</span>
            </span>
            <div className="dropdown-content">
              <Link to="/industry1">Industry 1</Link>
              <Link to="/industry2">Industry 2</Link>
              <Link to="/industry3">Industry 3</Link>
              <Link to="/industry4">Industry 4</Link>
              <Link to="/industry5">Industry 5</Link>
            </div>
          </li>
          <li className="nav-link">
            <span>
              Services <span className="dropdown-arrow">&#9662;</span>
            </span>
            <div className="dropdown-content">
              <Link to="/service1">Service 1</Link>
              <Link to="/service2">Service 2</Link>
              <Link to="/service3">Service 3</Link>
              <Link to="/service4">Service 4</Link>
              <Link to="/service5">Service 5</Link>
            </div>
          </li>
          <li className="nav-link">
            <span>
              Insights <span className="dropdown-arrow">&#9662;</span>
            </span>
            <div className="dropdown-content">
              <Link to="/insight1">Insight 1</Link>
              <Link to="/insight2">Insight 2</Link>
              <Link to="/insight3">Insight 3</Link>
              <Link to="/insight4">Insight 4</Link>
              <Link to="/insight5">Insight 5</Link>
            </div>
          </li>
          <li className="nav-link">
            <span>
              About Us <span className="dropdown-arrow">&#9662;</span>
            </span>
            <div className="dropdown-content">
              <Link to="/about">Company</Link>
              <Link to="/team">Team</Link>
              <Link to="/careers">Careers</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/faq">FAQ</Link>
            </div>
          </li>
        </ul>
        <div className="right-nav">
          <button className="bbeee-button" onClick={handleBBEEEClick}>
            BBEEE Level 1 contributor
          </button>
          <a href="#contact" className="contact-button">
            CONTACT
          </a>
          <div
            className={`burger-menu ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
          >
            <div className="burger-bar"></div>
            <div className="burger-bar"></div>
            <div className="burger-bar"></div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-nav-header">
          <div className="close-icon" onClick={toggleMenu}>
            &times;
          </div>
        </div>
        <ul className="mobile-nav-links">
          <li className="mobile-nav-link">
            <span onClick={toggleMenu}>
              <Link to="/industries">Industries</Link>
            </span>
          </li>
          <li className="mobile-nav-link">
            <span onClick={toggleMenu}>
              <Link to="/services">Services</Link>
            </span>
          </li>
          <li className="mobile-nav-link">
            <span onClick={toggleMenu}>
              <Link to="/insights">Insights</Link>
            </span>
          </li>
          <li className="mobile-nav-link">
            <span onClick={toggleMenu}>
              <Link to="/about">About Us</Link>
            </span>
          </li>
          <li className="mobile-nav-link">
            <button
              className="bbeee-button"
              onClick={() => {
                handleBBEEEClick();
                toggleMenu();
              }}
            >
              BBEEE Level 1 contributor
            </button>
          </li>
          <li className="mobile-nav-link contact-link">
            <a href="#contact" className="contact-button" onClick={toggleMenu}>
              CONTACT
            </a>
          </li>
        </ul>
      </div>

      {/* Header Content */}
      <div className="header-content">
        <div className="text-content">
          <div className="main">
            <h1>
              A Fresh Approach to Growing
              <br />
              People and Business:
            </h1>
            {/* Roller centered below the text */}
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

      {/* Ocean Waves */}
      <div className="ocean">
        <div className="wave"></div>
        <div className="wave"></div>
      </div>

      {/* Video Popup */}
      {showVideoPopup && (
        <VideoPopup
          videoUrl="https://www.youtube.com/watch?v=uQfXIDnoSxE"
          onClose={handleCloseVideo}
        />
      )}
    </header>
  );
};

export default Header;
