// Header.js

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
import testimonialsImg from '../assets/images/Testimonials.png';

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
  }, [openDropdown, images.length]);

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
            {/* Navigation Links with Drop-Down Menus */}
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
                      <Link to="/industries#manufacturing" onClick={() => {
                        closeDropdown();
                        if (window.location.pathname === '/industries') {
                          document.getElementById('manufacturing').scrollIntoView({ behavior: 'smooth' });
                        }
                      }}>Manufacturing</Link>
                      <Link to="/industries#automotive" onClick={() => {
                        closeDropdown();
                        if (window.location.pathname === '/industries') {
                          document.getElementById('automotive').scrollIntoView({ behavior: 'smooth' });
                        }
                      }}>Automotive</Link>
                      <Link to="/industries#healthcare" onClick={() => {
                        closeDropdown();
                        if (window.location.pathname === '/industries') {
                          document.getElementById('healthcare').scrollIntoView({ behavior: 'smooth' });
                        }
                      }}>Healthcare</Link>
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
                      <Link to="/services#consulting" onClick={() => {
                        closeDropdown();
                        if (window.location.pathname === '/services') {
                          document.getElementById('consulting').scrollIntoView({ behavior: 'smooth' });
                        }
                      }}>Consulting</Link>
                      <Link to="/services#strategy" onClick={() => {
                        closeDropdown();
                        if (window.location.pathname === '/services') {
                          document.getElementById('strategy').scrollIntoView({ behavior: 'smooth' });
                        }
                      }}>Strategy</Link>
                      <Link to="/services#technology" onClick={() => {
                        closeDropdown();
                        if (window.location.pathname === '/services') {
                          document.getElementById('technology').scrollIntoView({ behavior: 'smooth' });
                        }
                      }}>Technology</Link>
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
                      <Link to="/insights#blog" onClick={() => {
                        closeDropdown();
                        if (window.location.pathname === '/insights') {
                          document.getElementById('blog').scrollIntoView({ behavior: 'smooth' });
                        }
                      }}>Blog</Link>
                      <Link to="/insights#news" onClick={() => {
                        closeDropdown();
                        if (window.location.pathname === '/insights') {
                          document.getElementById('news').scrollIntoView({ behavior: 'smooth' });
                        }
                      }}>News</Link>
                      <Link to="/insights#events" onClick={() => {
                        closeDropdown();
                        if (window.location.pathname === '/insights') {
                          document.getElementById('events').scrollIntoView({ behavior: 'smooth' });
                        }
                      }}>Events</Link>
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
                      <Link to="/about#company" onClick={() => {
                        closeDropdown();
                        if (window.location.pathname === '/about') {
                          document.getElementById('company').scrollIntoView({ behavior: 'smooth' });
                        }
                      }}>Company</Link>
                      <Link to="/about#team" onClick={() => {
                        closeDropdown();
                        if (window.location.pathname === '/about') {
                          document.getElementById('team').scrollIntoView({ behavior: 'smooth' });
                        }
                      }}>Team</Link>
                      <Link to="/about#careers" onClick={() => {
                        closeDropdown();
                        if (window.location.pathname === '/about') {
                          document.getElementById('careers').scrollIntoView({ behavior: 'smooth' });
                        }
                      }}>Careers</Link>
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
                      <Link to="/testimonials#client-stories" onClick={() => {
                        closeDropdown();
                        if (window.location.pathname === '/testimonials') {
                          document.getElementById('client-stories').scrollIntoView({ behavior: 'smooth' });
                        }
                      }}>Client Stories</Link>
                      <Link to="/testimonials#success-cases" onClick={() => {
                        closeDropdown();
                        if (window.location.pathname === '/testimonials') {
                          document.getElementById('success-cases').scrollIntoView({ behavior: 'smooth' });
                        }
                      }}>Success Cases</Link>
                      <Link to="/testimonials#feedback" onClick={() => {
                        closeDropdown();
                        if (window.location.pathname === '/testimonials') {
                          document.getElementById('feedback').scrollIntoView({ behavior: 'smooth' });
                        }
                      }}>Feedback</Link>
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
          {/* Image Content */}
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
        <div className="video-popup">
          <div className="video-popup-content">
            <button className="video-popup-close" onClick={handleCloseVideo}>
              &times;
            </button>
            <div className="video-container">
              <iframe
                src="https://www.youtube.com/embed/uQfXIDnoSxE?rel=0"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                sandbox="allow-scripts allow-same-origin"
                title="Video"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
