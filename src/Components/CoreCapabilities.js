import React from 'react';
import { ArrowRight, Atom, Cog, Cpu, Target } from "lucide-react";
import styles from './core-capabilities.module.css';

const capabilities = [
  {
    icon: Atom,
    title: "Strategy & transformation",
    description: "Defining the overarching mission and vision of an organisation and transforming its people, processes and technology to successfully deliver on them.",
  },
  {
    icon: Cog,
    title: "Operational excellence",
    description: "Optimising teams, processes and technologies for efficient, high-quality operations across the organisation.",
  },
  {
    icon: Cpu,
    title: "Data and technology",
    description: "Unleashing the power of data and technology to drive business growth, streamline operations and foster innovation.",
  },
  {
    icon: Target,
    title: "Digital experience",
    description: "Developing digital solutions for organisations to enhance their digital presence in an ever-evolving landscape.",
  },
];

const CoreCapabilities = () => {
  return (
    <div className={styles.coreCapabilitiesWrapper}>
      <div className={styles.coreCapabilitiesContainer}>
        <h2 className={styles.coreCapabilitiesTitle}>Our core capabilities</h2>
        <p className={styles.coreCapabilitiesSubtitle}>Our unique service offering is underpinned by innovation.</p>
        
        <div className={styles.capabilitiesGrid}>
          {capabilities.map((capability, index) => (
            <div key={index} className={styles.capabilityCard}>
              <capability.icon className={styles.capabilityIcon} />
              <h3 className={styles.capabilityTitle}>{capability.title}</h3>
              <p className={styles.capabilityDescription}>{capability.description}</p>
              <div className={styles.capabilityLink}>
                <a href="#" className={styles.findOutMore}>
                  Find out more
                  <ArrowRight className={styles.arrowIcon} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoreCapabilities;
