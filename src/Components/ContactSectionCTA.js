// src/Components/ContactSectionCTA.js
import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button'; // Use reusable button
import './ContactSectionCTA.css';

const ContactSectionCTA = ({
    title = "Ready to Start Saving with SolPower?",
    text = "Get your free, no-obligation quote and discover how much you could save.",
    buttonText = "Get My Free Quote"
}) => {
  return (
    <section className="contact-section-cta">
        <div className="container"> {/* Optional container */}
            <h2>{title}</h2>
            <p>{text}</p>
            <Link to="/contact">
                <Button>{buttonText}</Button>
            </Link>
        </div>
    </section>
  );
};

export default ContactSectionCTA;