// --- File: src/Views/FAQs.js ---
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useInView } from 'react-intersection-observer';
import './FAQs.css';
import Button from '../Components/Button.js';
import ContactSectionCTA from '../Components/ContactSectionCTA.js'; // Import shared CTA
// Removed internal SunriseAnimation component - it's imported via ContactSectionCTA

// --- Reusable Animation Components ---
// TODO: Refactor these into their own files src/Components/
const AnimatedPointComponent = React.forwardRef(
  ({ children, className, tag: Tag = 'div', delay = 0, threshold = 0.1, triggerOnce = false, style: customStyle = {}, onInViewChange }, ref) => {
    const { ref: intersectionRef, inView } = useInView({ triggerOnce, threshold });
    const setRefs = useCallback(
      (node) => {
        intersectionRef(node);
        if (ref) {
          if (typeof ref === 'function') ref(node);
          else ref.current = node;
        }
      }, [intersectionRef, ref]
    );
    useEffect(() => {
      if (onInViewChange) onInViewChange(inView);
    }, [inView, onInViewChange]);
    const combinedClassName = `${className || ''} ${inView ? 'fade-in-up visible' : 'fade-in-up'}`;
    const finalStyle = { ...customStyle, transitionDelay: `${delay}s` };
    return <Tag ref={setRefs} className={combinedClassName} style={finalStyle}>{children}</Tag>;
  }
);

const AnimatedHeadingComponent = ({ text, className = '', level = 'h1', id, threshold = 0.2, rootMargin = "0px 0px -50px 0px", triggerOnce = false }) => {
  const { ref, inView } = useInView({ triggerOnce, threshold, rootMargin });
  const Tag = level;
  const combinedClassName = `${className || ''} ${inView ? 'heading-visible' : ''}`;
  return <Tag ref={ref} className={combinedClassName} id={id}><span className="underline-span">{text}</span></Tag>;
};

// REMOVED Internal SunriseAnimation Component Definition
// REMOVED Internal ContactSectionCTA Component Definition

