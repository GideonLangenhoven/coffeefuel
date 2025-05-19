// --- File: src/Views/Commercial.js ---
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useInView } from 'react-intersection-observer';
import './Commercial.css';
import Button from '../Components/Button.js';
import ContactSectionCTA from '../Components/ContactSectionCTA.js'; // Import shared CTA
// Removed internal SunriseAnimation component - it's imported via ContactSectionCTA
import commercialSolarVideo from '../assets/video/Solar_Panel_Video_Ready.mp4';

// Import timeline step images (ensure these paths are correct)
import comConsultImage from '../assets/images/comconsult.png';
import useImage from '../assets/images/cominstall.png';
import proposalsImage from '../assets/images/proposals.png';
import proposalImage from '../assets/images/proposal.png';
import monitorsImage from '../assets/images/monitors.png';

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

const AnimatedHeadingComponent = ({ text, className = '', level = 'h2', id, threshold = 0.2, rootMargin = "0px 0px -50px 0px", triggerOnce = false }) => {
  const { ref, inView } = useInView({ triggerOnce, threshold, rootMargin });
  const Tag = level;
  const combinedClassName = `${className || ''} ${inView ? 'heading-visible' : ''}`;
  return <Tag ref={ref} className={combinedClassName} id={id}><span className="underline-span">{text}</span></Tag>;
};

// REMOVED Internal SunriseAnimation Component Definition
// REMOVED Internal ContactSectionCTA Component Definition

// --- Commercial Page Specific Data ---
const commercialBenefitsData = [
    { id: 'cb1', icon: 'power_off', title: 'Eliminate Load Shedding Downtime', text: 'Ensure continuous business operations with reliable solar battery backup power, seamlessly integrating with generators if needed.' },
    { id: 'cb2', icon: 'paid', title: 'Zero Capital Outlay (Solar PPA Option)', text: 'Qualifying SA businesses access a full solar installation via partners like Enfin with NO upfront cost, simply paying a lower rate for the clean energy produced on-site.', linkText: "Learn more in our FAQs", linkTo: "/faqs" },
    { id: 'cb3', icon: 'savings', title: 'Drastically Cut Operating Costs', text: 'Significantly reduce exposure to volatile Eskom tariffs. Solar PPAs often provide immediate savings with locked-in, predictable energy rates lower than the grid.' },
    { id: 'cb4', icon: 'energy_savings_leaf', title: 'Enhance Sustainability & ESG Profile', text: 'Demonstrate environmental responsibility, meet corporate ESG goals, improve your green credentials, and attract eco-conscious clients by switching to renewable solar energy.' },
    { id: 'cb5', icon: 'receipt_long', title: 'Predictable Energy Budgeting', text: 'Shield your business from unpredictable Eskom price hikes (often 12%+) with fixed-rate solar PPAs or transparent financing options. Control your energy costs.' },
    { id: 'cb6', icon: 'construction', title: 'Premium Technology & Reliability', text: 'We utilize bankable, tier-1 commercial solar components (e.g., FOX.ESS inverters, high-efficiency panels) backed by extensive warranties for maximum ROI and operational peace of mind.' },
];

const commercialProcessData = [
    { id: 'com_proc1', yearTitle: 'Step 1', dataText: 'CONSULT & ANALYZE', title: 'Consultation & Energy Use Analysis', text: 'In-depth discussion of operational needs & analysis of historical Eskom bills (12+ months essential for PPA viability).', imageUrl: comConsultImage },
    { id: 'com_proc2', yearTitle: 'Step 2', dataText: 'ASSESS & DESIGN', title: 'On-Site Technical Assessment & System Design', text: 'Our engineers evaluate your premises (roof, structure, electricals) & design a custom commercial solar system for your load profile.', imageUrl: useImage },
    { id: 'com_proc3', yearTitle: 'Step 3', dataText: 'PROPOSE & FINANCE', title: 'Detailed Proposal & Finance/PPA Options', text: 'Receive a comprehensive proposal with system specs, ROI/savings projections & clear financing or PPA options (incl. R0 outlay via Enfin).', imageUrl: proposalsImage },
    { id: 'com_proc4', yearTitle: 'Step 4', dataText: 'INSTALL & INTEGRATE', title: 'Professional Installation & Grid Connection', text: 'Accredited teams manage procurement, logistics, safe installation, municipal/Eskom grid integration (SSEG), & commissioning.', imageUrl: proposalImage },
    { id: 'com_proc5', yearTitle: 'Step 5', dataText: 'MONITOR & MAINTAIN', title: 'System Monitoring, Support & Maintenance', text: 'Post-installation, benefit from advanced performance monitoring, reporting, & proactive commercial solar maintenance plans for optimal long-term savings.', imageUrl: monitorsImage },
];

