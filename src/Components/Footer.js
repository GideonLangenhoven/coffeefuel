import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

// You'll need to import or create these icons

const Footer = () => {
  return (
    <footer className="footer">
      <div className="wavy-border"></div>
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-column">
            <h3>Shop Matcha</h3>
            <ul>
              <li><Link to="#">Get Started</Link></li>
              <li><Link to="#">Wholesale & Bulk</Link></li>
              <li><Link to="#">Matchaware</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Learn</h3>
            <ul>
              <li><Link to="#">Matcha Recipes</Link></li>
              <li><Link to="#">Caffeine Content</Link></li>
              <li><Link to="#">Health Benefits</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>More from Tenzo</h3>
            <ul>
              <li><Link to="#">Our Story</Link></li>
              <li><Link to="#">Blog</Link></li>
              <li><Link to="#">Affiliate</Link></li>
              <li><Link to="#">Contact Us</Link></li>
              <li><Link to="#">FAQ's</Link></li>
              <li><Link to="#">Sign In</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Let's Stay Connected</h3>
            <p>Enter your email to unlock 10% OFF.</p>
            <form>
              <input type="email" placeholder="Your Email" />
              <button type="submit">SUBMIT</button>
            </form>
            <div className="social-icons">
              <h4>Follow us</h4>
              <div className="icon-container">
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 tenzotea.co</p>
          <div className="footer-links">
            <Link to="#">Terms of Service</Link>
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Refund Policy</Link>
            <Link to="#">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
