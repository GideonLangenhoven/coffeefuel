// src/Views/Navigation.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import './Navigation.css'; // Ensure this is linked correctly

// Import Logos
import solpowerLogoMain from '../assets/images/logo1.png';
import solpowerLogo from '../assets/images/logo2.png';
import solpowerLogoHover from '../assets/images/logo3 (1).png';

const NavigationBar = ({ paths }) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [hoveredNavItem, setHoveredNavItem] = useState(null);

  const navItems = [
    { name: "Home", link: paths.home, id: "home" },
    { name: "Residential Solar", link: paths.residential, id: "residential" },
    { name: "Commercial Solar", link: paths.commercial, id: "commercial" },
    { name: "How It Works", link: paths.howItWorks, id: "how-it-works" },
    {
      name: "Solar FAQs",
      link: paths.faqs,
      id: "faqs",
      subItems: [
        { name: "Learn about Solar Power", link: paths.learnSolar, id: "learn-solar" }
      ]
    },
    {
      name: "About SolPower",
      link: paths.about,
      id: "about",
      subItems: [
        { name: "Gallery", link: paths.gallery, id: "gallery" }
      ]
    },
    { name: "Get Quote", link: paths.contact, id: "contact" },
  ];

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

  useEffect(() => {
    const handleResize = () => (window.innerWidth > 1024 && isMenuOpen) && setIsMenuOpen(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  const mainLogoAlt = "SolPower Cape Town - Solar Power Installation & Solutions Logo";
  const secondaryLogoAlt = "SolPower Secondary Logo Mark";
  const cornerLogoTitle = "SolPower Homepage";

  return (
    <>
      <nav className={`top-nav ${isScrolled ? 'scrolled' : ''}`} aria-label="Main navigation menu">
        <div
          className="logo-container"
          onClick={goHome}
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
          role="button"
          tabIndex={0}
          aria-label="Go to SolPower Homepage"
        >
          <div className="logo-secondary-container">
            <img
              src={isLogoHovered ? solpowerLogoHover : solpowerLogo}
              alt={secondaryLogoAlt}
              className={`logo-secondary ${isLogoHovered ? 'hovered' : ''}`}
              loading="lazy"
            />
          </div>
          <img
            src={solpowerLogoMain}
            alt={mainLogoAlt}
            className="logo"
            loading="eager"
          />
        </div>
        <ul className="nav-links">
          {navItems.map((item) => (
            <li
              key={item.id}
              className={`nav-link-item ${item.subItems ? 'has-submenu' : ''}`}
              onMouseEnter={() => item.subItems && setHoveredNavItem(item.id)}
              onMouseLeave={() => item.subItems && setHoveredNavItem(null)}
            >
              <NavLink
                to={item.link}
                className={({ isActive }) => {
                  // Parent link is active if its path matches, or if a sub-item is active and it's the corresponding parent
                  // This logic might need refinement based on exact active state requirements for parents of active children
                  if (isActive && !item.subItems) return 'active';
                  if (item.subItems && hoveredNavItem === item.id) { // Check if any subitem is active
                    const isAnySubItemActive = item.subItems.some(sub => window.location.pathname === sub.link);
                    if (isAnySubItemActive) return 'active'; // Potentially style parent if child is active
                  }
                  return '';
                }}
              >
                {item.name}
              </NavLink>
              {item.subItems && hoveredNavItem === item.id && ( // Controlled by state for hover
                <ul className="sub-nav-menu">
                  {item.subItems.map(subItem => (
                    <li key={subItem.id} className="sub-nav-link-item">
                      <NavLink
                        to={subItem.link}
                        className={({ isActive }) => (isActive ? 'active' : '')}
                        // Removed target and rel attributes to open in the same tab
                      >
                        {subItem.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <div className="right-nav">
          <Link to={paths.contact} className="contact-button-nav">
            Get My Free Quote
          </Link>
          <div className="corner-logo-container" title={cornerLogoTitle} onClick={goHome} role="button" tabIndex={0} aria-label={cornerLogoTitle}>
            <div className="corner-logo-half-sun"></div>
          </div>
          <button
            className={`burger-menu ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle mobile navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-menu"
          >
            <div className="burger-bar"></div> <div className="burger-bar"></div> <div className="burger-bar"></div>
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="mobile-nav active" id="mobile-nav-menu" role="navigation" aria-label="Mobile navigation menu">
          <ul className="mobile-nav-links">
            {navItems.map(item => (
              <React.Fragment key={`mobile-frag-${item.id}`}>
                <li className="mobile-nav-link">
                  <NavLink to={item.link} className={({ isActive }) => isActive && !item.subItems ? 'active' : ''} onClick={() => handleMobileLinkClick(item.link)}>
                    {item.name}
                  </NavLink>
                </li>
                {item.subItems && item.subItems.map(subItem => (
                   <li key={`mobile-${subItem.id}`} className="mobile-nav-link mobile-sub-nav-link">
                     <NavLink
                       to={subItem.link}
                       className={({ isActive }) => isActive ? 'active' : ''}
                       onClick={() => handleMobileLinkClick(subItem.link)}
                       // Removed target and rel from here as well
                     >
                       &nbsp;&nbsp;&nbsp;{subItem.name}
                     </NavLink>
                   </li>
                ))}
              </React.Fragment>
            ))}
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