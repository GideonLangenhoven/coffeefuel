// src/Views/Services.js
import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './Services.css'; // Import CSS
import ContactSectionCTA from '../Components/ContactSectionCTA'; // Import CTA

// Updated service data for SolPower
const servicesData = [
  {
    id: 'solar',
    title: 'Solar PV Systems',
    description: 'Harness the power of the sun. We design and install high-efficiency grid-tied, hybrid, and off-grid solar panel systems using premium FOX.ESS technology, perfectly tailored to your home or business energy needs and roof specifics.',
    icon: '☀️' // Example icon
  },
  {
    id: 'backup',
    title: 'Battery Backup Solutions',
    description: 'Say goodbye to load shedding disruptions. Our reliable FOX.ESS battery storage and inverter systems provide seamless, automatic backup power for your essential loads, keeping your lights on and operations running.',
    icon: '🔋'
  },
  {
    id: 'consulting',
    title: 'Energy Consultation & Audits',
    description: 'Make informed decisions. Our experts analyze your energy consumption, identify savings opportunities, and provide clear recommendations on the right system size and type for your budget and goals.',
    icon: '📊'
  },
  {
    id: 'maintenance',
    title: 'System Maintenance & Support',
    description: 'Protect your investment for the long term. We offer comprehensive maintenance plans, system monitoring, and responsive support to ensure optimal performance and longevity.',
    icon: '🛠️'
  },
];

const Services = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sectionRefs = useRef({});

  // Scroll logic (no changes needed)
  const scrollToSection = (id) => { /* ... scroll logic ... */ };
  useEffect(() => { /* ... effect logic ... */ }, [location.hash]);
  const setSectionRef = (id) => (el) => { sectionRefs.current[id] = el; };
  const handleNavClick = (id) => { navigate(`#${id}`); scrollToSection(id); };

  return (
    // Added page wrapper class if needed
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
        {/* [Placeholder Image: Background showing diverse solar applications ] */}
        <div className="services-header-container">
          <div className="services-header-content">
            <h1 className="services-header-title">SolPower Energy Services</h1>
            <p className="services-header-description">
              From custom solar design and installation to reliable battery backup and ongoing support, we provide complete energy solutions to empower your independence and savings.
            </p>
          </div>
        </div>
      </section>

      {/* Service Navigation Buttons (optional) */}
      {/* <nav className="services-nav" aria-label="Services Sections">
        {servicesData.map(service => (
          <button key={service.id} onClick={() => handleNavClick(service.id)}>
            {service.title}
          </button>
        ))}
      </nav> */}

      {/* Service Sections with Alternating Backgrounds */}
      {servicesData.map((service, index) => {
         // Determine background class based on index
         const bgClasses = ['bg-white', 'bg-grey', 'bg-yellow-light'];
         const sectionClass = `content-section service-section ${bgClasses[index % bgClasses.length]}`;

        return (
            <section
            key={service.id}
            id={service.id}
            ref={setSectionRef(service.id)}
            className={sectionClass}
            >
            {/* Inner container for padding */}
            <div className="page-container-inner service-card">
                {/* Removed animation class from card */}
                {/* Optional Icon */}
                {/* <div className="service-icon">{service.icon}</div> */}
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                {/* Optional specific CTA */}
                <Link to={`/contact?service=${service.id}`} className="service-cta-link">Learn More & Get Quote →</Link>
            </div>
            </section>
        );
       })}

      <ContactSectionCTA />
      {/* Footer rendered in App.js */}
    </div>
  );
};

export default Services;

// Add styles for .service-cta-link, .page-container-inner to Services.css if needed