// --- File: src/Components/ContactSectionCTA.js ---
import React from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import Button from './Button'; 
import SunriseAnimation from './SunriseAnimation'; 
import './ContactSectionCTA.css'; // Make sure this line is present and correct

const ContactSectionCTA = ({ /* ... props ... */ title = "Ready to Start Saving?", text = "Get your free, no-obligation quote.", buttonText = "Get My Free Quote", buttonLink = "/contact", className = "" }) => {
    const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });
    // ... rest of the component from previous response
    return (
        <section ref={ref} className={`contact-section-cta ${className}`}>
            <SunriseAnimation isAnimating={inView} />
            <div className="cta-text-content">
                <h2>{title}</h2>
                <p>{text}</p>
                <Link to={buttonLink}>
                    <Button className="btn-solpower-primary">{buttonText}</Button>
                </Link>
            </div>
        </section>
    );
};
export default ContactSectionCTA;