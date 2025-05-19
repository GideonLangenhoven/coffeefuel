// --- File: src/Views/Residential.js ---
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useInView } from 'react-intersection-observer';
import Button from '../Components/Button.js';
import ContactSectionCTA from '../Components/ContactSectionCTA.js'; // Import shared CTA
// Removed internal SunriseAnimation component - it's imported via ContactSectionCTA
import solarVideo from '../assets/video/Solar_Panel_Installation_Video_Ready.mp4';

// Import timeline step images (ensure these paths are correct)
import consultationImage from '../assets/images/consultation.png';
import designImage from '../assets/images/design.png';
import installationImage from '../assets/images/installation.png';
import monitorImage from '../assets/images/monitor.png';

import './Residential.css';

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

const AnimatedHeadingComponent = ({ text, className = '', level = 'h2', threshold = 0.2, rootMargin = "0px 0px -50px 0px", triggerOnce = false }) => {
  const { ref, inView } = useInView({ triggerOnce, threshold, rootMargin });
  const Tag = level;
  const combinedClassName = `${className || ''} ${inView ? 'heading-visible' : ''}`;
  return <Tag ref={ref} className={combinedClassName}><span className="underline-span">{text}</span></Tag>;
};

// REMOVED Internal SunriseAnimation Component Definition
// REMOVED Internal ContactSectionCTA Component Definition

// --- Data ---
const benefitsData = [
    { icon: 'offline_bolt', title: 'Beat Load Shedding', text: 'Keep lights, Wi-Fi, and essential appliances running smoothly with reliable battery backup.' },
    { icon: 'savings', title: 'Slash Your Bills', text: 'Drastically reduce or eliminate grid dependence. Generate free, clean electricity from the sun.' },
    { icon: 'trending_up', title: 'Increase Property Value', text: 'Solar installations are a smart investment, potentially boosting your home\'s market value.' },
    { icon: 'lock', title: 'Fixed Energy Costs', text: 'Protect your budget from unpredictable annual Eskom tariff hikes (averaging 12%+).' },
    { icon: 'eco', title: 'Go Green', text: 'Significantly reduce your carbon footprint and contribute to a sustainable South Africa.' },
    { icon: 'shield', title: 'Peace of Mind', text: 'Benefit from industry-leading warranties (10 years on FOX.ESS systems, 25 years on panels) and dedicated support.' },
];

// UPDATED Residential Process Data with specific image URLs
const residentialProcessData = [
    {
        id: 'res_proc1',
        yearTitle: 'Step 1',
        dataText: 'CONSULTATION',
        title: 'Free Consultation & Assessment',
        text: 'Our journey begins with a friendly chat. We listen to your energy needs, understand your consumption, and evaluate your property (remotely or on-site) for solar suitability.',
        imageUrl: consultationImage
    },
    {
        id: 'res_proc2',
        yearTitle: 'Step 2',
        dataText: 'DESIGN & QUOTE',
        title: 'Custom Solar Design & Transparent Quotation',
        text: 'We design a bespoke solar system using premium FOX.ESS components. You\'ll receive a clear, detailed quotation: system size, equipment, costs, projected savings, and financing options. No hidden fees.',
        imageUrl: designImage
    },
    {
        id: 'res_proc3',
        yearTitle: 'Step 3',
        dataText: 'INSTALLATION',
        title: 'Seamless, Professional Installation',
        text: 'Our certified technicians take over, handling permits and approvals. Installation is typically 1-3 days with minimal disruption, ensuring a safe, clean, and efficient setup and grid connection.',
        imageUrl: installationImage
    },
    {
        id: 'res_proc4',
        yearTitle: 'Step 4',
        dataText: 'ACTIVATION & SUPPORT',
        title: 'Activation, Monitoring & Ongoing Support',
        text: 'Start saving immediately! We provide intuitive system monitoring tools and offer dedicated after-sales support and maintenance plans for long-term peace of mind.',
        imageUrl: monitorImage
    },
];

