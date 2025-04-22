// src/Views/AboutUs.js
import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // useNavigate for button clicks

// Import necessary components (adjust paths as needed)
import NavigationBar from './Navigation'; // Assuming Header component is here
import Footer from '../Components/Footer'; // Assuming Footer component is here

// Import styles
import './AboutUs.css'; // Ensure CSS path is correct

const AboutUs = () => {
  const location = useLocation(); // Gets current URL info, including hash
  const navigate = useNavigate(); // Used for programmatic navigation
  const sectionRefs = useRef({}); // Store refs to sections for scrolling

  // Function to smoothly scroll to a specific section by ID
  const scrollToSection = (id) => {
    const element = sectionRefs.current[id];
    if (element) {
      const yOffset = -80; // Offset for fixed header height (adjust if necessary)
      const yPosition = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: yPosition, behavior: 'smooth' });
    } else {
      console.warn(`Element with id "${id}" not found for scrolling.`);
    }
  };

  // Effect to scroll to section based on URL hash when the component mounts or hash changes
  useEffect(() => {
    const hash = location.hash.substring(1); // Get id from #hash in URL
    if (hash) {
      // Use setTimeout to ensure the element is rendered before scrolling
      const timer = setTimeout(() => {
        scrollToSection(hash);
      }, 100); // Small delay might be needed
      return () => clearTimeout(timer); // Cleanup timer
    } else {
      // Scroll to top if no hash
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.hash]); // Depend on hash changes

  // Function to handle button clicks for navigation
  const handleNavClick = (id) => {
    // Update URL hash without full page reload (optional, good for bookmarking)
    navigate(`#${id}`);
    // Scroll to the section
    scrollToSection(id);
  };

  // Ref callback to populate sectionRefs
  const setSectionRef = (id) => (el) => {
    sectionRefs.current[id] = el;
  };

  // TODO: Replace all 'Terbigen' related content with 'coffeefuel' content
  // focusing on energy solutions, ESKOM pain points, solar, backup power etc.

  return (
    <div className="aboutus-page">
      <NavigationBar />
      <div className="aboutus-container">
        {/* --- Hero Section --- */}
        <section className="aboutus-hero">
          <div className="hero-content">
            {/* TODO: Update Hero Content for coffeefuel */}
            <h1>Powering Your Independence from the Grid</h1>
            <p>
              Tired of load shedding and rising electricity costs? Discover reliable, sustainable energy solutions tailored for South African homes and businesses.
            </p>
            <button className="cta-button" onClick={() => handleNavClick('our-mission')}>
              Explore Our Solutions
            </button>
          </div>
        </section>

        {/* --- Navigation Buttons --- */}
        <nav className="aboutus-nav" aria-label="About Us Sections">
          {/* TODO: Update section IDs and button text for coffeefuel */}
          <button onClick={() => handleNavClick('our-mission')}>The Challenge</button>
          <button onClick={() => handleNavClick('our-approach')}>Our Solution</button>
          <button onClick={() => handleNavClick('our-services')}>Our Services</button>
          {/* <button onClick={() => handleNavClick('strategic-relationships')}>Partners</button> */}
          <button onClick={() => handleNavClick('why-us')}>Why Choose Us</button>
          {/* <button onClick={() => handleNavClick('frameworks')}>Our Technology</button> */}
        </nav>

        {/* --- Content Sections --- */}
        {/* TODO: Update all section content for coffeefuel */}

        <section id="our-mission" ref={setSectionRef('our-mission')} className="content-section">
          <h2>The Challenge: Grid Uncertainty</h2>
          <p>
            South Africans face constant disruptions from load shedding (like ESKOM issues) and unpredictable electricity price hikes. This unreliability impacts daily life, productivity, and business operations, creating stress and financial burdens for homeowners and commercial users alike. Dependence on the national grid feels increasingly risky.
          </p>
        </section>

        <section id="our-approach" ref={setSectionRef('our-approach')} className="content-section">
          <h2>Our Solution: Energy Empowerment</h2>
          <p>
            Coffeefuel provides tailored energy solutions designed to give you control and peace of mind. We analyze your specific needs – whether residential or commercial – to recommend and install the most effective systems, from solar power generation to reliable backup solutions. Our goal is to reduce your reliance on the unstable grid and lower your long-term energy costs.
          </p>
        </section>

        <section id="our-services" ref={setSectionRef('our-services')} className="content-section">
          <h2>Our Services</h2>
          <p>
            We offer a range of services including solar panel installation (PV systems), battery backup systems (inverters and batteries) for load shedding, energy efficiency consultations, and system maintenance. We focus on quality components and expert installation to ensure your system performs optimally for years to come. [Link to Services Page?]
          </p>
          {/* Consider adding sub-sections or linking to the main Services page */}
        </section>

         {/* Commenting out sections less relevant to coffeefuel for now */}
        {/*
        <section id="strategic-relationships" ref={setSectionRef('strategic-relationships')} className="content-section">
          <h2>Strategic Relationships / Partners</h2>
           <p> TODO: Add info about suppliers, technology partners etc. if applicable </p>
        </section>
        */}

        <section id="why-us" ref={setSectionRef('why-us')} className="content-section">
          <h2>Why Choose Coffeefuel?</h2>
          <p>
            We understand the frustrations of South African energy users because we experience them too. We combine technical expertise with a commitment to customer satisfaction. We use high-quality equipment, offer transparent pricing, and provide ongoing support. Our focus is on delivering practical, reliable solutions that make a real difference. [Mention founder/team briefly if relevant to expertise/passion].
          </p>
          {/* <p> Franklin Pieterse, the Founder... [Update or remove founder section] </p> */}
        </section>

        {/*
        <section id="frameworks" ref={setSectionRef('frameworks')} className="content-section">
           <h2>Our Technology / Approach</h2>
           <p> TODO: Discuss technology choices, quality standards, installation process etc. </p>
        </section>
        */}

        {/* --- Final Call to Action Section --- */}
        <section className="cta-section">
          <h2>Ready for Reliable Energy?</h2>
          <p>
            Take the first step towards energy independence. Contact us for a free consultation and quote.
          </p>
          {/* TODO: Link this button to the contact page/form */}
          <button className="cta-button" onClick={() => navigate('/contact')}>
            Get in Touch
          </button>
        </section>

      </div> {/* End aboutus-container */}
      <Footer />
    </div> // End aboutus-page
  );
};

export default AboutUs;