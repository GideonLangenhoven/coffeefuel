// src/Components/CoreCapabilities.js
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom'; // Use react-router-dom Link
import { ArrowRight, Zap, Sun, BatteryCharging } from 'lucide-react'; // Example icons
import './core-capabilities.css'; // Import CSS (ensure filename is hyphenated)

// TODO: Update capabilities data for SolPower services
const capabilities = [
  {
    icon: <Sun size={50} />, // Use Lucide icon component
    title: 'Solar Panel Systems',
    description:
      'Harness clean energy with high-efficiency PV panels tailored for residential and commercial use.',
    link: '/services#solar',
  },
  {
    icon: <BatteryCharging size={50} />,
    title: 'Battery Backup Solutions',
    description:
      'Ensure uninterrupted power during load shedding with reliable battery storage and inverter systems.',
    link: '/services#backup',
  },
  {
    icon: <Zap size={50} />, // Example icon
    title: 'Energy Consultation',
    description:
      'Optimize your energy usage and explore the best solutions with our expert consultation services.',
    link: '/services#consulting',
  },
  // Add more services like Maintenance if applicable
  // {
  //   icon: <Tool size={50} />, // Example icon
  //   title: 'System Maintenance',
  //   description:
  //     'Keep your system running efficiently with our professional maintenance and support packages.',
  //   link: '/services#maintenance',
  // },
];

// --- CapabilityCard component ---
const CapabilityCard = ({ capability, isVisible, index }) => {
  const cardStyle = {
    // Optional: Define animation delay based on index for staggered effect
    // animationDelay: isVisible ? `${index * 0.15}s` : '0s',
  };

  return (
    <Link
      to={capability.link}
      className={`capabilityCard ${isVisible ? 'animateCard' : ''}`} // Add animation class if isVisible
      style={cardStyle}
    >
      <div className="iconWrapper">
        {/* Render the icon component passed in props */}
        {capability.icon}
      </div>
      {/* <div className="cardLine"></div> */} {/* Optional decorative line */}
      <h3 className="capabilityTitle">{capability.title}</h3>
      <p className="capabilityDescription">{capability.description}</p>
      <div className="capabilityLink">
        <span className="findOutMore">
          Learn More
          <ArrowRight className="arrowIcon" size={16} /> {/* Use Lucide icon */}
        </span>
      </div>
    </Link>
  );
};

// --- CoreCapabilities component ---
const CoreCapabilities = () => {
  const [isVisible, setIsVisible] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1, // Trigger when 10% is visible
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Observe only once
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const currentRef = wrapperRef.current; // Capture ref

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef); // Cleanup
      }
    };
  }, []);

  // TODO: Update Title and Subtitle for SolPower
  return (
    <section // Use section tag
      id="core-capabilities"
      ref={wrapperRef}
      // Add visibility class for potential wrapper animation
      className={`coreCapabilitiesWrapper ${isVisible ? 'visible' : ''}`}
    >
      <div className="coreCapabilitiesContainer">
        {/* Add fadeIn class if isVisible for text animation */}
        <h2 className={`coreCapabilitiesTitle ${isVisible ? 'fadeIn' : ''}`}>
          Our Energy Solutions
        </h2>
        <p className={`coreCapabilitiesSubtitle ${isVisible ? 'fadeIn' : ''}`}>
          From generating your own power with solar panels to ensuring reliable backup during outages, we provide comprehensive solutions for energy independence.
        </p>

        <div className="capabilitiesGrid">
          {capabilities.map((capability, index) => (
            <CapabilityCard
              key={index}
              capability={capability}
              index={index}
              isVisible={isVisible} // Pass visibility state to card for animation
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreCapabilities;