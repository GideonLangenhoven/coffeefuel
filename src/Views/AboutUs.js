import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useInView } from 'react-intersection-observer';
import './AboutUs.css'; // Styles for this page
import Button from '../Components/Button';
// MODIFIED: Import the shared SunriseAnimation (though it's used internally by ContactSectionCTA)
// import SunriseAnimation from '../Components/SunriseAnimation.js';
// MODIFIED: Import the shared ContactSectionCTA component
import ContactSectionCTA from '../Components/ContactSectionCTA.js';

// Import founder images
import anvorElyPhoto from '../assets/images/anvor.png';
import franklinPietersePhoto from '../assets/images/franklin.png';

// --- Reusable Animation Components ---
const AnimatedPointComponent = React.forwardRef(
  ({ children, className, tag: Tag = 'div', delay = 0, threshold = 0.1, triggerOnce = false, style: customStyle = {} }, ref) => {
    const { ref: intersectionRef, inView } = useInView({ triggerOnce, threshold });
    const setRefsInternal = (node) => {
      intersectionRef(node);
      if (ref) {
        if (typeof ref === 'function') ref(node);
        else ref.current = node;
      }
    };
    const combinedClassName = `${className || ''} ${inView ? 'fade-in-up visible' : 'fade-in-up'}`;
    const finalStyle = { ...customStyle, transitionDelay: `${delay}s` };
    return <Tag ref={setRefsInternal} className={combinedClassName} style={finalStyle}>{children}</Tag>;
  }
);

const AnimatedHeadingComponent = ({ text, className = '', level = 'h1', id, threshold = 0.2, rootMargin = "0px 0px -50px 0px", triggerOnce = false }) => {
  const { ref, inView } = useInView({ triggerOnce, threshold, rootMargin });
  const Tag = level;
  const combinedClassName = `${className || ''} ${inView ? 'heading-visible' : ''}`;
  return <Tag ref={ref} className={combinedClassName} id={id}><span className="underline-span">{text}</span></Tag>;
};

// MODIFIED: Removed local SunriseAnimation definition
// MODIFIED: Removed local ContactSectionCTAComponent definition

// --- Data for "Why SolPower?" Section ---
const whySolPowerData = [
  { id: 'ws1', icon: 'tune', title: 'Customized Solutions', text: 'System design tailored to your unique energy needs and property specifics.' },
  { id: 'ws2', icon: 'savings', title: 'Simple Access to Funding', text: 'Flexible household & business financing options, including R0-outlay PPAs for commercial clients.' },
  { id: 'ws3', icon: 'verified_user', title: 'Best-in-Class Warranty', text: 'Comprehensive 10-25 Year warranties on core components, plus our workmanship guarantee.' },
  { id: 'ws4', icon: 'sync_alt', title: 'Seamless Integration', text: 'We handle all permits, ensure compliant installation, and manage grid connection smoothly.' },
];

// --- Team Member Card Component ---
const TeamProfileCard = ({ name, title, description, imageUrl, altText, delay }) => (
  <AnimatedPointComponent className="profile-container" tag="div" delay={delay}>
    <img src={imageUrl} alt={altText || name} className="profile-photo" />
    <div className="profile-details">
      <h3>{name}</h3>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  </AnimatedPointComponent>
);

// --- Why SolPower Point Card Component ---
const WhySolPowerCard = ({ icon, title, text, delay }) => (
  <AnimatedPointComponent className="about-us-benefit-card" tag="div" delay={delay}>
    <div className="about-us-benefit-icon-wrapper">
      <span className="material-icons-outlined">{icon}</span>
    </div>
    <h3>{title}</h3>
    <p>{text}</p>
  </AnimatedPointComponent>
);

