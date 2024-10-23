
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/images/logo512.png';
import picture1 from '../assets/images/Picture.png';
import picture2 from '../assets/images/Picture2.png';
import picture3 from '../assets/images/Picture3.png';
import industryImg from '../assets/images/Industry.png';
import servicesImg from '../assets/images/Services.png';
import insightsImg from '../assets/images/Insights.png';
import terbigenImg from '../assets/images/Terbigen.png';
import testimonialsImg from '../assets/images/Testimonials.png';
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
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    // Image rotation for the main picture
    const imageRotation = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    // Click outside handler for dropdown menus
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
            {/* Industries */}
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
                    <div className="dropdown-image-column">
                      <h4>
                        <Link to="/industries">
                          Featured <span className="featured-arrow">→</span>
                        </Link>
                      </h4>
                      <img src={industryImg} alt="Industries" />
                      <div className="image-links">
                        <a href="#">Industry Insights</a>
                        <a href="#">Case Studies</a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </li>
            {/* Services */}
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
                      <h4>Categories</h4>
                      <a href="#">Consulting</a>
                      <a href="#">Strategy</a>
                      <a href="#">Technology</a>
                      {/* Add more items */}
                    </div>
                    <div className="dropdown-image-column">
                      <h4>
                        <Link to="/services">
                          Featured <span className="featured-arrow">→</span>
                        </Link>
                      </h4>
                      <img src={servicesImg} alt="Services" />
                      <div className="image-links">
                        <a href="#">Service Spotlight</a>
                        <a href="#">Expert Teams</a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </li>
            {/* Insights */}
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
                      <h4>Categories</h4>
                      <a href="#">Blog</a>
                      <a href="#">News</a>
                      <a href="#">Events</a>
                      {/* Add more items */}
                    </div>
                    <div className="dropdown-image-column">
                      <h4>
                        <Link to="/insights">
                          Featured <span className="featured-arrow">→</span>
                        </Link>
                      </h4>
                      <img src={insightsImg} alt="Insights" />
                      <div className="image-links">
                        <a href="#">Latest Articles</a>
                        <a href="#">Industry Reports</a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </li>
            {/* About Us */}
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
                      <h4>Categories</h4>
                      <a href="#">Company</a>
                      <a href="#">Team</a>
                      <a href="#">Careers</a>
                      {/* Add more items */}
                    </div>
                    <div className="dropdown-image-column">
                      <h4>
                        <Link to="/about">
                          Featured <span className="featured-arrow">→</span>
                        </Link>
                      </h4>
                      <img src={terbigenImg} alt="About Us" />
                      <div className="image-links">
                        <a href="#">Mission & Vision</a>
                        <a href="#">Our Values</a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </li>
            {/* Testimonials */}
            <li className={`nav-link ${openDropdown === 'testimonials' ? 'open' : ''}`}>
              <span onClick={() => toggleDropdown('testimonials')}>
                Testimonials
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
                  <a href="#" className="view-all">
                    View All <span className="right-arrow">→</span>
                  </a>
                  <div className="dropdown-columns">
                    <div className="dropdown-column">
                      <h4>Categories</h4>
                      <a href="#">Client Stories</a>
                      <a href="#">Success Cases</a>
                      <a href="#">Feedback</a>
                      {/* Add more items */}
                    </div>
                    <div className="dropdown-image-column">
                      <h4>
                        <Link to="/testimonials">
                          Featured <span className="featured-arrow">→</span>
                        </Link>
                      </h4>
                      <img src={testimonialsImg} alt="Testimonials" />
                      <div className="image-links">
                        <a href="#">Top Reviews</a>
                        <a href="#">Video Testimonials</a>
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
              <span onClick={toggleMenu}>
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

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <span>SCROLL</span>
          <div className="scroll-line"></div>
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

    </div>
  );
};

export default Header;
