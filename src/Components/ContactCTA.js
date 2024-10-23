import React from 'react';
import styles from './contact-cta.module.css';

const ContactCTA = () => {
  return (
    <div className={styles.contactCtaWrapper}>
      <div className={styles.gradientBackground}></div>
      <div className={styles.contactCtaContainer}>
        <div className={styles.contactCtaContent}>
          <h2 className={styles.contactCtaTitle}>
            Ready to change the game together?
          </h2>
          <p className={styles.contactCtaDescription}>
            Let's get started today.
          </p>
          <button className={styles.contactCtaButton}>
            Contact us
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactCTA;
