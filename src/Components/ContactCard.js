// src/Components/ContactCard.js
// Primarily a UI element, minimal direct SEO impact.
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ContactCard.css'; // Ensure CSS exists and is correctly styled
import Button from './Button'; // Import Button

const ContactCard = ({ paths }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null); // Ref to get the card element

  // Scroll logic to make the card visible when it comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when observer callback fires
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(cardRef.current); // Stop observing once visible
        }
      },
      {
        root: null, // relative to document viewport
        rootMargin: '0px',
        threshold: 0.1, // 10% of the item is visible
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    // Cleanup observer on component unmount
    return () => {
      if (cardRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(cardRef.current);
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  // Use the contact path from props or default
  const contactPath = paths?.contact || "/contact";

  return (
    // Use aside or div, role="complementary" could be used if appropriate
    <aside
      ref={cardRef} // Attach the ref to the aside element
      className={`contact-card ${isVisible ? 'visible' : ''}`}
      aria-label="Quick contact prompt"
      style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.5s ease-out, transform 0.5s ease-out' }} // Example inline styles for visibility transition
    >
      <div className="contact-card-content">
        <h3>Ready to Go Solar in Cape Town?</h3> {/* Make text specific */}
        <p>Get your free SolPower quote today and start saving on Eskom bills.</p>
        <Link to={contactPath} className="contact-card-link" style={{ textDecoration: 'none' }}>
          {/* Use Button component for consistent styling and accessibility */}
          <Button className="btn-solpower-primary">Get My Free Quote</Button>
        </Link>
      </div>
    </aside>
  );
};

export default ContactCard;
