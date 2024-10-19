import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../assets/images/logo512.png';
import picture from '../assets/images/Picture.png';

const Header = () => {
  const navigate = useNavigate();
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldAnimate(true);
    }, 100);

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsNavVisible(true);
      } else {
        setIsNavVisible(false);
      }
    };

    const handleMouseMove = (e) => {
      if (e.clientY <= 50) {
        setIsNavVisible(true);
      } else if (window.scrollY <= 50) {
        setIsNavVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleLogoClick = () => {
    navigate('/', { replace: true });
    window.location.reload();
  };

  return (
    <header className="header">
      <nav className={`top-nav ${isNavVisible ? 'visible' : ''}`}>
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
        <a href="#contact" className="contact-button">CONTACT</a>
      </nav>
      
      <div className="header-content">
        <div className="text-content">
          <h1>Tools to Power Creative Thinking</h1>
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
    </header>
  );
};

export default Header;
