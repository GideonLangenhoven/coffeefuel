// src/Components/Footer.js

'use client';

import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Linkedin,
  Youtube,
  Facebook,
  Mail,
  Instagram,
} from 'lucide-react';
import Button from './Button';
import Input from './Input';
import Select from './Select';
import './Footer.css'; // Import the CSS file

const socialIcons = [
  {icon: <Linkedin /> },
  {icon: <Youtube /> },
  { icon: <Facebook /> },
  {icon: <Mail /> },
  { icon: <Instagram /> },
  // ... other icons with proper names
];

const Footer = () => {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  return (
    <footer className="footer">
      <div className="container">
        <div className="grid">
          <div>
            <h2 className="title">Connect with us</h2>
            <p className="link">Franklin@terbigen.com</p>
            <p className="link">UK +44 (0)20 7220 5410</p>
          </div>

          <div>
            <h2 className="title">Find us</h2>
            <div className="cityGrid">
              {['Cape Town', 'New York', 'London', 'Sydney'].map((city) => (
                <p key={city} className="link">
                  {city}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <h2 className="title">Follow us</h2>
        <div className="socialIcons">
          {socialIcons.map((social) => (
            <a key={social.name} href="#" className="socialIcon" aria-label={social.name}>
              {social.icon}
              <span className="sr-only">{social.name}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="container">
        <div
          className="newsletterButton"
          onClick={() => setIsNewsletterOpen(!isNewsletterOpen)}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsNewsletterOpen(!isNewsletterOpen);
            }
          }}
        >
          <span>Sign up for our newsletter</span>
          {isNewsletterOpen ? <ChevronDown /> : <ChevronRight />}
        </div>

        {isNewsletterOpen && (
          <form className="newsletterForm">
            <div className="inputGroup">
              <Input type="text" placeholder="First name*" required />
              <Input type="text" placeholder="Last name" />
            </div>
            <Input type="email" placeholder="name@example.com*" required />
            <Select>
              <option value="">What would you like to hear from us about?</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
            <p className="legalText">
              By submitting your details, you are consenting to our privacy policy
            </p>
            <Button type="submit" className="submitButton">
              Submit <ChevronRight className="ml-2" />
            </Button>
          </form>
        )}
      </div>

      <div className="container">
        <p className="legalText">© Copyright 2024 Elixirr International Plc</p>
        <p className="legalText">
          Elixirr International plc is a company incorporated and registered in England and Wales with company number: 11723404 whose registered office is at 12 Helmet Row, London EC1V 3QJ
        </p>
      </div>

      <div className="legalLinks">
        <a href="#" className="link">
          Privacy
        </a>
        <a href="#" className="link">
          Terms of Use
        </a>
        <a href="#" className="link">
          Cookie Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
