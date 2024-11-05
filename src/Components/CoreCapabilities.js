// CoreCapabilities.js

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Atom, Cog, Cpu, Target } from 'lucide-react';
import styles from './core-capabilities.module.css';

const capabilities = [
  {
    icon: Atom,
    title: 'Strategy & Transformation',
    description:
      'We redefine your mission and vision, transforming your people, processes, and technology to achieve unparalleled success.',
    link: '/capabilities/strategy-and-transformation',
  },
  {
    icon: Cog,
    title: 'Operational Excellence',
    description:
      'We streamline your operations, enhancing efficiency and quality to drive your organisation towards excellence.',
    link: '/capabilities/operational-excellence',
  },
  {
    icon: Cpu,
    title: 'Data & Technology',
    description:
      'We harness data and technology to fuel growth, innovate solutions, and give you a competitive edge.',
    link: '/capabilities/data-and-technology',
  },
  {
    icon: Target,
    title: 'Digital Experience',
    description:
      'We craft exceptional digital experiences, elevating your online presence to captivate and engage your audience.',
    link: '/capabilities/digital-experience',
  },
];

const CoreCapabilities = () => {
  return (
    <div className={styles.coreCapabilitiesWrapper}>
      <div className={styles.coreCapabilitiesContainer}>
        <h2 className={styles.coreCapabilitiesTitle}>Empowering Your Growth Story</h2>
        <p className={styles.coreCapabilitiesSubtitle}>
          At Terbigen, we turn your biggest challenges into stepping stones for success. Let us guide you in transforming pain points into pathways to growth and innovation.
        </p>

        <div className={styles.capabilitiesGrid}>
          {capabilities.map((capability, index) => (
            <div key={index} className={styles.capabilityCard}>
              <div className={styles.iconWrapper}>
                <capability.icon className={styles.capabilityIcon} />
              </div>
              <h3 className={styles.capabilityTitle}>{capability.title}</h3>
              <p className={styles.capabilityDescription}>{capability.description}</p>
              <div className={styles.capabilityLink}>
                <Link to={capability.link} className={styles.findOutMore}>
                  Find out more
                  <ArrowRight className={styles.arrowIcon} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoreCapabilities;
