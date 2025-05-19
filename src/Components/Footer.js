import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Mail, Phone } from 'lucide-react';
import ContactCard from './ContactCard'; // Make sure this component exists and is styled appropriately
import './Footer.css';

// Define data outside the component for clarity
const socialLinks = [
  { name: 'Facebook', icon: <Facebook size={20} />, href: 'https://facebook.com/yourpage' }, // Replace # with actual link
];
const contactDetails = { email: 'info@solpower.co.za', phone: '021 123 4567' };
const officeLocations = ['Cape Town', 'Johannesburg (Soon)'];
const quickLinks = [
  { path: '/', label: 'Home' },
  { path: '/residential', label: 'Residential' },
  { path: '/commercial', label: 'Commercial' },
  { path: '/how-it-works', label: 'How It Works' },
  { path: '/faqs', label: 'FAQs' },
  { path: '/about', label: 'About Us' },
  { path: '/contact', label: 'Contact Us' },
];
const legalLinks = [
    { path: '/privacy-policy', label: 'Privacy Policy'},
    { path: '/terms-of-use', label: 'Terms of Use'},
]

const Footer = () => {
  return (
    <>
      {/* Ensure ContactCard takes up space correctly or is positioned without affecting the footer negatively */}
      <ContactCard />

      <footer className="footer">
        <div className="container footer-container">
          {/* Main Footer Content Grid */}
          <div className="footer-grid">
            {/* Column 1: Connect */}
            <div className="footer-column">
              <h3 className="title">Connect with Us</h3>
              {contactDetails.email && (
                <a href={`mailto:${contactDetails.email}`} className="link footer-link icon-link">
                  <Mail size={16} className="footer-icon" />
                  <span>{contactDetails.email}</span>
                </a>
              )}
              {contactDetails.phone && (
                <a href={`tel:${contactDetails.phone.replace(/ /g, '')}`} className="link footer-link icon-link">
                  <Phone size={16} className="footer-icon" />
                  <span>{contactDetails.phone}</span>
                </a>
              )}
            </div>

            {/* Column 2: Quick Links */}
            <div className="footer-column">
              <h3 className="title">Quick Links</h3>
              {quickLinks.map((link) => (
                 <Link key={link.path} to={link.path} className="link footer-link">
                   {link.label}
                 </Link>
              ))}
            </div>

            {/* Column 3: Offices */}
            <div className="footer-column">
              <h3 className="title">Office Locations</h3>
              {officeLocations.map((city) => (
                <p key={city} className="footer-text">{city}</p>
              ))}
            </div>

            {/* Column 4: Follow Us */}
            <div className="footer-column">
              <h3 className="title">Follow Us</h3>
              {socialLinks.length > 0 ? (
                <div className="socialIcons">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className="socialIcon"
                      aria-label={social.name}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.icon}
                      <span className="sr-only">{social.name}</span> {/* Hidden text for screen readers */}
                    </a>
                  ))}
                </div>
              ) : (
                <p className="footer-text">Coming Soon</p>
              )}
            </div>
          </div> {/* End footer-grid */}

          {/* Bottom Bar */}
          <div className="footer-bottom">
            <div className="legalLinks">
              {legalLinks.map((link) => (
                <Link key={link.path} to={link.path} className="link legal-link">
                    {link.label}
                </Link>
              ))}
            </div>
            <p className="copyright">
              &copy; {new Date().getFullYear()} SolPower (Pty) Ltd. All Rights Reserved.
            </p>
          </div> {/* End footer-bottom */}

        </div> {/* End container */}
      </footer>
    </>
  );
};

export default Footer;