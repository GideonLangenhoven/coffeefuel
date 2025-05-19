// --- File: src/Components/ContactSectionCTA.js ---
import React from 'react'; // Removed { useEffect } if not used directly here
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import Button from './Button';
import SunriseAnimation from './SunriseAnimation';
import './ContactSectionCTA.css';

const ContactSectionCTA = ({
  title = "Secure Your Business's Energy Future",
  text = "Schedule your free, no-obligation assessment today.",
  buttonText = "Request My Free Commercial Solar Assessment",
  buttonLink = "/contact",
  className = ""
}) => {
  // If 'inView' is not used to control 'SunriseAnimation' or other local effects,
  // you can remove it from the destructuring. The 'ref' is still used.
  const { ref /*, inView */ } = useInView({ triggerOnce: false, threshold: 0.1 });

  return (
    <section ref={ref} className={`contact-section-cta ${className}`}>
      <div className="sunrise-animation-background">
        <SunriseAnimation
          // isAnimating={inView} // Pass this if SunriseAnimation is set up to use it
          renderContent={false}
        />
      </div>
      <div className="cta-text-content">
        {title && <h2>{title}</h2>}
        {text && <p>{text}</p>}
        {buttonLink && buttonText && (
          <Link to={buttonLink}>
            <Button className="btn-solpower-primary cta-button">{buttonText}</Button>
          </Link>
        )}
      </div>
    </section>
  );
};

export default ContactSectionCTA;