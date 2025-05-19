// src/Components/ContactCTA.js
import React from 'react';
import styles from './contact-cta.module.css'; // Import CSS Module
import { Link } from 'react-router-dom'; // Use Link for internal navigation

const ContactCTA = () => {
  return (
    <section className={styles.contactCtaWrapper}> {/* Use section tag */}
      {/* Background is handled by CSS */}
      <div className={styles.gradientBackground}></div>
      <div className={styles.contactCtaContainer}>
        <div className={styles.contactCtaContent}>
          <h2 className={styles.contactCtaTitle}>
            Ready to Make the Switch to Solar?
          </h2>
          <p className={styles.contactCtaDescription}>
            Get a free, no-obligation quote for your home or business today.
          </p>
        </div>
        {/* Use Link component for routing */}
        <Link to="/contact" className={styles.contactCtaButton}>
          Request Your Free Quote
        </Link>
      </div>
    </section>
  );
};

export default ContactCTA;