// src/Components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
// Removed unused icons: Linkedin, Youtube, Instagram
import { Facebook, Mail, Phone } from 'lucide-react';
import './Footer.css';

// Updated social links
const socialLinks = [
  { name: 'Facebook', icon: <Facebook size={20} />, href: '#' }, // Example only
];
const contactDetails = { email: 'info@solpower.co.za', phone: '021 123 4567' };
const officeLocations = ['Cape Town', 'Johannesburg (Soon)'];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        {/* Connect */}
        <div>
          <h3 className="title">Connect with Us</h3>
          {contactDetails.email && ( <a href={`mailto:${contactDetails.email}`} className="link footer-link"> <Mail size={16} /> {contactDetails.email} </a> )}
          {contactDetails.phone && ( <a href={`tel:${contactDetails.phone.replace(/ /g,'')}`} className="link footer-link"> <Phone size={16} /> {contactDetails.phone} </a> )}
        </div>
        {/* Quick Links */}
        <div>
          <h3 className="title">Quick Links</h3>
          <Link to="/" className="link footer-link">Home</Link>
          <Link to="/residential" className="link footer-link">Residential</Link>
          <Link to="/commercial" className="link footer-link">Commercial</Link>
          <Link to="/how-it-works" className="link footer-link">How It Works</Link>
          <Link to="/faqs" className="link footer-link">FAQs</Link>
          <Link to="/about" className="link footer-link">About Us</Link>
          <Link to="/contact" className="link footer-link">Contact Us</Link>
        </div>
        {/* Offices */}
        <div>
          <h3 className="title">Office Locations</h3>
          {officeLocations.map((city) => ( <p key={city} className="footer-link" style={{cursor: 'default'}}>{city}</p> ))}
        </div>
        {/* Follow Us */}
        <div>
          <h3 className="title">Follow Us</h3>
          {socialLinks.length > 0 ? ( <div className="socialIcons"> {socialLinks.map((social) => ( <a key={social.name} href={social.href} className="socialIcon" aria-label={social.name} target="_blank" rel="noopener noreferrer"> {social.icon} <span className="sr-only">{social.name}</span> </a> ))} </div> ) : ( <p className="footer-link" style={{cursor: 'default'}}>Coming Soon</p> )}
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="container footer-bottom">
        <div className="legalLinks">
          <Link to="/privacy-policy" className="link legal-link">Privacy Policy</Link>
          <Link to="/terms-of-use" className="link legal-link">Terms of Use</Link>
        </div>
        <p className="legalText copyright"> © {new Date().getFullYear()} SolPower (Pty) Ltd. All Rights Reserved. </p>
      </div>
    </footer>
  );
};
export default Footer;