// --- Child Component for Commercial Benefit Cards ---
// TODO: Refactor CommercialBenefitCard into its own file
const CommercialBenefitCard = ({ icon, title, text, delay, linkTo, linkText }) => (
    <AnimatedPointComponent className="benefit-card commercial-benefit-card" tag="div" delay={delay}>
        <div className="benefit-icon-wrapper commercial-icon-wrapper"><span className="material-icons-outlined">{icon}</span></div>
        <h3>{title}</h3>
        <p>{text}</p>
        {linkTo && linkText && <Link to={linkTo} title={linkText} className="benefit-card-link">{linkText}</Link>}
    </AnimatedPointComponent>
);

// --- Timeline Item Component ---
// TODO: Refactor TimelineItem into its own file
const TimelineItem = ({ item, isActive, onInView }) => {
    const { ref, inView } = useInView({ threshold: 0.5 });
    useEffect(() => { if (inView && onInView) { onInView(); } }, [inView, onInView]);
    return (
        <div ref={ref} className={`timeline-item ${isActive ? 'timeline-item--active' : ''}`} data-text={item.dataText} >
            <div className="timeline__content">
                {item.imageUrl && <img className="timeline__img" src={item.imageUrl} alt={item.title || item.yearTitle} />}
                <h2 className="timeline__content-title">{item.yearTitle}</h2>
                <h3 className="timeline__content-subtitle">{item.title}</h3>
                <p className="timeline__content-desc">{item.text}</p>
            </div>
        </div>
    );
};

