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
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
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

    // Click outside handler
    const handleClickOutside = (event) => {
      if (
        openDropdown &&
        !event.target.closest('.nav-link')
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(imageRotation);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  const handleBBEEEClick = () => {
    console.log('BBEEE button clicked');
    // Add your logic here
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

  return (
    <div className="header">
      <div className="inner-header flex">
        {/* Navigation Bar */}
        <nav className={`top-nav ${isScrolled ? 'scrolled' : ''}`}>
          <div className="logo-container" onClick={reloadHomepage} style={{ cursor: 'pointer' }}>
            <img src={logo} alt="Logo" className="logo" />
            <span className="brand-slogan">
              <span className="terbigen-text">Terbigen</span>
            </span>
          </div>
          <ul className="nav-links">
            {/* Navigation Links with Drop-Down Menus */}
            <li className={`nav-link ${openDropdown === 'industries' ? 'open' : ''}`}>
              <span onClick={() => toggleDropdown('industries')}>
                Industries
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
                  <a href="#" className="view-all">
                    View All <span className="right-arrow">→</span>
                  </a>
                  <div className="dropdown-columns">
                    <div className="dropdown-column">
                      <h4>Categories</h4>
                      <a href="#">Manufacturing</a>
                      <a href="#">Automotive</a>
                      <a href="#">Healthcare</a>
                      {/* Add more items */}
                    </div>
                    <div className="dropdown-column">
                      <h4>Featured</h4>
                      <a href="#">Industry Insights</a>
                      <a href="#">Case Studies</a>
                      <a href="#">White Papers</a>
                      {/* Add more items */}
                    </div>
                  </div>
                </div>
              )}
            </li>
            {/* Repeat for other nav-link items */}
            <li className={`nav-link ${openDropdown === 'services' ? 'open' : ''}`}>
              <span onClick={() => toggleDropdown('services')}>
                Services
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
                  <a href="#" className="view-all">
                    View All <span className="right-arrow">→</span>
                  </a>
                  <div className="dropdown-columns">
                    <div className="dropdown-column">
                      <h4>Services</h4>
                      <a href="#">Consulting</a>
                      <a href="#">Strategy</a>
                      <a href="#">Technology</a>
                      {/* Add more items */}
                    </div>
                    <div className="dropdown-column">
                      <h4>Featured</h4>
                      <a href="#">Service Spotlight</a>
                      <a href="#">Client Success</a>
                      <a href="#">Expert Teams</a>
                      {/* Add more items */}
                    </div>
                  </div>
                </div>
              )}
            </li>
            <li className={`nav-link ${openDropdown === 'insights' ? 'open' : ''}`}>
              <span onClick={() => toggleDropdown('insights')}>
                Insights
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
                  <a href="#" className="view-all">
                    View All <span className="right-arrow">→</span>
                  </a>
                  <div className="dropdown-columns">
                    <div className="dropdown-column">
                      <h4>Insights</h4>
                      <a href="#">Blog</a>
                      <a href="#">News</a>
                      <a href="#">Events</a>
                      {/* Add more items */}
                    </div>
                    <div className="dropdown-column">
                      <h4>Featured</h4>
                      <a href="#">Latest Articles</a>
                      <a href="#">Upcoming Webinars</a>
                      <a href="#">Industry Reports</a>
                      {/* Add more items */}
                    </div>
                  </div>
                </div>
              )}
            </li>
            <li className={`nav-link ${openDropdown === 'about' ? 'open' : ''}`}>
              <span onClick={() => toggleDropdown('about')}>
                About Us
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
                  <a href="#" className="view-all">
                    View All <span className="right-arrow">→</span>
                  </a>
                  <div className="dropdown-columns">
                    <div className="dropdown-column">
                      <h4>About</h4>
                      <a href="#">Company</a>
                      <a href="#">Team</a>
                      <a href="#">Careers</a>
                      {/* Add more items */}
                    </div>
                    <div className="dropdown-column">
                      <h4>Featured</h4>
                      <a href="#">Mission & Vision</a>
                      <a href="#">Our Values</a>
                      <a href="#">Community Involvement</a>
                      {/* Add more items */}
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
              Contact
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
            <h1>A fresh approach to growing people and business</h1>
            <div className="roller">
              <span id="rolltext">
                INNOVATION<br/>
                STRATEGY<br/>
                GROWTH<br/>
                EXCELLENCE<br/>
                LEADERSHIP<br/>
                TRANSFORMATION<br/>
                EMPOWERMENT<br/>
                SUCCESS
              </span>
            </div>
            <a href="#" className="cta-button">Watch Now</a>
          </div>
          <div className="image-content">
            <div className="main-image">
              <img src={images[currentImage]} alt="Team Collaboration" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <span>SCROLL</span>
          <div className="scroll-line"></div>
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
      </div>
    </div>
  );
};

export default Header;
