// src/Views/HowItWorks.js
import React from 'react';
import { Link } from 'react-router-dom';
import './PageStyles.css'; // Using shared styles for now
import Button from '../Components/Button';

// TODO: Add images/icons for each step
// import step1Icon from '../assets/images/icon-consult.svg';
// import step2Icon from '../assets/images/icon-design.svg';
// import step3Icon from '../assets/images/icon-install.svg';
// import step4Icon from '../assets/images/icon-support.svg';

const HowItWorks = () => {
  return (
    <div className="page-wrapper">
      <div className="page-container">
        <h1 className="page-title">Your 4-Step Path to Energy Freedom</h1>
        <p className="page-subtitle" style={{textAlign: 'center', maxWidth: '700px', margin: '-2rem auto 3rem'}}>
            Switching to solar with SolPower is straightforward. We handle the complexities so you can enjoy the savings and reliability. Here’s how it works:
        </p>

        <div className="how-it-works-steps"> {/* Container for steps */}
            <section className="content-section step-section">
                {/* <img src={step1Icon} alt="Consultation Icon" className="step-icon"/> */}
                <div className="step-number">1</div>
                <h2>Free Consultation & Assessment</h2>
                <p>It starts with a conversation. Contact us, and we'll discuss your current energy usage, costs, property details (roof type, orientation), and what you want to achieve (bill savings, load shedding backup, or both). We can often provide an initial estimate remotely.</p>
            </section>

            <section className="content-section step-section">
                {/* <img src={step2Icon} alt="Design Icon" className="step-icon"/> */}
                 <div className="step-number">2</div>
                <h2>Tailored Design & Transparent Quote</h2>
                <p>Based on the assessment, our experts design the optimal solar and/or backup system using high-quality FOX.ESS components. You'll receive a detailed, easy-to-understand quote showing the system layout, expected energy production, total cost, financing options (including potential savings comparisons), and clear warranty information.</p>
            </section>

            <section className="content-section step-section">
                 {/* <img src={step3Icon} alt="Installation Icon" className="step-icon"/> */}
                 <div className="step-number">3</div>
                <h2>Seamless & Professional Installation</h2>
                <p>Once you approve the quote, we handle everything. Our certified installation teams manage permits, schedule the work (typically 1-3 days), install the panels, inverters, and batteries with precision, and ensure proper grid connection and compliance (SSEG registration). We prioritize safety and minimal disruption.</p>
            </section>

            <section className="content-section step-section">
                 {/* <img src={step4Icon} alt="Support Icon" className="step-icon"/> */}
                 <div className="step-number">4</div>
                <h2>Lifetime Savings & Ongoing Support</h2>
                <p>Flip the switch and start saving! You'll immediately notice lower electricity bills and enjoy uninterrupted power during load shedding. We provide access to monitoring apps (like the FOX app) so you can track your system's performance. SolPower offers ongoing support and optional maintenance plans for complete peace of mind.</p>
            </section>
        </div>

         <section className="content-section cta-section-page">
           <h2>Ready to Start Your Journey?</h2>
           <p>Take the first step towards energy independence. It's simpler than you think.</p>
           <Link to="/contact">
             <Button variant="primary">Start with Step 1: Free Consultation</Button>
           </Link>
        </section>
      </div>
    </div>
  );
};

export default HowItWorks;

// Add styles for .page-subtitle, .how-it-works-steps, .step-section, .step-icon, .step-number in PageStyles.css or a new HowItWorks.css