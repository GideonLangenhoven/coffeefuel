// NavigationBar.js

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/images/logo512.png';
import industryImg from '../assets/images/Industry.png';
import servicesImg from '../assets/images/Services.png';
import insightsImg from '../assets/images/Insights.png';
import testimonialsImg from '../assets/images/Testimonials.png';

const NavigationBar = ({ isScrolled }) => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const reloadHomepage = () => {
    navigate('/', { replace: true });
    window.location.reload();
  };

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  const handleBBEEEClick = () => {
    console.log('BBEEE button clicked');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu when a link is clicked
  const handleMobileLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openDropdown &&
        !event.target.closest('.nav-link') &&
        !event.target.closest('.dropdown-content')
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  return (
    <>
      <nav className={`top-nav ${isScrolled ? 'scrolled' : ''}`}>
        <div
          className="logo-container"
          onClick={reloadHomepage}
          style={{ cursor: 'pointer' }}
        >
          <img src={logo} alt="Logo" className="logo" />
          <span className="brand-slogan">
            <span className="terbigen-text">Terbigen</span>
          </span>
        </div>
        <ul className="nav-links">
          {/* Industries */}
          <li className={`nav-link ${openDropdown === 'industries' ? 'open' : ''}`}>
            <span onClick={() => toggleDropdown('industries')}>
              <span className="nav-text">Industries</span>
              <span className="dropdown-arrow">▼</span>
            </span>
            {openDropdown === 'industries' && (
              <div className="dropdown-content">
                <div className="dropdown-header">
                  <span>Industries</span>
                  <span className="close-dropdown" onClick={closeDropdown}>
                    ×
                  </span>
                </div>
                <Link to="/industries" className="view-all">
                  View All <span className="right-arrow">→</span>
                </Link>
                <div className="dropdown-columns">
                  <div className="dropdown-column">
                    <h4>Categories</h4>
                    <Link to="/industries#manufacturing" onClick={closeDropdown}>Manufacturing</Link>
                    <Link to="/industries#automotive" onClick={closeDropdown}>Automotive</Link>
                    <Link to="/industries#healthcare" onClick={closeDropdown}>Healthcare</Link>
                  </div>
                  <div className="dropdown-image-column">
                    <h4>
                      <Link to="/industries" className="featured-link">
                        Featured <span className="featured-arrow">→</span>
                      </Link>
                    </h4>
                    <img src={industryImg} alt="Industries" />
                    <div className="image-links">
                      <Link to="/industries#client-stories">Industry Insights</Link>
                      <Link to="/industries#case-studies">Case Studies</Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </li>
          {/* Services */}
          <li className={`nav-link ${openDropdown === 'services' ? 'open' : ''}`}>
            <span onClick={() => toggleDropdown('services')}>
              <span className="nav-text">Services</span>
              <span className="dropdown-arrow">▼</span>
            </span>
            {openDropdown === 'services' && (
              <div className="dropdown-content">
                <div className="dropdown-header">
                  <span>Services</span>
                  <span className="close-dropdown" onClick={closeDropdown}>
                    ×
                  </span>
                </div>
                <Link to="/services" className="view-all">
                  View All <span className="right-arrow">→</span>
                </Link>
                <div className="dropdown-columns">
                  <div className="dropdown-column">
                    <h4>Categories</h4>
                    <Link to="/services#consulting" onClick={closeDropdown}>Consulting</Link>
                    <Link to="/services#strategy" onClick={closeDropdown}>Strategy</Link>
                    <Link to="/services#technology" onClick={closeDropdown}>Technology</Link>
                  </div>
                  <div className="dropdown-image-column">
                    <h4>
                      <Link to="/services" className="featured-link">
                        Featured <span className="featured-arrow">→</span>
                      </Link>
                    </h4>
                    <img src={servicesImg} alt="Services" />
                    <div className="image-links">
                      <Link to="/services#service-spotlight">Service Spotlight</Link>
                      <Link to="/services#expert-teams">Expert Teams</Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </li>
          {/* Insights */}
          <li className={`nav-link ${openDropdown === 'insights' ? 'open' : ''}`}>
            <span onClick={() => toggleDropdown('insights')}>
              <span className="nav-text">Insights</span>
              <span className="dropdown-arrow">▼</span>
            </span>
            {openDropdown === 'insights' && (
              <div className="dropdown-content">
                <div className="dropdown-header">
                  <span>Insights</span>
                  <span className="close-dropdown" onClick={closeDropdown}>
                    ×
                  </span>
                </div>
                <Link to="/insights" className="view-all">
                  View All <span className="right-arrow">→</span>
                </Link>
                <div className="dropdown-columns">
                  <div className="dropdown-column">
                    <h4>Categories</h4>
                    <Link to="/insights#blog" onClick={closeDropdown}>Blog</Link>
                    <Link to="/insights#news" onClick={closeDropdown}>News</Link>
                    <Link to="/insights#events" onClick={closeDropdown}>Events</Link>
                  </div>
                  <div className="dropdown-image-column">
                    <h4>
                      <Link to="/insights" className="featured-link">
                        Featured <span className="featured-arrow">→</span>
                      </Link>
                    </h4>
                    <img src={insightsImg} alt="Insights" />
                    <div className="image-links">
                      <Link to="/insights#latest-articles">Latest Articles</Link>
                      <Link to="/insights#industry-reports">Industry Reports</Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </li>
          {/* About Us */}
          <li className={`nav-link ${openDropdown === 'about' ? 'open' : ''}`}>
            <span onClick={() => toggleDropdown('about')}>
              <span className="nav-text">About Us</span>
              <span className="dropdown-arrow">▼</span>
            </span>
            {openDropdown === 'about' && (
              <div className="dropdown-content">
                <div className="dropdown-header">
                  <span>About Us</span>
                  <span className="close-dropdown" onClick={closeDropdown}>
                    ×
                  </span>
                </div>
                <Link to="/about" className="view-all">
                  View All <span className="right-arrow">→</span>
                </Link>
                <div className="dropdown-columns">
                  <div className="dropdown-column">
                    <h4>Categories</h4>
                    <Link to="/about#company" onClick={closeDropdown}>Company</Link>
                    <Link to="/about#team" onClick={closeDropdown}>Team</Link>
                    <Link to="/about#careers" onClick={closeDropdown}>Careers</Link>
                  </div>
                  <div className="dropdown-image-column">
                    <h4>
                      <Link to="/about" className="featured-link">
                        Featured <span className="featured-arrow">→</span>
                      </Link>
                    </h4>
                    <img src={servicesImg} alt="About Us" />
                    <div className="image-links">
                      <Link to="/about#mission">Mission & Vision</Link>
                      <Link to="/about#values">Our Values</Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </li>
          {/* Testimonials */}
          <li className={`nav-link ${openDropdown === 'testimonials' ? 'open' : ''}`}>
            <span onClick={() => toggleDropdown('testimonials')}>
              <span className="nav-text">Testimonials</span>
              <span className="dropdown-arrow">▼</span>
            </span>
            {openDropdown === 'testimonials' && (
              <div className="dropdown-content">
                <div className="dropdown-header">
                  <span>Testimonials</span>
                  <span className="close-dropdown" onClick={closeDropdown}>
                    ×
                  </span>
                </div>
                <Link to="/testimonials" className="view-all">
                  View All <span className="right-arrow">→</span>
                </Link>
                <div className="dropdown-columns">
                  <div className="dropdown-column">
                    <h4>Categories</h4>
                    <Link to="/testimonials#client-stories" onClick={closeDropdown}>Client Stories</Link>
                    <Link to="/testimonials#success-cases" onClick={closeDropdown}>Success Cases</Link>
                    <Link to="/testimonials#feedback" onClick={closeDropdown}>Feedback</Link>
                  </div>
                  <div className="dropdown-image-column">
                    <h4>
                      <Link to="/testimonials" className="featured-link">
                        Featured <span className="featured-arrow">→</span>
                      </Link>
                    </h4>
                    <img src={testimonialsImg} alt="Testimonials" />
                    <div className="image-links">
                      <Link to="/testimonials#top-reviews">Top Reviews</Link>
                      <Link to="/testimonials#video-testimonials">Video Testimonials</Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
          {/* Mobile navigation items */}
          <li className="mobile-nav-link">
            <span onClick={handleMobileLinkClick}>
              <Link to="/industries">Industries</Link>
            </span>
          </li>
          <li className="mobile-nav-link">
            <span onClick={handleMobileLinkClick}>
              <Link to="/services">Services</Link>
            </span>
          </li>
          <li className="mobile-nav-link">
            <span onClick={handleMobileLinkClick}>
              <Link to="/insights">Insights</Link>
            </span>
          </li>
          <li className="mobile-nav-link">
            <span onClick={handleMobileLinkClick}>
              <Link to="/about">About Us</Link>
            </span>
          </li>
          <li className="mobile-nav-link">
            <span onClick={handleMobileLinkClick}>
              <Link to="/testimonials">Testimonials</Link>
            </span>
          </li>
          <li className="mobile-nav-link contact-link">
            <a href="#contact" className="contact-button" onClick={toggleMenu}>
              CONTACT
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavigationBar;
