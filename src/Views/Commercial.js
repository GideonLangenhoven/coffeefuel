// src/Views/Commercial.js
import React from 'react';
import { Link } from 'react-router-dom';
import './PageStyles.css';  // Shared styles
import './Commercial.css'; // Specific Commercial styles
import Button from '../Components/Button'; // Import the Button component

// TODO: Uncomment and use actual image imports when available
// import commercialImage1 from '../assets/images/commercial-solar-roof.jpg';
// import enfinLogo from '../assets/images/enfin-logo.png'; // Partner logo

const Commercial = () => {
  return (
    <div className="page-wrapper">
      <div className="page-container">

        {/* --- Hero/Intro Section --- */}
        <section className="content-section intro-section text-center">
          <h1 className="page-title">Powering Business Success with Solar</h1>
          {/* <img src={commercialImage1} alt="Large commercial building roof covered in solar panels" className="page-section-image hero-image" /> */}
          <p className="page-subtitle">
            Secure your operations against load shedding and drastically reduce energy overheads with tailored commercial solar solutions.
          </p>
        </section>

        {/* --- Problem/Solution Section --- */}
        <section className="content-section">
          <h2>Stop Letting Energy Costs & Downtime Erode Your Profits</h2>
          <p>
            Load shedding and escalating electricity tariffs pose significant threats to South African businesses. Unreliable power translates to lost productivity, missed deadlines, and potentially damaged equipment. Rising energy costs directly impact your bottom line.
          </p>
          <p>
            SolPower provides robust solar and backup power solutions specifically engineered for commercial and industrial demands. We help you ensure operational continuity, achieve substantial long-term savings, and enhance your company's sustainability profile.
          </p>
        </section>

        {/* --- Benefits Section --- */}
        <section className="content-section benefits-section">
          <h2>Advantages of Commercial Solar with SolPower:</h2>
          <ul className="benefits-list commercial-benefits"> {/* Specific class */}
            <li>
              <span className="benefit-icon">💡</span> {/* Placeholder icon */}
              <strong>Eliminate Downtime:</strong> Ensure continuous power for critical systems during load shedding with reliable battery backup and optional generator integration.
            </li>
            <li>
              <span className="benefit-icon"> R0 </span> {/* Highlight PPA */}
              <strong>Zero Capital Outlay (PPA Option):</strong> Qualifying businesses can get a complete solar installation via our partner Enfin with <strong>NO upfront cost</strong>, simply paying for the cheaper energy produced.
            </li>
             <li>
              <span className="benefit-icon">💰</span>
              <strong>Drastically Cut Operating Costs:</strong> Significantly reduce dependence on volatile grid tariffs. PPAs often lock in lower, fixed energy rates from day one.
            </li>
            <li>
              <span className="benefit-icon">🌿</span>
              <strong>Boost Sustainability & ESG:</strong> Enhance your brand image, meet environmental, social, and governance goals, and attract eco-conscious clients by switching to clean energy.
            </li>
            <li>
              <span className="benefit-icon">📈</span>
              <strong>Predictable Budgeting:</strong> Protect your business from unpredictable Eskom price hikes with fixed-rate PPAs or transparent finance options. Lock in your energy costs.
            </li>
            <li>
              <span className="benefit-icon">🔧</span>
              <strong>Premium Tech & Reliability:</strong> We utilize top-tier, bankable FOX.ESS systems backed by exceptional warranties for maximum performance and peace of mind.
            </li>
          </ul>
          {/* --- Partner Information --- */}
          <div className="partner-info">
             <p>
                We partner with leading finance providers like Enfin to offer flexible Power Purchase Agreements (PPAs).
                <a href="https://enfin-energy-finance.co.za" target="_blank" rel="noopener noreferrer" className="partner-learn-more">
                  Learn more about Enfin Energy Finance
                </a>
             </p>
             {/* <img src={enfinLogo} alt="Enfin Energy Finance Logo" className="partner-logo" /> */}
          </div>
        </section>

        {/* --- Process Section --- */}
        <section className="content-section process-section">
          <h2>Our Streamlined Process for Businesses</h2>
           <ol className="process-steps commercial-process"> {/* Specific class */}
             <li>
               <span className="step-number">1</span>
               <div className="step-content">
                 <strong>Consultation & Energy Analysis:</strong> We start with a detailed discussion of your operational requirements and analyze your historical energy consumption (min. 12 months electricity bills preferred, essential for PPA).
               </div>
             </li>
             <li>
                <span className="step-number">2</span>
               <div className="step-content">
                 <strong>On-Site Assessment & Custom Design:</strong> Our engineers conduct a thorough technical evaluation of your premises and design a bespoke solar system (PV panels, inverters, batteries, integration) optimized for your load profile and goals.
               </div>
             </li>
             <li>
               <span className="step-number">3</span>
               <div className="step-content">
                 <strong>Proposal, PPA & Finance Options:</strong> You receive a comprehensive proposal detailing system specs, performance projections, projected ROI/savings, and clear financing or Power Purchase Agreement (PPA) options, including Enfin's R0 outlay solution.
                </div>
             </li>
             <li>
               <span className="step-number">4</span>
               <div className="step-content">
                  <strong>Professional Installation & Commissioning:</strong> Our accredited installation teams manage the entire process, including procurement, logistics, safe installation, grid integration (SSEG applications), and system commissioning, ensuring compliance and quality.
                </div>
             </li>
              <li>
               <span className="step-number">5</span>
               <div className="step-content">
                 <strong>Monitoring, Support & Maintenance:</strong> Post-installation, you benefit from advanced system monitoring, performance reporting, and proactive maintenance services to ensure optimal long-term energy production and savings.
               </div>
             </li>
          </ol>
        </section>

         {/* --- Call to Action Section --- */}
         <section className="content-section cta-section-page commercial-cta"> {/* Specific class */}
           <h2>Secure Your Business's Energy Future Today</h2>
           <p>Discover the significant cost savings and operational benefits SolPower can deliver. Schedule your free, no-obligation commercial solar assessment now.</p>
           {/* Use the Button component wrapped in Link */}
           <Link to="/contact">
              <Button variant="primary" size="large">Request Commercial Assessment</Button>
           </Link>
        </section>

      </div>
    </div>
  );
};

export default Commercial;