// --- EXPANDED FAQ Data ---
const faqData = [
  { id: 'savings-ct', q: "How much can I realistically save with solar panels in Cape Town?", a: "Most SolPower residential clients in Cape Town save 70-90% on their monthly Eskom electricity bill. Commercial savings depend on usage and system type (including PPA benefits). Savings factors include system size, energy consumption patterns, current City of Cape Town tariffs, and chosen financing. Your personalized SolPower quote provides a detailed projected savings analysis." },
  { id: 'install-time-ct', q: "How long does solar panel installation take in Cape Town?", a: "A standard residential solar installation in the Cape Town area typically takes 1-3 days. Commercial solar projects vary based on system size and complexity, typically ranging from a few days to several weeks for larger systems. We always schedule efficiently to minimize disruption to your home or business, and our team handles all City of Cape Town permits and paperwork (SSEG applications)." },
  { id: 'loadshedding-solar', q: "How do SolPower solar systems handle load shedding?", a: "Our recommended hybrid solar systems include battery backup (like high-performance FOX.ESS batteries). During load shedding, the system automatically and instantaneously switches, powering your essential circuits (lights, Wi-Fi, fridge, security, select plugs, or even entire premises for commercial clients) using stored solar energy or battery power. You often won't even notice the Eskom grid is down, ensuring business and home continuity." },
  { id: 'solar-warranty', q: "What warranties come with SolPower solar systems?", a: "We provide robust peace of mind with industry-leading warranties: typically a 25-year linear performance warranty on Tier-1 solar panels, and comprehensive 10-12 year warranties on quality inverters and batteries (e.g., FOX.ESS). Specific component guarantees and workmanship warranties are also provided – your SolPower consultant will detail these in your proposal." },
  { id: 'solar-finance-sa', q: "What solar financing options are available in South Africa?", a: "SolPower offers diverse financing routes. For homeowners, we facilitate affordable solar finance via banking partners (e.g., using your home loan/bond facility, or dedicated green loans). For qualifying businesses across South Africa, we, through partners like Enfin Energy Finance, offer R0-down Capital Expenditure Power Purchase Agreements (PPAs), enabling immediate savings without upfront CAPEX." },
  { id: 'need-batteries', q: "Do I absolutely need solar batteries for my system?", a: "For true energy independence and protection against load shedding, solar batteries are highly recommended for most users in South Africa. A grid-tied system *without* batteries only generates power (and savings) when the sun shines AND the Eskom grid is operational. Batteries allow you to store excess solar energy for use during outages, at night, or to further optimize self-consumption. We strongly advise battery backup for energy security and maximizing self-consumption." },
  { id: 'what-is-ppa', q: "Can you explain a Solar PPA (Power Purchase Agreement) in more detail?", a: "A Solar PPA is a financing solution primarily for commercial and industrial clients. Instead of purchasing the solar system, your business enters into a long-term agreement (typically 15-25 years) to buy the solar electricity generated on your premises from the PPA provider (our finance partner, e.g., Enfin) at a pre-agreed rate. This rate is usually lower than Eskom tariffs, offering immediate operational savings with zero upfront capital investment from your side. The PPA provider owns, maintains, and insures the system for the duration of the agreement." },
  { id: 'roof-suitability', q: "Is my roof suitable for solar panels?", a: "Most roof types in South Africa (tile, metal sheeting including IBR and Klip-Lok, flat concrete) are suitable. Key factors include roof orientation (North-facing is ideal, but East/West can also be highly effective), pitch/angle, available unshaded space, and structural integrity. Our initial assessment includes a thorough evaluation of your roof's suitability." },
  { id: 'solar-maintenance', q: "What maintenance do solar panels and systems require?", a: "Solar panels are very low maintenance, mainly requiring occasional cleaning (typically once or twice a year in areas like Cape Town, depending on dust and pollen levels) to ensure optimal sunlight absorption. Inverters and batteries are largely maintenance-free but benefit from periodic visual checks and software updates if applicable. SolPower offers comprehensive maintenance plans for both residential and commercial systems to ensure peak performance and longevity." },
  { id: 'city-cape-town-rego', q: "What about City of Cape Town solar regulations (SSEG) and other municipalities?", a: "SolPower manages the entire Small-Scale Embedded Generation (SSEG) application and registration process with the City of Cape Town or the relevant municipality for your grid-tied or hybrid solar system. We ensure your installation is fully compliant with all local regulations, NERSA guidelines, and SANS standards, providing you with a hassle-free experience." },
  { id: 'system-lifespan', q: "How long do solar power systems typically last?", a: "Quality solar power systems are built for durability. Solar panels often have a performance warranty of 25 years and can last much longer. Inverters typically have a lifespan of 10-15 years, with warranties around 10 years. Batteries, depending on the technology (like Lithium Ferro Phosphate - LFP used in FOX.ESS) and usage, can last 10-15 years or more, often measured in charge cycles. SolPower focuses on Tier-1 components for maximum longevity." },
  { id: 'fox-ess-tech', q: "You mention FOX.ESS. What's special about their technology?", a: "FOX.ESS is a leading global manufacturer of advanced solar inverters and energy storage solutions. We often recommend their high-voltage battery systems due to their excellent performance, high efficiency, scalability, advanced battery management system (BMS) for safety and longevity, and robust warranties. Their hybrid inverters are also highly regarded for their reliability and smart features." },
  { id: 'expand-system', q: "Can I expand my solar system in the future?", a: "Yes, in many cases. When we design your initial system, we can discuss potential future expansion (e.g., adding more panels or batteries). The feasibility depends on the initial inverter capacity, available roof/ground space, and your evolving energy needs. It's best to plan for potential expansion from the outset if anticipated." },
  { id: 'ppa-end-term', q: "What happens at the end of a commercial Solar PPA term?", a: "At the end of a typical PPA term (e.g., 15-25 years), businesses usually have several options. These can include: 1) Purchasing the solar system at a pre-agreed or fair market value. 2) Renewing the PPA for another term. 3) Requesting the PPA provider to remove the system at no cost. The specific options will be clearly outlined in your PPA contract." },
  { id: 'grid-tied-vs-hybrid', q: "What is the difference between a grid-tied and a hybrid solar system?", a: "A Grid-Tied system is connected to the Eskom grid and generates power when the sun shines. It reduces your reliance on grid electricity but typically does not provide power during load shedding unless paired with batteries. A Hybrid system includes batteries, allowing you to store excess solar power for use during outages, at night, or to further optimize self-consumption. Most SolPower installations for load shedding protection are hybrid systems." },
  { id: 'installation-disruption', q: "How disruptive is the solar installation process at my home or business?", a: "We meticulously plan installations to minimize disruption. For residential sites, it's typically 1-3 days, and for commercial sites, it varies by scale but is always scheduled in phases if needed. There might be a brief period (a few hours) where mains power is switched off for final grid connection, but we coordinate this carefully with you." },
  { id: 'monitoring-details', q: "What can I see with the solar system monitoring you provide?", a: "Our advanced monitoring systems (often via a mobile app or web portal) provide real-time and historical data on: your solar panels' energy production, your property's energy consumption, battery charge/discharge status, how much energy you're drawing from or feeding back to the grid (if applicable), and often, estimated financial savings. This empowers you to understand and optimize your energy usage." },
  { id: 'ppa-business-suitability', q: "What kind of businesses benefit most from a Solar PPA?", a: "Businesses with significant daytime electricity consumption, good financial standing, and long-term occupancy of their premises (owned or long-leased with landlord permission) are often excellent candidates for a PPA. This typically includes manufacturing plants, office buildings, retail centers, agricultural operations, and schools. A minimum electricity consumption level is usually required for PPA viability." },
  { id: 'safety-solar', q: "Are solar installations safe for my property?", a: "Absolutely. When installed by certified and experienced professionals like SolPower, solar PV systems are very safe. We adhere strictly to all South African National Standards (SANS), electrical codes, and safety regulations. Quality components also have built-in safety features, and our installations include necessary DC and AC protection devices." },
  { id: 'esg-benefits-details', q: "How specifically does solar enhance a business's ESG profile?", a: "Switching to solar directly addresses the 'Environmental' aspect of ESG by significantly reducing your company's carbon footprint and reliance on fossil fuels. This demonstrates a commitment to sustainability, which can improve brand reputation, meet regulatory requirements, attract eco-conscious customers and investors, and contribute to achieving corporate social responsibility (CSR) goals." },
];

