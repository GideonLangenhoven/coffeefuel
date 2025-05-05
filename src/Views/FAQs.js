// src/Views/FAQs.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PageStyles.css'; // Shared page styles (ensure this exists and is styled appropriately)
import './FAQs.css';      // Specific FAQ styles (We will update this file below)
import Button from '../Components/Button'; // Assuming Button component exists and is styled

// FAQ data remains the same
const faqData = [
  { id: 'savings', q: "How much can I realistically save with solar?", a: "Most clients save 70-90% monthly. Savings depend on system size, usage, and tariffs. Your quote includes a detailed savings projection." },
  { id: 'installation-time', q: "How long does installation take?", a: "Standard homes take 1-3 days. We schedule for minimal disruption and handle all permits." },
  { id: 'loadshedding', q: "What happens during load shedding?", a: "With battery backup, essential appliances stay powered automatically. You often won't even notice the grid is down." },
  { id: 'warranty', q: "What warranties do you offer?", a: "Industry-leading: 10 years on FOX.ESS inverters/batteries, 25 years on panels, plus a unique replacement guarantee on faulty core components." },
  { id: 'financing', q: "Is financing available?", a: "Yes! We offer affordable options via banking partners (including solar bonds) and R0-down PPAs for qualifying businesses via Enfin." },
  { id: 'batteries', q: "Do I need batteries?", a: "For backup power during load shedding or at night, yes. Grid-tied systems without batteries only save money when the sun shines and the grid is on." },
  { id: 'ppa', q: "What is a PPA (Power Purchase Agreement)?", a: "A PPA is primarily for commercial clients. Instead of buying the system, you agree to buy the electricity it generates from our finance partner (like Enfin) at a fixed, lower rate than Eskom's tariffs, usually with zero upfront cost for the installation." },
];

// --- AccordionItem Component ---
// Added subtle visual separation and improved interaction cues
const AccordionItem = ({ faq, isOpen, onClick }) => (
  // Each item has a border bottom for separation
  <div className={`faq-item ${isOpen ? 'open' : ''}`}>
    <h2> {/* Use h2 for semantic structure, styled like a button */}
      <button
        className="faq-question"
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`} // Link button to answer panel
      >
        <span>{faq.q}</span> {/* Wrap text for better flex alignment */}
        <span className="faq-icon" aria-hidden="true">{/* Icon handled by CSS */}</span>
      </button>
    </h2>
    <div
      id={`faq-answer-${faq.id}`} // ID for aria-controls
      role="region" // Role for accessibility
      aria-labelledby={`faq-question-${faq.id}`} // Link panel back to button (optional but good practice)
      className="faq-answer"
      // Inline style for max-height transition (alternative to className swapping for this property)
      // style={{ maxHeight: isOpen ? '500px' : '0px' }} // Adjust max-height as needed
    >
      <div className="faq-answer-content">
        <p>{faq.a}</p>
      </div>
    </div>
  </div>
);

// --- Main FAQs Component ---
const FAQs = () => {
  const [openId, setOpenId] = useState(null); // Keep track of the currently open FAQ item ID

  // Function to toggle the open state of an FAQ item
  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id); // If clicking the same one, close it; otherwise, open the new one
  };

  return (
    // Assuming .page-wrapper provides basic layout (padding, max-width)
    <div className="page-wrapper bg-white"> {/* Or your desired background */}
      <div className="page-container"> {/* Container for content */}

        <h1 className="page-title">Frequently Asked Questions</h1>

        {/* Use a div to wrap the list for potentially adding borders or shadows */}
        <div className="faq-list-wrapper">
          {faqData.map((faq) => (
            <AccordionItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id} // Pass boolean to determine if item is open
              onClick={() => handleToggle(faq.id)} // Pass toggle handler
            />
          ))}
        </div>

        {/* --- Call to Action Section --- */}
        {/* Using semantic <section> and providing clear heading/paragraph */}
        <section className="content-section cta-section-page faq-cta">
           <h2>Still Have Questions?</h2>
           <p>Our energy experts are ready to help. Contact us for personalized answers.</p>
           <Link to="/contact">
             {/* Ensure Button component is styled well */}
             <Button variant="primary">Ask SolPower</Button>
           </Link>
        </section>

      </div>
    </div>
  );
};

export default FAQs;