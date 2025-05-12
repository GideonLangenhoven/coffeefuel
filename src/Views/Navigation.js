// src/Views/Navigation.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import './Navigation.css';

// Import Logos
import solpowerLogoMain from '../assets/images/logo1.png';
import solpowerLogo from '../assets/images/logo2.png';
import solpowerLogoHover from '../assets/images/logo3 (1).png';

// NavigationBar component now receives paths from App.js
const NavigationBar = ({ paths }) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  // Define nav items using the paths prop
  const navItems = [
    { name: "Home", link: paths.home, id: "home" },
    { name: "Residential Solar", link: paths.residential, id: "residential" },
    { name: "Commercial Solar", link: paths.commercial, id: "commercial" },
    { name: "How It Works", link: paths.howItWorks, id: "how-it-works" },
    { name: "Solar FAQs", link: paths.faqs, id: "faqs" },
    { name: "About SolPower", link: paths.about, id: "about" },
    { name: "Get Quote", link: paths.contact, id: "contact" }, // Changed "Contact" to "Get Quote" for clarity
  ];

  // Scroll detection effect (Keep as is)
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goHome = () => navigate(paths.home);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleMobileLinkClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  // Close mobile menu on resize (Keep as is)
  useEffect(() => {
    const handleResize = () => (window.innerWidth > 1024 && isMenuOpen) && setIsMenuOpen(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // SEO: Descriptive alt text
  const mainLogoAlt = "SolPower Cape Town - Solar Power Installation & Solutions Logo";
  const secondaryLogoAlt = "SolPower Secondary Logo Mark";
  const cornerLogoTitle = "SolPower Homepage"; // Tooltip for the corner logo

  return (
    <>
      <nav className={`top-nav ${isScrolled ? 'scrolled' : ''}`} aria-label="Main navigation menu">
        <div
          className="logo-container"
          onClick={goHome}
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
          role="button"
          tabIndex={0} // Make it keyboard focusable
          aria-label="Go to SolPower Homepage" // Screen reader accessibility
        >
          <div className="logo-secondary-container">
            <img
              src={isLogoHovered ? solpowerLogoHover : solpowerLogo}
              alt={secondaryLogoAlt}
              className={`logo-secondary ${isLogoHovered ? 'hovered' : ''}`}
              loading="lazy" // Defer loading offscreen images
            />
          </div>
          <img
            src={solpowerLogoMain}
            alt={mainLogoAlt}
            className="logo"
            loading="eager" // Load the main logo immediately
          />
        </div>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.id} className="nav-link">
              <NavLink
                to={item.link}
                className={({ isActive }) => (isActive ? 'active' : '')}
                // NavLink automatically adds aria-current="page" when active
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="right-nav">
          {/* Changed button text for stronger Call to Action */}
          <Link to={paths.contact} className="contact-button-nav">
            Get My Free Quote
          </Link>
          <div className="corner-logo-container" title={cornerLogoTitle} onClick={goHome} role="button" tabIndex={0} aria-label={cornerLogoTitle}>
             <div className="corner-logo-half-sun"></div>
           </div>
          <button // Changed to button for better accessibility practices for toggles
            className={`burger-menu ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle mobile navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-menu" // Links button to the mobile menu
          >
            <div className="burger-bar"></div> <div className="burger-bar"></div> <div className="burger-bar"></div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {/* Added id for aria-controls */}
      {isMenuOpen && (
        <div className="mobile-nav active" id="mobile-nav-menu" role="navigation" aria-label="Mobile navigation menu">
          <ul className="mobile-nav-links">
            {navItems.map(item => (
              <li key={`mobile-${item.id}`} className="mobile-nav-link">
                <NavLink to={item.link} className={({ isActive }) => isActive ? 'active' : ''} onClick={() => handleMobileLinkClick(item.link)}>
                  {item.name}
                </NavLink>
              </li>
            ))}
            {/* Repeat contact button in mobile menu */}
            <li className="mobile-nav-link contact-link-mobile">
              <Link to={paths.contact} className="contact-button-nav" onClick={() => handleMobileLinkClick(paths.contact)}>
                Get My Free Quote
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default NavigationBar;