// --- AccordionItem Component ---
// TODO: Refactor AccordionItem into its own file
const AccordionItem = ({ faq, isOpen, onClick }) => (
  <div className={`faq-item ${isOpen ? 'open' : ''}`}>
    <h2 className="faq-question-heading">
      <button className="faq-question" onClick={onClick} aria-expanded={isOpen} aria-controls={`faq-answer-${faq.id}`} id={`faq-question-${faq.id}`}>
        <span>{faq.q}</span>
        <span className="faq-icon" aria-hidden="true"></span>
      </button>
    </h2>
    <div id={`faq-answer-${faq.id}`} role="region" aria-labelledby={`faq-question-${faq.id}`} className="faq-answer">
      <div className="faq-answer-content"> <p>{faq.a}</p> </div>
    </div>
  </div>
);

const FAQs = ({ paths = {} }) => {
  const [openId, setOpenId] = useState(faqData.length > 0 ? faqData[0].id : null);
  const handleToggle = (id) => { setOpenId(openId === id ? null : id); };

  const pageTitle = "Solar Power FAQs | Costs, Savings, Load Shedding | SolPower";
  const metaDescription = "Answers to frequently asked questions about SolPower solar panel installations: costs, Eskom bill savings, load shedding solutions, battery backup, financing, PPAs & City regulations.";
  const domain = "https://www.YOUR_DOMAIN.co.za"; // Replace YOUR_DOMAIN
  const canonicalUrl = domain + (paths?.faqs || '/faqs');
  const webpageSchema = { "@context": "https://schema.org", "@type": "WebPage", "url": canonicalUrl, "name": pageTitle, "description": metaDescription, "publisher": { "@type": "Organization", "name": "SolPower", "logo": { "@type": "ImageObject", "url": `${domain}/logo.png` } } };
  const faqPageSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqData.map(item => ({ "@type": "Question", "name": item.q, "acceptedAnswer": { "@type": "Answer", "text": item.a } })) };

  return (
    <div className="page-wrapper faqs-page">
      <Helmet>
        <title>{pageTitle}</title><meta name="description" content={metaDescription} /><link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(webpageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqPageSchema)}</script>
      </Helmet>
      <section className="faqs-main-section">
        <div className="page-container-inner">
          <AnimatedHeadingComponent text="Solar Power Frequently Asked Questions" level="h1" className="faqs-page-title" id="faq-main-title" />
          <AnimatedPointComponent className="faq-list-wrapper" delay={0.2} tag="div" aria-label="Frequently Asked Questions List">
            {faqData.map((faq) => ( <AccordionItem key={faq.id} faq={faq} isOpen={openId === faq.id} onClick={() => handleToggle(faq.id)} /> ))}
          </AnimatedPointComponent>
        </div>
      </section>

      {/* Use shared CTA */}
      <ContactSectionCTA
        title="Still Have Questions?"
        text="Our dedicated SolPower team is ready to provide personalized answers about solar panels, batteries, inverters, installation, and financing. Contact us today for expert advice!"
        buttonText="Ask Our Solar Experts"
        buttonLink={paths?.contact || '/contact'}
      />
      {/* Footer rendered by App.js */}
    </div>
  );
};

export default FAQs;