const Commercial = ({ paths = {} }) => {
  const [currentTimelineBg, setCurrentTimelineBg] = useState( commercialProcessData.length > 0 && commercialProcessData[0].imageUrl ? commercialProcessData[0].imageUrl : '' );
  const [activeTimelineItemId, setActiveTimelineItemId] = useState( commercialProcessData.length > 0 ? commercialProcessData[0].id : null );

  const handleTimelineItemInView = (itemId, itemImageUrl) => {
    setActiveTimelineItemId(itemId);
    setCurrentTimelineBg(itemImageUrl || ''); // Set to empty string if itemImageUrl is null/undefined
  };

  useEffect(() => {
    if (commercialProcessData.length > 0) {
      setActiveTimelineItemId(commercialProcessData[0].id);
      setCurrentTimelineBg(commercialProcessData[0].imageUrl || '');
    }
  }, []);

  const pageTitle = "Commercial Solar Solutions & PPA | SolPower South Africa";
  const metaDescription = "SolPower delivers expert commercial solar panel installations & zero-capex PPA options for businesses in Cape Town & South Africa. Reduce operating costs, ensure power continuity & meet ESG goals. Request a free assessment.";
  const domain = "https://www.YOUR_DOMAIN.co.za"; // Replace YOUR_DOMAIN
  const canonicalUrl = domain + (paths?.commercial || '/commercial-solar-solutions-sa');
  const webpageSchema = { "@context": "https://schema.org", "@type": "WebPage", "url": canonicalUrl, "name": pageTitle, "description": metaDescription, "publisher": { "@type": "Organization", "name": "SolPower South Africa", "logo": { "@type": "ImageObject", "url": `${domain}/logos/solpower-logo-main.png` } }, "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": domain + (paths?.home || '/') },{ "@type": "ListItem", "position": 2, "name": "Commercial Solar Solutions", "item": canonicalUrl }] } };
  const serviceSchemaCommercial = { "@context": "https://schema.org", "@type": "Service", "serviceType": "Commercial Solar Panel Installation", "provider": { "@type": "Organization", "name": "SolPower South Africa" }, "areaServed": { "@type": "Country", "name": "ZA" }, "description": "Custom-designed commercial solar panel systems for businesses in South Africa to reduce energy costs and ensure power security.", "name": "Commercial Solar Systems" };
  const serviceSchemaPPA = { "@context": "https://schema.org", "@type": "Service", "serviceType": "Solar Power Purchase Agreement (PPA)", "provider": { "@type": "Organization", "name": "SolPower South Africa" }, "areaServed": { "@type": "Country", "name": "ZA" }, "description": "Zero-capex solar solutions for businesses through Power Purchase Agreements (PPAs), offering immediate savings and energy independence.", "name": "Solar PPA (Power Purchase Agreement)" };

  return (
    <div className="page-wrapper commercial-page">
      <Helmet>
        <title>{pageTitle}</title><meta name="description" content={metaDescription} /><link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(webpageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchemaCommercial)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchemaPPA)}</script>
      </Helmet>

      <section className="commercial-intro-section">
        <div className="page-container-inner">
          <AnimatedHeadingComponent text="Commercial & Industrial Solar Solutions" level="h1" className="commercial-page-title" id="commercial-page-title-h1" />
          <AnimatedPointComponent className="intro-lottie-animation-wrapper commercial-lottie-wrapper" delay={0.15} tag="div">
            <dotlottie-player
              src="https://lottie.host/93e8e071-cf77-4c1a-a09a-ec734bae3a43/vzCeuyXCGp.lottie"
              background="transparent" speed="1"
              style={{ position: 'absolute', top: '50%', left: '50%', width: '110%', height: '110%', transform: 'translate(-50%, -50%)' }}
              loop autoplay aria-label="Animated visual for commercial solar solutions"
            />
          </AnimatedPointComponent>
          <AnimatedPointComponent className="commercial-page-subtitle" tag="p" delay={0.3}>Secure your business operations against load shedding and drastically reduce energy overheads with SolPower's tailored commercial solar systems and Power Purchase Agreements (PPAs). Serving Cape Town and major hubs across SA.</AnimatedPointComponent>
          <AnimatedPointComponent delay={0.45} className="intro-button-wrapper">
            <Link to={paths?.contact || '/contact'}><Button className="btn-solpower-primary btn-large">Request Commercial Solar Assessment</Button></Link>
          </AnimatedPointComponent>
        </div>
      </section>

      <section className="commercial-problem-section with-video-bg" aria-labelledby="problem-heading-com">
        <video autoPlay loop muted playsInline className="background-video"><source src={commercialSolarVideo} type="video/mp4" />Your browser does not support the video tag.</video>
        <div className="video-overlay"></div>
        <div className="page-container-inner">
          <AnimatedHeadingComponent text="Stop Letting Eskom Costs & Load Shedding Impact Your Bottom Line" className="commercial-section-heading" level="h2" id="problem-heading-com" />
          <div className="commercial-problem-text-content-video">
            <AnimatedPointComponent tag="p" delay={0.2}>Constant load shedding and escalating Eskom tariffs are significant threats to business continuity and profitability across South Africa. Unreliable power leads to lost production time, operational failures, data loss, and potential equipment damage. Is your business prepared?</AnimatedPointComponent>
            <AnimatedPointComponent tag="p" delay={0.4}>SolPower provides robust <Link to={paths?.home || '/'} title="SolPower Solar Solutions">commercial solar solutions</Link>, including grid-tied systems, hybrid battery backup, and generator integration, specifically engineered for business needs. We help you ensure operational stability, achieve substantial long-term savings on electricity expenses, and bolster your company's sustainability profile for improved ESG reporting and brand image.</AnimatedPointComponent>
          </div>
        </div>
      </section>

      <section className="commercial-benefits-section" aria-labelledby="benefits-heading-com">
        <div className="page-container-inner">
          <AnimatedHeadingComponent text="Key Advantages of Commercial Solar with SolPower" className="commercial-section-heading" level="h2" id="benefits-heading-com" />
          <div className="benefits-grid commercial-benefits-grid">
            {commercialBenefitsData.map((benefit, index) => (
              <CommercialBenefitCard key={benefit.id} icon={benefit.icon} title={benefit.title} text={benefit.text} linkTo={benefit.linkTo ? (paths?.[benefit.linkTo.substring(1).replace(/-/g, '')] || benefit.linkTo) : undefined} linkText={benefit.linkText} delay={index * 0.1} />
            ))}
          </div>
          <AnimatedPointComponent className="partner-info" delay={0.3} tag="div">
             <p>SolPower partners with leading South African energy finance providers like <a href="https://enfin.co.za/" target="_blank" rel="noopener noreferrer" title="Enfin Energy Finance South Africa - Solar PPAs">Enfin Energy Finance</a> to offer businesses flexible Power Purchase Agreements (PPAs) with zero upfront investment.</p>
          </AnimatedPointComponent>
        </div>
      </section>

      <section className="commercial-process-timeline-section">
          <div
            className="timeline-container"
            style={{ backgroundImage: currentTimelineBg ? `url(${currentTimelineBg})` : 'none' }}
          >
            <div className="timeline-header">
              <h2 className="timeline-header__title">Our Streamlined Solar Process</h2>
              <h3 className="timeline-header__subtitle">COMMERCIAL & INDUSTRIAL SOLAR</h3>
            </div>
            <div className="timeline">
              {commercialProcessData.map((item) => (
                <TimelineItem
                  key={item.id}
                  item={item}
                  isActive={activeTimelineItemId === item.id}
                  onInView={() => handleTimelineItemInView(item.id, item.imageUrl)}
                />
              ))}
            </div>
            {/* Button moved inside timeline-container */}
            <AnimatedPointComponent className="intro-button-wrapper timeline-bottom-button-wrapper" delay={0.3}>
                <Link to={paths?.howItWorks || '/how-it-works'}>
                    {/* Changed to secondary variant for contrast */}
                    <Button className="btn-solpower-primary secondary">View Our Detailed Process Steps</Button>
                </Link>
            </AnimatedPointComponent>
          </div>
      </section>

      {/* Use shared CTA */}
      <ContactSectionCTA
        title="Secure Your Business's Energy Future"
        text="Schedule your free, no-obligation assessment today."
        buttonText="Request My Free Commercial Solar Assessment"
        buttonLink={paths?.contact || '/contact'}
        className="cta-content-white commercial-final-cta" // Example custom class
      />
      {/* Footer rendered by App.js */}
    </div>
  );
};

export default Commercial;