const AboutUs = ({ paths = {} }) => {
  const pageTitle = "About SolPower | Your Trusted Solar Energy Partner in South Africa";
  const metaDescription = "Learn about SolPower's mission, our expert team, and why we are dedicated to providing top-tier solar solutions for homes and businesses across South Africa.";
  const domain = "https://www.YOUR_DOMAIN.co.za"; // Replace YOUR_DOMAIN
  const canonicalUrl = domain + (paths?.aboutUs || '/about-us');
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SolPower",
    "url": domain,
    "logo": `${domain}/logo.png`,
    "description": metaDescription,
    "contactPoint" : [{
      "@type" : "ContactPoint",
      "telephone" : "+27-XXX-XXX-XXXX", // Replace with actual phone number
      "contactType" : "customer service"
    }]
  };

  return (
    <div className="page-wrapper aboutus-page">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      </Helmet>

      <section className="aboutus-hero">
        <div className="page-container-inner">
          <AnimatedHeadingComponent text="About SolPower" level="h1" className="aboutus-hero-title" id="aboutus-main-heading"/>
          <AnimatedPointComponent className="aboutus-hero-subtitle" tag="p" delay={0.2}> Your Dedicated Partner for Sustainable Energy Success in South Africa </AnimatedPointComponent>
        </div>
      </section>

      <section id="our-commitment" className="aboutus-commitment-section" aria-labelledby="commitment-heading">
        <div className="page-container-inner">
          <AnimatedHeadingComponent text="Our Commitment to You" level="h2" className="aboutus-section-heading" id="commitment-heading"/>
          <AnimatedPointComponent tag="p" className="section-intro-p" delay={0.15}> At SolPower, our mission extends beyond simply installing solar panels. We are deeply committed to empowering our residential and commercial clients across South Africa with reliable, affordable, and sustainable energy solutions. Our dedicated team is here to support you at every stage of your journey. Together, we will design a solution tailored to your unique needs that is both cost-saving and environmentally responsible, aligning your goals with a greener, more prosperous future. </AnimatedPointComponent>
        </div>
      </section>

      <section id="the-team" className="aboutus-team-section" aria-labelledby="team-heading">
        <div className="page-container-inner">
          <AnimatedHeadingComponent text="Meet the Founders" level="h2" className="aboutus-section-heading" id="team-heading"/>
          <div className="profile-grid">
            <TeamProfileCard
              name="Anvor Ely"
              title="COO & Co-Founder"
              description="Bringing 25 years of hands-on engineering project experience to the business. Committed to customer service and engineering excellence, ensuring every SolPower installation meets the highest standards of quality and performance."
              imageUrl={anvorElyPhoto}
              altText="Anvor Ely, COO & Co-Founder of SolPower"
              delay={0.1}
            />
            <TeamProfileCard
              name="Franklin Pieterse"
              title="Director & Co-Founder"
              description="A business strategy advisor and coach with a background in Electrical Engineering, dedicated to sustainability and transformation. Bringing 30 years of leadership experience to drive impactful change and guide SolPower's vision."
              imageUrl={franklinPietersePhoto}
              altText="Franklin Pieterse, Director & Co-Founder of SolPower"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      <section id="why-solpower" className="aboutus-why-section" aria-labelledby="why-solpower-heading">
        <div className="page-container-inner">
          <AnimatedHeadingComponent text="Why Choose SolPower?" level="h2" className="aboutus-section-heading" id="why-solpower-heading"/>
          <div className="why-us-grid">
            {whySolPowerData.map((item, index) => (
              <WhySolPowerCard key={item.id} icon={item.icon} title={item.title} text={item.text} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* MODIFIED: Using the imported shared ContactSectionCTA component */}
      <ContactSectionCTA
        title="Ready to Invest in Your Energy Future?"
        text="Contact us today for a free, no-obligation consultation."
        buttonText="Get Your Free Consultation"
        buttonLink={paths?.contact || "/contact"}
        className="cta-content-white about-us-final-cta" // This class can be used for minor page-specific overrides if needed
      />
    </div>
  );
};

export default AboutUs;