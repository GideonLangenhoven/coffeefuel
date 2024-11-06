import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Atom, Cog, Cpu, Target } from 'lucide-react';
import './core-capabilities.css';

const capabilities = [
  {
    icon: Atom,
    title: 'Certified Reinvention Practitioners',
    description:
      'Reinvention consulting, transformational leadership, business reinvention strategies',
    link: '/services#certified-reinvention-practitioners',
  },
  {
    icon: Cog,
    title: 'Business Coaching',
    description:
      'Executive coaching for business leaders, leadership development coaching, business growth coaching',
    link: '/services#business-coaching',
  },
  {
    icon: Cpu,
    title: 'Management Consulting',
    description:
      'Strategic management consulting, change management consulting, organizational transformation services',
    link: '/services#management-consulting',
  },
  {
    icon: Target,
    title: 'Leadership Experience',
    description:
      'Experienced business leaders, leadership expertise, seasoned management consultants',
    link: '/services#leadership-experience',
  },
];

const CapabilityCard = ({ capability, index, isVisible }) => {
  return (
    <Link
      to={capability.link}
      className={`capabilityCard ${isVisible ? 'animateCard' : 'hiddenCard'}`}
      style={{ animationDelay: `${index * 0.3 + 1}s` }} // Staggered delay for sequential animation
    >
      <div className="iconWrapper">
        <capability.icon className="capabilityIcon" />
      </div>
      <div className="cardLine"></div>
      <h3 className="capabilityTitle">{capability.title}</h3>
      <p className="capabilityDescription">{capability.description}</p>
      <div className="capabilityLink">
        <span className="findOutMore">
          Find out more
          <ArrowRight className="arrowIcon" />
        </span>
      </div>
    </Link>
  );
};

const CoreCapabilities = () => {
  const [hasScrolledIntoView, setHasScrolledIntoView] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null, // Observing within the viewport
      rootMargin: '0px',
      threshold: 0.1, // Trigger when 10% of the component is visible
    };

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setHasScrolledIntoView(true);
          observer.unobserve(entry.target); // Stop observing after the first trigger
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    // Cleanup observer on unmount
    return () => {
      if (wrapperRef.current) {
        observer.unobserve(wrapperRef.current);
      }
    };
  }, []);

  return (
    <div
      id="core-capabilities"
      ref={wrapperRef}
      className={`coreCapabilitiesWrapper ${hasScrolledIntoView ? 'visible' : 'hidden'}`}
    >
      <div className="coreCapabilitiesContainer">
        <h2 className={`coreCapabilitiesTitle ${hasScrolledIntoView ? 'fadeIn' : ''}`}>
          Our Core Capabilities
        </h2>
        <p className={`coreCapabilitiesSubtitle ${hasScrolledIntoView ? 'fadeIn' : ''}`}>
          We turn your biggest challenges into stepping stones for success. Let us guide you in
          transforming pain points into pathways to growth and innovation.
        </p>

        <div className="capabilitiesGrid">
          {capabilities.map((capability, index) => (
            <CapabilityCard
              key={index}
              capability={capability}
              index={index}
              isVisible={hasScrolledIntoView}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoreCapabilities;
