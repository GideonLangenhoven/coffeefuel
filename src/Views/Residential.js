import React from 'react'; // Make sure React is imported
import { Link } from 'react-router-dom';
// Ensure you have run: npm install react-intersection-observer
import { useInView } from 'react-intersection-observer';
// import Header from './Header'; // Assuming Header/Navigation is used globally via App.js
import Button from '../Components/Button'; // Use Button component

// Import CSS
import './Residential.css'; // Make sure path is correct

// --- Constants and Helpers ---
// Define these helper functions here or import from a utility file
const getFadeInUpClass = (inView) => `${inView ? 'fade-in-up visible' : 'fade-in-up'}`;
const getHeadingClass = (inView) => `${inView ? 'heading-visible' : ''}`;
const commonThreshold = { triggerOnce: true, threshold: 0.1 };
const headingThreshold = { triggerOnce: true, threshold: 0.2, rootMargin: "0px 0px -50px 0px" };

// Define data arrays outside the component
const benefitsData = [
    { icon: 'offline_bolt', title: 'Beat Load Shedding', text: 'Keep lights, Wi-Fi, and essential appliances running smoothly with reliable battery backup.' },
    { icon: 'savings', title: 'Slash Your Bills', text: 'Drastically reduce or eliminate grid dependence. Generate free, clean electricity from the sun.' },
    { icon: 'trending_up', title: 'Increase Property Value', text: 'Solar installations are a smart investment, potentially boosting your home\'s market value.' },
    { icon: 'lock', title: 'Fixed Energy Costs', text: 'Protect your budget from unpredictable annual Eskom tariff hikes (averaging 12%+).' },
    { icon: 'eco', title: 'Go Green', text: 'Significantly reduce your carbon footprint and contribute to a sustainable South Africa.' },
    { icon: 'shield', title: 'Peace of Mind', text: 'Benefit from industry-leading warranties (10 years on FOX.ESS systems, 25 years on panels) and dedicated support.' },
];

const processData = [
    { title: 'Free Consultation & Assessment', text: 'We discuss your specific energy needs, analyze your consumption patterns, and evaluate your property (remotely or on-site) for solar suitability.' },
    { title: 'Custom Design & Transparent Quote', text: 'You receive a detailed proposal outlining the optimal FOX.ESS system size, clear costs, projected savings, and available financing options.' },
    { title: 'Seamless & Professional Installation', text: 'Our certified team handles all permits, installs your system efficiently (typically 1-3 days) with minimal disruption, and ensures proper grid connection.' },
    { title: 'Savings, Monitoring & Support', text: 'Start saving immediately! We provide access to system monitoring, offer maintenance plans, and deliver ongoing customer support.' },
];


