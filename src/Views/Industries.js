// src/Views/Industries.js -> Conceptually CustomerSectors
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
// Removed Navigation import (handled by App.js)
// Removed Footer import (handled by App.js)
import './PageStyles.css'; // Import shared styles

const Industries = () => { // Rename component if file is renamed
  const location = useLocation();
  const sectionRefs = useRef({});

  const scrollToSection = (id) => { /* ... scroll logic as before ... */ };

  useEffect(() => { /* ... effect logic as before ... */ }, [location.hash]);

  const setSectionRef = (id) => (el) => { sectionRefs.current[id] = el; };

  // TODO: Update sections for SolPower customer types
  const sections = [
    { id: 'residential', title: 'Residential Homes' },
    { id: 'commercial', title: 'Commercial & Industrial' },
    { id: 'agricultural', title: 'Farms & Agriculture' },
  ];

  return (
    // Use classes from PageStyles.css
    <div className="page-wrapper">
      <div className="page-container">
        <h1 className="page-title">Who We Serve</h1>

        <nav className="section-nav" aria-label="Customer Sectors">
          {sections.map(sec => ( <button key={sec.id} onClick={() => scrollToSection(sec.id)}>{sec.title}</button> ))}
        </nav>

        {/* TODO: Add specific content for each sector */}
        <section id="residential" ref={setSectionRef('residential')} className="content-section">
          <h2>{sections.find(s=>s.id==='residential').title}</h2>
          <p>Power your home reliably and sustainably. We offer custom solar and backup solutions for houses of all sizes, helping you save on electricity bills and navigate load shedding with ease...</p>
        </section>
        <section id="commercial" ref={setSectionRef('commercial')} className="content-section">
          <h2>{sections.find(s=>s.id==='commercial').title}</h2>
          <p>Ensure business continuity and reduce operating costs with our scalable energy systems. Ideal for offices, factories, retail spaces, and more...</p>
        </section>
        <section id="agricultural" ref={setSectionRef('agricultural')} className="content-section">
          <h2>{sections.find(s=>s.id==='agricultural').title}</h2>
          <p>Reliable power for essential farming operations. Our robust solutions can handle the demands of irrigation, processing equipment, and remote facilities...</p>
        </section>
      </div>
    </div>
  );
};

export default Industries; // Rename export if file renamed