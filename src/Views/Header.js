// src/Views/Header.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../assets/images/logo512.png';
import picture from '../assets/images/Picture.png';

const Header = () => {
  const navigate = useNavigate();
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogoClick = () => {
    navigate('/', { replace: true });
    window.location.reload();
  };

  const handleBBEEEClick = () => {
    // Add your BBEEE button click logic here
    console.log('BBEEE button clicked');
  };

  const animateWord = (word) => {
    return word.split('').map((letter, index) => (
      <span key={index} className="animated-letter">
        {letter}
      </span>
    ));
  };

  return (
    <header className="header">
      <nav className={`top-nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="left-nav">
          <div className="logo-container" onClick={handleLogoClick}>
            <img src={logo} alt="Terbigen Logo" className="logo" />
            <span className="brand-slogan">
              <span className="terbigen-text">Terbigen</span>
            </span>
          </div>
          <ul className="nav-links">
            <li><a href="#what" className="nav-link">Home</a></li>
            <li><a href="#how" className="nav-link">About</a></li>
            <li><a href="#who" className="nav-link">Contact</a></li>
            <li><a href="#clients" className="nav-link">Services</a></li>
          </ul>
        </div>
        <button className="bbeee-button" onClick={handleBBEEEClick}>BBEEE Level 1 contributor</button>
        <div className="right-nav">
          <a href="#contact" className="contact-button">CONTACT</a>
        </div>
      </nav>
      
      <div className="header-content">
        <div className="text-content">
          <h1>
            A <span className="animated-word fresh">{animateWord('Fresh')}</span> Approach to{' '}
            <span className="animated-word growing">{animateWord('Growing')}</span> People and Business
          </h1>
          <p>Because creative thinking powers problem solving, innovation, people & culture.</p>
          <a href="#video" className="cta-button">WATCH THE VIDEO</a>
        </div>
        <div className="image-content">
          <img 
            src={picture} 
            alt="Team Collaboration" 
            className={`main-image animated-image ${shouldAnimate ? 'slide-in' : ''}`} 
          />
        </div>
      </div>
      {/* You can add more content here for the remaining 2 viewport heights */}
    </header>
  );
};

export default Header;