// --- Child Component for Benefit Cards ---
const BenefitCard = ({ icon, title, text, delay }) => {
  const { ref, inView } = useInView(commonThreshold);
  return (
    <div
      ref={ref}
      className={`benefit-card ${getFadeInUpClass(inView)}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="benefit-icon-wrapper">
        {/* Ensure material icons font is loaded via CSS or index.html */}
        <span className="material-icons-outlined">{icon}</span>
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
};

// --- Child Component for Process Steps ---
const ProcessStepItem = ({ index, title, text, delay }) => {
  const { ref, inView } = useInView(commonThreshold);
  return (
    <li
      ref={ref}
      className={`process-step-item ${getFadeInUpClass(inView)}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {/* Ensure CSS styles this span */}
      <span className="step-number-visual">{index + 1}</span>
      <div className="step-content-wrapper">
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
    </li>
  );
};


// --- Main Residential Component ---
const Residential = () => {
  // --- Hooks for Intersection Observer ---
  // Ensure useInView is called at the top level
  const { ref: introRef, inView: introInView } = useInView(commonThreshold);
  const { ref: introTitleRef, inView: introTitleInView } = useInView(headingThreshold);
  const { ref: introSubtitleRef, inView: introSubtitleInView } = useInView(commonThreshold);
  const { ref: introButtonRef, inView: introButtonInView } = useInView(commonThreshold);

  const { ref: problemRef, inView: problemInView } = useInView(commonThreshold);
  const { ref: problemTitleRef, inView: problemTitleInView } = useInView(headingThreshold);
  const { ref: problemP1Ref, inView: problemP1InView } = useInView(commonThreshold);
  const { ref: problemP2Ref, inView: problemP2InView } = useInView(commonThreshold);

  const { ref: benefitsRef, inView: benefitsInView } = useInView(commonThreshold);
  const { ref: benefitsTitleRef, inView: benefitsTitleInView } = useInView(headingThreshold);

  const { ref: processRef, inView: processInView } = useInView(commonThreshold);
  const { ref: processTitleRef, inView: processTitleInView } = useInView(headingThreshold);

  const { ref: ctaRef, inView: ctaInView } = useInView(commonThreshold);
  const { ref: ctaContentRef, inView: ctaContentInView } = useInView(commonThreshold);


  return (
    // Added class for page-specific styling if needed
    <div className="residential-page">
      {/* Header/NavigationBar assumed to be in App.js */}
      {/* <Header /> */}

      {/* Sections using the refs and inView states */}

      {/* --- 1. Intro Section --- */}
      <section ref={introRef} className="residential-intro-section bg-yellow-light text-center">
        {/* Assumes .page-container-inner class exists in base CSS */}
        <div className="page-container-inner">
          {/* H1 for main page title */}
          <h1
            ref={introTitleRef}
            // Ensure CSS targets .residential-page-title
            className={`residential-page-title ${getHeadingClass(introTitleInView)}`}
          >
            <span className="underline-span">
              Power Your Home with SolPower
            </span>
          </h1>
          <p
            ref={introSubtitleRef}
            // Ensure CSS targets .residential-page-subtitle
            className={`residential-page-subtitle ${getFadeInUpClass(introSubtitleInView)}`}
            style={{ transitionDelay: '0.1s' }}
          >
            Stop renting electricity, start owning your power. Say goodbye to unpredictable bills and load shedding disruptions with reliable, affordable solar energy.
          </p>
          <div
            ref={introButtonRef}
            className={getFadeInUpClass(introButtonInView)}
            style={{ transitionDelay: '0.2s' }}
          >
             <Link to="/contact">
                 {/* Ensure CSS targets .btn-solpower-primary */}
                <Button className="btn-solpower-primary">Get My Free Quote</Button>
             </Link>
           </div>
        </div>
      </section>

      {/* --- 2. Problem/Solution Section --- */}
      <section ref={problemRef} className="residential-problem-section bg-grey">
        <div className="page-container-inner">
           {/* H2 for section heading */}
           <h2
             ref={problemTitleRef}
              // Ensure CSS targets .residential-section-heading
             className={`residential-section-heading ${getHeadingClass(problemTitleInView)}`}
           >
             <span className="underline-span">
               Tired of Rising Costs & Power Cuts?
             </span>
           </h2>
           <p
             ref={problemP1Ref}
             className={getFadeInUpClass(problemP1InView)}
             style={{ transitionDelay: '0.1s' }}
           >
             Unpredictable Eskom bills straining your budget? Load shedding interrupting family life and work? It's time for a reliable, cost-effective solution. SolPower offers tailor-made solar and backup power systems designed specifically for South African homes.
           </p>
           <p
             ref={problemP2Ref}
             className={getFadeInUpClass(problemP2InView)}
             style={{ transitionDelay: '0.2s' }}
           >
             Imagine slashing your monthly electricity costs by <strong>up to 90%</strong>, enjoying <strong>uninterrupted power</strong> during outages, and increasing your property value – all while contributing to a greener future. With SolPower and our premium FOX.ESS systems, this is not just possible, it's more affordable than you think.
           </p>
        </div>
      </section>

      {/* --- 3. Benefits Section --- */}
      <section ref={benefitsRef} className="residential-benefits-section bg-white">
        <div className="page-container-inner">
           <h2
              ref={benefitsTitleRef}
              className={`residential-section-heading ${getHeadingClass(benefitsTitleInView)}`}
            >
              <span className="underline-span">
                Why Homeowners Choose SolPower
              </span>
            </h2>
            {/* Ensure CSS targets .benefits-grid */}
           <div className="benefits-grid">
             {benefitsData.map((benefit, index) => (
                <BenefitCard
                    // Use a more stable key if possible, like a unique ID if benefit object had one
                    key={benefit.title + index}
                    icon={benefit.icon}
                    title={benefit.title}
                    text={benefit.text}
                    delay={index * 0.1}
                />
             ))}
           </div>
        </div>
      </section>

       {/* --- 4. Process Section --- */}
       <section ref={processRef} className="residential-process-section bg-grey">
        <div className="page-container-inner">
           <h2
             ref={processTitleRef}
             className={`residential-section-heading ${getHeadingClass(processTitleInView)}`}
            >
             <span className="underline-span">
               Our Simple Path to Energy Independence
             </span>
           </h2>
           {/* Ensure CSS targets .process-steps-list */}
          <ol className="process-steps-list">
             {processData.map((step, index) => (
                <ProcessStepItem
                    // Use a more stable key if possible
                    key={step.title + index}
                    index={index}
                    title={step.title}
                    text={step.text}
                    delay={index * 0.15}
                />
             ))}
          </ol>
        </div>
      </section>

      {/* --- 5. Call to Action Section --- */}
       {/* Ensure CSS targets .contact-section-cta and .cta-content-white */}
      <section ref={ctaRef} className="contact-section-cta cta-content-white">
        {/* Ensure CSS targets .cta-text-content */}
        <div ref={ctaContentRef} className={`cta-text-content ${getFadeInUpClass(ctaContentInView)}`}>
            <h2>Ready to Take Control of Your Home's Energy?</h2>
            <p style={{ transitionDelay: '0.1s' }}>
                Discover how much you could save with solar. Get your free, no-obligation quote tailored to your home today!
            </p>
            <div style={{ transitionDelay: '0.2s' }}>
                <Link to="/contact">
                    <Button className="btn-solpower-primary">Get My Free Residential Quote</Button>
                </Link>
            </div>
        </div>
    </section>

      {/* Footer component reference if it exists */}
      {/* <Footer /> */}
    </div>
  );
};

export default Residential;