// CoreCapabilities.js

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Atom, Cog, Cpu, Target } from 'lucide-react';
import styles from './core-capabilities.module.css';

const capabilities = [
  {
    icon: Atom,
    title: 'Certified Reinvention Practitioners',
    description:
      'Reinvention consulting, Transformational leadership, Business reinvention strategies',
    link: '/services#certified-reinvention-practitioners',
  },
  {
    icon: Cog,
    title: 'Business Coaching',
    description:
      'Executive coaching for business leaders, Leadership development coaching, Business growth coaching',
    link: '/services#business-coaching',
  },
  {
    icon: Cpu,
    title: 'Management Consulting',
    description:
      'Strategic management consulting, Change management consulting, Organizational transformation services',
    link: '/services#management-consulting',
  },
  {
    icon: Target,
    title: 'Leadership Experience',
    description:
      'Experienced business leaders, Leadership expertise, Seasoned management consultants',
    link: '/services#leadership-experience',
  },
];

const CoreCapabilities = () => {
  return (
    <div className={styles.coreCapabilitiesWrapper}>
      <div className={styles.coreCapabilitiesContainer}>
        <h2 className={styles.coreCapabilitiesTitle}>Our Core Capabilities</h2>
        <p className={styles.coreCapabilitiesSubtitle}>
          We turn your biggest challenges into stepping stones for success. Let us guide you in transforming pain points into pathways to growth and innovation.
        </p>

        <div className={styles.capabilitiesGrid}>
          {capabilities.map((capability, index) => (
            <Link
              key={index}
              to={capability.link}
              className={styles.capabilityCard}
            >
              <div className={styles.iconWrapper}>
                <capability.icon className={styles.capabilityIcon} />
              </div>
              <h3 className={styles.capabilityTitle}>{capability.title}</h3>
              <p className={styles.capabilityDescription}>
                {capability.description}
              </p>
              <div className={styles.capabilityLink}>
                <span className={styles.findOutMore}>
                  Find out more
                  <ArrowRight className={styles.arrowIcon} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoreCapabilities;
