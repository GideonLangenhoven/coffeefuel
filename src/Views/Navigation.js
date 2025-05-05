// src/Views/Navigation.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import './Navigation.css';

// Import Logos (Ensure paths are correct and files exist in src/assets/images/)
import solpowerLogoMain from '../assets/images/logo1.png';
import solpowerLogo from '../assets/images/logo2.png';
import solpowerLogoHover from '../assets/images/logo3 (1).png';
// half-sun logo is applied via CSS background

// Updated Navigation Items
const navItems = [
  { name: "Home", link: "/", id: "home" },
  { name: "Residential", link: "/residential", id: "residential" },
  { name: "Commercial", link: "/commercial", id: "commercial" },
  { name: "How It Works", link: "/how-it-works", id: "how-it-works" },
  { name: "FAQs", link: "/faqs", id: "faqs" },
  { name: "About Us", link: "/about", id: "about" },
  { name: "Contact", link: "/contact", id: "contact" },
];

const NavigationBar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  // Scroll detection effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goHome = () => navigate('/');
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleMobileLinkClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => (window.innerWidth > 1024 && isMenuOpen) && setIsMenuOpen(false); // Match CSS breakpoint
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  return (
    <>
      {/* Using the state/handlers now */}
      <nav className={`top-nav ${isScrolled ? 'scrolled' : ''}`}>
        <div
          className="logo-container"
          onClick={goHome}
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
        >
          <div className="logo-secondary-container">
            <img
              src={isLogoHovered ? solpowerLogoHover : solpowerLogo}
              alt="SolPower Secondary Logo"
              className={`logo-secondary ${isLogoHovered ? 'hovered' : ''}`}
            />
          </div>
          <img
            src={solpowerLogoMain}
            alt="SolPower Main Logo"
            className="logo"
          />
        </div>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.id} className="nav-link">
              <NavLink
                to={item.link}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="right-nav">
          <Link to="/contact" className="contact-button-nav">
            I'm Interested
          </Link>
          <div className="corner-logo-container" title="SolPower" onClick={goHome}>
             {/* This div uses the background image from CSS */}
             <div className="corner-logo-half-sun"></div>
           </div>
          <div className={`burger-menu ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={isMenuOpen}>
            <div className="burger-bar"></div> <div className="burger-bar"></div> <div className="burger-bar"></div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Only render when isMenuOpen is true */}
      {isMenuOpen && (
        <div className="mobile-nav active">
          <ul className="mobile-nav-links">
            {navItems.map(item => (
              <li key={`mobile-${item.id}`} className="mobile-nav-link">
                <NavLink to={item.link} className={({ isActive }) => isActive ? 'active' : ''} onClick={() => handleMobileLinkClick(item.link)}>
                  {item.name}
                </NavLink>
              </li>
            ))}
            <li className="mobile-nav-link contact-link-mobile">
              <Link to="/contact" className="contact-button-nav" onClick={() => handleMobileLinkClick('/contact')}>
                I'm Interested
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default NavigationBar;