// --- Child Components ---
// TODO: Refactor BenefitCard into its own file
const BenefitCard = ({ icon, title, text, delay }) => (
    <AnimatedPointComponent className="benefit-card" tag="div" delay={delay}>
        <div className="benefit-icon-wrapper"><span className="material-icons-outlined">{icon}</span></div>
        <h3>{title}</h3>
        <p>{text}</p>
    </AnimatedPointComponent>
);

// TODO: Refactor TimelineItem into its own file
const TimelineItem = ({ item, isActive, onInView }) => {
    const { ref, inView } = useInView({
        threshold: 0.5,
    });

    useEffect(() => {
        if (inView && onInView) {
            onInView();
        }
    }, [inView, onInView]);

    return (
        <div
            ref={ref}
            className={`timeline-item ${isActive ? 'timeline-item--active' : ''}`}
            data-text={item.dataText}
        >
            <div className="timeline__content">
                {item.imageUrl && <img className="timeline__img" src={item.imageUrl} alt={item.title || item.yearTitle} />}
                <h2 className="timeline__content-title">{item.yearTitle}</h2>
                <h3 className="timeline__content-subtitle">{item.title}</h3>
                <p className="timeline__content-desc">{item.text}</p>
            </div>
        </div>
    );
};

// --- Main Residential Component ---
const Residential = ({ paths = {} }) => {
  const [currentTimelineBg, setCurrentTimelineBg] = useState(
    residentialProcessData.length > 0 && residentialProcessData[0].imageUrl ? residentialProcessData[0].imageUrl : ''
  );
  const [activeTimelineItemId, setActiveTimelineItemId] = useState(
    residentialProcessData.length > 0 ? residentialProcessData[0].id : null
  );

  const handleTimelineItemInView = (itemId, itemImageUrl) => {
    setActiveTimelineItemId(itemId);
    if (itemImageUrl) {
        setCurrentTimelineBg(itemImageUrl);
    } else {
        // If you want a default background when an item without an image is active:
        // setCurrentTimelineBg('path/to/default-timeline-background.jpg');
        // Or clear it to use CSS fallback:
        setCurrentTimelineBg('');
    }
  };

  useEffect(() => {
    if (residentialProcessData.length > 0) {
      setActiveTimelineItemId(residentialProcessData[0].id);
      if (residentialProcessData[0].imageUrl) {
        setCurrentTimelineBg(residentialProcessData[0].imageUrl);
      } else {
        setCurrentTimelineBg(''); // Ensure it's cleared if first item has no image
      }
    }
  }, []);


  const pageTitle = "Residential Solar Panels Cape Town | SolPower Home Systems";
  const metaDescription = "Power your Cape Town home with SolPower's reliable solar panel systems. Beat load shedding, slash electricity bills & increase property value. Get your free quote!";
  const domain = "https://www.YOUR_DOMAIN.co.za"; // Replace YOUR_DOMAIN
  const canonicalUrl = domain + (paths?.residential || '/residential-solar-panels-cape-town');
  const webpageSchema = { "@context": "https://schema.org", "@type": "WebPage", "url": canonicalUrl, "name": pageTitle, "description": metaDescription, "publisher": { "@type": "Organization", "name": "SolPower", "logo": { "@type": "ImageObject", "url": `${domain}/logo.png` } } };
  const serviceSchema = { "@context": "https://schema.org", "@type": "Service", "serviceType": "Residential Solar Panel Installation", "provider": { "@type": "Organization", "name": "SolPower" }, "areaServed": { "@type": "City", "name": "Cape Town" }, "description": "Custom solar panel and battery backup solutions for homes in Cape Town and surrounding areas.", "name": "Home Solar Power Systems Cape Town" };

  return (
    <div className="page-wrapper residential-page"> {/* Added page-wrapper */}
      <Helmet>
        <title>{pageTitle}</title> <meta name="description" content={metaDescription} /> <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(webpageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>

      <section className="residential-intro-section">
        <div className="page-container-inner">
          <AnimatedHeadingComponent text="Power Your Home with SolPower" level="h1" className="residential-page-title" />
          <AnimatedPointComponent className="intro-lottie-animation-wrapper" delay={0.15} tag="div">
            <dotlottie-player
                src="https://lottie.host/1cebcc72-8251-4d22-b97b-415efb686564/tGHk41lb9C.lottie"
                background="transparent"
                speed="1"
                style={{ position: 'absolute', top: '50%', left: '50%', width: '300px', height: '300px', transform: 'translate(-50%, -50%)' }}
                loop
                autoplay
                aria-label="Animated visual for residential solar energy solutions"
            ></dotlottie-player>
          </AnimatedPointComponent>
          <AnimatedPointComponent className="residential-page-subtitle" tag="p" delay={0.3}>Stop renting electricity, start owning your power. Say goodbye to unpredictable bills and load shedding disruptions with reliable, affordable solar energy.</AnimatedPointComponent>
          <AnimatedPointComponent delay={0.45} className="intro-button-wrapper">
            <Link to={paths?.contact || "/contact"}><Button className="btn-solpower-primary">Get My Free Quote</Button></Link>
          </AnimatedPointComponent>
        </div>
      </section>

      <section className="residential-problem-section with-video-bg">
        <video autoPlay loop muted playsInline className="background-video"><source src={solarVideo} type="video/mp4" />Your browser does not support the video tag.</video>
        <div className="video-overlay"></div>
        <div className="page-container-inner">
          <AnimatedHeadingComponent text="Tired of Rising Costs & Power Cuts?" className="residential-section-heading" />
          <div className="problem-text-content-video">
            <AnimatedPointComponent tag="p" delay={0.2}>Unpredictable Eskom bills straining your budget? Load shedding interrupting family life and work? It's time for a reliable, cost-effective solution. SolPower offers tailor-made solar and backup power systems designed specifically for South African homes.</AnimatedPointComponent>
            <AnimatedPointComponent tag="p" delay={0.4}>Imagine slashing your monthly electricity costs by <strong>up to 90%</strong>, enjoying <strong>uninterrupted power</strong> during outages, and increasing your property value – all while contributing to a greener future. With SolPower and our premium FOX.ESS systems, this is not just possible, it's more affordable than you think.</AnimatedPointComponent>
          </div>
        </div>
      </section>

      <section className="residential-benefits-section">
        <div className="page-container-inner">
          <AnimatedHeadingComponent text="Why Homeowners Choose SolPower" className="residential-section-heading" />
          <div className="benefits-grid">{benefitsData.map((benefit, index) => (<BenefitCard key={benefit.title} icon={benefit.icon} title={benefit.title} text={benefit.text} delay={index * 0.1} />))}</div>
        </div>
      </section>

      <section className="residential-process-timeline-section">
          <div
            className="timeline-container"
            style={{ backgroundImage: currentTimelineBg ? `url(${currentTimelineBg})` : 'none' }}
          >
            <div className="timeline-header">
              <h2 className="timeline-header__title">Our Simple Path to Energy Independence</h2>
              <h3 className="timeline-header__subtitle">RESIDENTIAL SOLAR PROCESS</h3>
            </div>
            <div className="timeline">
              {residentialProcessData.map((item) => (
                <TimelineItem
                  key={item.id}
                  item={item}
                  isActive={activeTimelineItemId === item.id}
                  onInView={() => handleTimelineItemInView(item.id, item.imageUrl)}
                />
              ))}
            </div>
          </div>
      </section>

      {/* Use shared CTA */}
      <ContactSectionCTA
        title="Control Your Home's Energy"
        text="Get your free, no-obligation quote tailored to your home today!"
        buttonText="Get My Free Residential Quote"
        buttonLink={paths?.contact || "/contact"}
        className="cta-content-white" // Example: Keep white text style
      />
      {/* Footer rendered by App.js */}
    </div>
  );
};

export default Residential;