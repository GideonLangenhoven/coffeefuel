import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import Header from './Header'; // Assuming Header is in the same Views directory
import Button from '../Components/Button';
import './Homepage.css'; // Import the CSS

// --- Icons ---
// Assuming dotlottie-player web component is globally available
const ProblemIcon1 = () => (
  <div className="lottie-icon-wrapper">
    <dotlottie-player
      src="https://lottie.host/70d9e09a-259e-4f5d-bd09-98e8bb7ad86e/ngRNK3nMQP.lottie"
      background="transparent"
      speed="1"
      style={{ width: '80px', height: '80px' }}
      loop
      autoplay
      aria-label="Problem Icon 1: Wasted Time"
    ></dotlottie-player>
  </div>
);
const ProblemIcon2 = () => (
  <div className="lottie-icon-wrapper">
    <dotlottie-player
      src="https://lottie.host/c0abca38-0946-4af4-8354-f711c9f9828c/m3QSFhYRUd.lottie"
      background="transparent"
      speed="1"
      style={{ width: '80px', height: '80px' }}
      loop
      autoplay
      aria-label="Problem Icon 2: High Costs"
    ></dotlottie-player>
  </div>
);
const ProblemIcon3 = () => (
  <div className="lottie-icon-wrapper">
    <dotlottie-player
      src="https://lottie.host/551679ca-a41e-47b8-8998-920d1022b0fe/RFFPXq3Oyv.lottie"
      background="transparent"
      speed="1"
      style={{ width: '80px', height: '80px' }}
      loop
      autoplay
      aria-label="Problem Icon 3: Uncertainty"
    ></dotlottie-player>
  </div>
);

const GuideIcon1 = () => (
  <div className="lottie-icon-wrapper">
    <dotlottie-player
      src="https://lottie.host/4cf4baa9-bc47-4db2-8464-ebc9c78d81cd/dxaA7NIm9z.lottie"
      background="transparent"
      speed="1"
      style={{ width: '80px', height: '80px' }}
      loop
      autoplay
      aria-label="Guide Icon 1: Technology"
    ></dotlottie-player>
  </div>
);
const GuideIcon2 = () => (
  <div className="lottie-icon-wrapper">
    <dotlottie-player
      src="https://lottie.host/27acd6e3-cf5d-476f-8a3d-12b7b566e76c/ezz8Du1nzi.lottie"
      background="transparent"
      speed="1"
      style={{ width: '80px', height: '80px' }}
      loop
      autoplay
      aria-label="Guide Icon 2: Financing"
    ></dotlottie-player>
  </div>
);
const GuideIcon3 = () => (
  <div className="lottie-icon-wrapper">
    <dotlottie-player
      src="https://lottie.host/d5597fa5-d241-46ab-99ad-e48a3f3c7236/pQoGeELbrD.lottie"
      background="transparent"
      speed="1"
      style={{ width: '80px', height: '80px' }}
      loop
      autoplay
      aria-label="Guide Icon 3: Support"
    ></dotlottie-player>
  </div>
);

// --- Reusable AnimatedPoint ---
const AnimatedPoint = ({ children, className, tag: Tag = 'div', delay = 0 }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const combinedClassName = `${className} ${inView ? 'fade-in-up visible' : 'fade-in-up'}`;
  const style = { transitionDelay: `${delay}s` };
  return <Tag ref={ref} className={combinedClassName} style={style}>{children}</Tag>;
};

// --- Animated Heading with Continuous Underline ---
const AnimatedHeading = ({ text, className = '', level = 'h2' }) => {
  const { ref, inView } = useInView({
    triggerOnce: false, // Allow re-trigger if scrolled out and back
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px" // Start animation a bit before it's fully in view
  });
  const combinedClassName = `${className} ${inView ? 'heading-visible' : ''}`;
  const Tag = level;
  return (
    <Tag ref={ref} className={combinedClassName}>
      <span className="underline-span">
        {text}
      </span>
    </Tag>
  );
};

// --- Sunrise Animation Component ---
const SunriseAnimation = ({ isAnimating }) => {
  const animationClass = isAnimating ? 'animate-sunrise' : '';
  return (
    <div className={`sunrise-animation-wrapper ${animationClass}`}>
       <div className="container">
        <div className="sky"></div>
        <div className="sea">
          <div className="light"></div>
        </div>
        <div className="sun"></div>
        <div className="bird1"></div>
        <div className="birdr1"></div>
        <div className="bird"></div>
        <div className="birdr"></div>
        <div className="fin">
          <div className="wave"></div>
        </div>
      </div>
    </div>
  );
};

// --- Contact Section CTA Definition ---
const ContactSectionCTA = ({
    title = "Ready to Start Saving with SolPower?",
    text = "Get your free, no-obligation quote and discover how much you could save.",
    buttonText = "Get My Free Quote",
    buttonLink = "/contact" // Added default link
}) => {
  const { ref, inView } = useInView({
    triggerOnce: false, // Allow re-trigger
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="contact-section-cta cta-content-white">
        <SunriseAnimation isAnimating={inView} />
        <div className="cta-text-content">
            <h2>{title}</h2>
            <p>{text}</p>
            <Link to={buttonLink}> {/* Use the prop for link */}
                <Button className="btn-solpower-primary">{buttonText}</Button>
            </Link>
        </div>
    </section>
  );
};

// --- Guide Point Card Component ---
const GuidePoint = ({ icon: Icon, title, frontText, backTitle, backText, isFlipped, delay }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`guide-point guide-point-flip ${inView ? 'fade-in-up visible' : 'fade-in-up'} ${isFlipped ? 'is-flipped' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <Icon />
          <div className="problem-card-text-content"> {/* Reusing class for structure */}
            <h3>{title}</h3>
            <p>{frontText}</p>
          </div>
        </div>
        <div className="flip-card-back">
          <h4>{backTitle}</h4>
          <p>{backText}</p>
        </div>
      </div>
    </div>
  );
};

// --- Affiliations Banner Component ---
const AffiliationsBanner = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const affiliationsData = [
    { id: 'trust-solar', name: 'Fox.ESS', description: 'Proudly associated with Fox ESS for high-voltage battery technology.', logo: '/fox.png', linkType: 'internal', link: '/contact', buttonText: 'Enquire Now', },
    { id: 'oobasolar', name: 'Oobasolar', description: 'Offering residential finance through partnership.', logo: '/ooba.png', linkType: 'external', link: 'https://oobasolar.co.za', buttonText: 'Apply For Finance', },
    { id: 'enfin', name: 'Enfin', description: 'Specialized energy finance partner.', logo: '/enfin.png', linkType: 'external', link: 'https://enfin-energy-finance.co.za/', buttonText: 'Visit Enfin', },
  ];

  return (
    <section ref={ref} className="affiliations-section bg-white">
       <div className={`page-container-inner ${inView ? 'fade-in-up visible' : 'fade-in-up'}`}>
        <AnimatedHeading text="Trusted Partners & Affiliations" className="affiliations-heading-main" level="h2" />
        <p className="affiliations-subheading">We collaborate with leading industry partners to provide you with the best technology and financing options available.</p>
        <div className="affiliations-grid">
          {affiliationsData.map((partner, index) => (
            <AnimatedPoint key={partner.id} className="affiliation-card" tag="div" delay={index * 0.15} >
              <div className="affiliation-logo-wrapper"><img src={partner.logo} alt={`${partner.name} Logo`} /></div>
              <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h3>{partner.name}</h3><p>{partner.description}</p>
              </div>
              <div className="affiliation-button-wrapper">
                  {partner.linkType === 'internal' ? (
                      <Link to={partner.link}><Button className="btn-solpower-primary">{partner.buttonText}</Button></Link>
                  ) : (
                      <a href={partner.link} target="_blank" rel="noopener noreferrer" className="button btn-solpower-primary">{partner.buttonText}</a>
                  )}
              </div>
            </AnimatedPoint>
          ))}
        </div>
      </div>
    </section>
  );
};


// --- Homepage Component ---
const Homepage = ({ paths }) => { // Accept paths as a prop
  const navigate = useNavigate();

  // --- Intersection Observers ---
  const { ref: problemContentRef, inView: problemContentInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: successContentRef, inView: successContentInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: actionSectionRef, inView: actionSectionInView } = useInView({ threshold: 0.1, triggerOnce: false }); // Retrigger for zoom
  const { ref: guideContentRef, inView: guideContentInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  // --- State for Problem Card Flipping ---
  const [flippedCardIndex, setFlippedCardIndex] = useState(-1);
  const problemCardData = [
     { id: 1, icon: ProblemIcon1, title: "Hours Lost Every Day", frontText: "Missed deadlines, disrupted routines, lost productivity due to unreliable power.", backTitle: "Reclaim Your Time", backText: "SolPower's intelligent systems provide seamless backup power, keeping your life on track." },
     { id: 2, icon: ProblemIcon2, title: "Skyrocketing Electricity Costs", frontText: "Wasting thousands yearly on Eskom tariffs that only keep increasing.", backTitle: "Lock In Lower Rates", backText: "Stop burning money. Generate your own clean energy and significantly reduce your bills." },
     { id: 3, icon: ProblemIcon3, title: "Constant Worry & Uncertainty", frontText: "The stress of unpredictable outages affecting your security and peace of mind.", backTitle: "Gain Control & Peace of Mind", backText: "End the stress. Secure your energy future with reliable, independent solar power." }
  ];
  useEffect(() => {
    let intervalId = null;
    if (problemContentInView) {
      intervalId = setInterval(() => {
        setFlippedCardIndex(prevIndex => (prevIndex + 1) % problemCardData.length);
      }, 5000); // Flip every 5 seconds
    } else {
       setFlippedCardIndex(-1); // Reset if section is not in view
    }
    return () => { if (intervalId) clearInterval(intervalId); };
  }, [problemContentInView, problemCardData.length]);

  // --- Testimonial Data (used for carousel and new modal) ---
  const testimonials = [
    { id: 1, quote: "SolPower was fantastic from the first call to flipping the switch. Professional, efficient, and the savings are real. Load shedding is a thing of the past!", author: "Happy Homeowner", location: "Johannesburg" },
    { id: 2, quote: "Dealing with Eskom was a nightmare. Since installing SolPower, we have consistent power and our bill is down nearly 80%. Best decision we made.", author: "Relieved Family", location: "Cape Town" },
    { id: 3, quote: "The financing options made it possible for us. The team explained everything clearly, installation was quick, and the system works perfectly.", author: "Smart Saver", location: "Durban" },
    { id: 4, quote: "Running my home business during load shedding was impossible. SolPower's backup system has been a lifesaver. Worth every cent!", author: "Small Business Owner", location: "Pretoria" },
    { id: 5, name: 'Sarah M., Homeowner', quote: 'SolPower made going solar so easy! Professional installation, significant bill savings, and no more load shedding stress. Highly recommend!', location: "Cape Town" },
    { id: 6, name: 'David K., Business Owner', quote: 'The battery backup system has been crucial for our operations during outages. Reliable power and fantastic service from the SolPower team.', location: "Johannesburg" },
  ];

  // --- Testimonial Carousel State & Logic ---
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const carouselIntervalRef = useRef(null);

  const startCarouselInterval = useCallback(() => {
    if (carouselIntervalRef.current) clearInterval(carouselIntervalRef.current);
    carouselIntervalRef.current = setInterval(() => {
      setCurrentTestimonialIndex(prevIndex => (prevIndex + 1) % testimonials.length);
    }, 7000); // Change slide every 7 seconds
  }, [testimonials.length]);

  const resetCarouselInterval = useCallback(() => {
    if (!isCarouselPaused) {
        if (carouselIntervalRef.current) clearInterval(carouselIntervalRef.current);
        startCarouselInterval();
    }
  }, [isCarouselPaused, startCarouselInterval]);

  const handleNextTestimonial = useCallback(() => {
    setCurrentTestimonialIndex(prevIndex => (prevIndex + 1) % testimonials.length);
    resetCarouselInterval();
  }, [testimonials.length, resetCarouselInterval]);

  const handlePrevTestimonial = useCallback(() => {
    setCurrentTestimonialIndex(prevIndex => (prevIndex - 1 + testimonials.length) % testimonials.length);
    resetCarouselInterval();
  }, [testimonials.length, resetCarouselInterval]);

  useEffect(() => {
    if (!isCarouselPaused) {
      startCarouselInterval();
    } else {
      if (carouselIntervalRef.current) clearInterval(carouselIntervalRef.current);
    }
    return () => {
      if (carouselIntervalRef.current) clearInterval(carouselIntervalRef.current);
    };
  }, [isCarouselPaused, startCarouselInterval]);

  // --- NEW: State and Functions for Testimonials Modal ---
  const [isTestimonialsModalOpen, setIsTestimonialsModalOpen] = useState(false);
  const modalContentRef = useRef(null);

  const openTestimonialsModal = (e) => {
    e.preventDefault(); // Prevent default if it's a link
    setIsTestimonialsModalOpen(true);
  };
  const closeTestimonialsModal = () => setIsTestimonialsModalOpen(false);

  // Close modal on Escape key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        closeTestimonialsModal();
      }
    };
    if (isTestimonialsModalOpen) {
      document.body.style.overflow = 'hidden'; // Prevent background scroll
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isTestimonialsModalOpen]);

  // Close modal when clicking outside of modal content
  const handleOverlayClick = (e) => {
    if (modalContentRef.current && !modalContentRef.current.contains(e.target)) {
      closeTestimonialsModal();
    }
  };

  // --- Guide Cards State & Data ---
  const [flippedGuideCardIndex, setFlippedGuideCardIndex] = useState(-1);
  const guideCardData = [
    { icon: GuideIcon1, title: "World-Class Technology", frontText: "Benefit from top-tier, efficient solar & battery systems.", backTitle: "Reliable Power, Day & Night", backText: "Our FOX.ESS systems ensure you have electricity when you need it most." },
    { icon: GuideIcon2, title: "Affordable Financing", frontText: "Access R0-down options and flexible payment plans.", backTitle: "Solar Savings Made Easy", backText: "Don't let upfront costs stop you. We make solar accessible to more homes." },
    { icon: GuideIcon3, title: "Unbeatable Support", frontText: "Enjoy peace of mind with expert installation & ongoing service.", backTitle: "Your Long-Term Partner", backText: "Go solar with confidence. We're here for you every step of the way." }
  ];
  useEffect(() => {
    let intervalId = null;
    if (guideContentInView) {
      intervalId = setInterval(() => {
        setFlippedGuideCardIndex(prevIndex => (prevIndex + 1) % guideCardData.length);
      }, 5000);
    } else {
      setFlippedGuideCardIndex(-1);
    }
    return () => { if (intervalId) clearInterval(intervalId); };
  }, [guideContentInView, guideCardData.length]);

  return (
    <div className="homepage">
      <Header />

      {/* 1. Problem Section */}
      <section className="problem-section bg-grey">
         <div ref={problemContentRef} className={`page-container-inner ${problemContentInView ? 'fade-in-up visible' : 'fade-in-up'}`}>
            <AnimatedHeading text="Feeling Powerless Against Eskom?" className="problem-heading-main" level="h2" />
            <p className="problem-subheading-main">Endless load shedding turning your life upside down? Skyrocketing bills draining your budget? The constant stress impacting your family and work? You’re not alone.</p>
            <div className="problem-points">
               {problemCardData.map((card, index) => (
                 <div key={card.id} className={`problem-point problem-point-flip ${index === flippedCardIndex ? 'is-flipped' : ''}`} >
                    <div className="problem-flip-card-inner">
                        <div className="problem-flip-card-front">
                            <card.icon />
                            <div className="problem-card-text-content"><h3>{card.title}</h3><p>{card.frontText}</p></div>
                        </div>
                        <div className="problem-flip-card-back"><h4>{card.backTitle}</h4><p>{card.backText}</p></div>
                    </div>
                 </div>
               ))}
            </div>
        </div>
      </section>

      {/* 2. ContactSectionCTA */}
      <ContactSectionCTA buttonLink={paths?.contact} /> {/* Use paths prop */}

      {/* 3. Success Section */}
      <section className="success-home bg-grey">
           <div ref={successContentRef} className={`page-container-inner ${successContentInView ? 'fade-in-up visible' : 'fade-in-up'}`}>
            <AnimatedHeading text="Imagine: No More Eskom Bills. No More Load Shedding." className="success-heading-main" level="h2"/>
            <p>Join thousands of South Africans who’ve slashed their electricity bills by up to 90% and now enjoy uninterrupted power, thanks to solar solutions.</p>
            <div className="testimonial-carousel" onMouseEnter={() => setIsCarouselPaused(true)} onMouseLeave={() => setIsCarouselPaused(false)} >
               <div className="testimonial-track" style={{ transform: `translateX(-${currentTestimonialIndex * 100}%)` }}>
                {testimonials.map((testimonial) => (
                  <div className="testimonial-card" key={testimonial.id}>
                    <p className="testimonial-quote">"{testimonial.quote}"</p>
                    <footer className="testimonial-author">- {testimonial.author || testimonial.name}, {testimonial.location}</footer>
                  </div>
                ))}
              </div>
              <button className="carousel-button prev material-icons-outlined" onClick={handlePrevTestimonial} aria-label="Previous Testimonial">arrow_back_ios</button>
              <button className="carousel-button next material-icons-outlined" onClick={handleNextTestimonial} aria-label="Next Testimonial">arrow_forward_ios</button>
            </div>
             <div className="success-button-wrapper">
                 {/* MODIFIED BUTTON BEHAVIOR */}
                 <Button className="btn-solpower-primary" onClick={openTestimonialsModal}>
                     Read More Success Stories
                 </Button>
             </div>
          </div>
       </section>

      {/* 4. Take Action Section */}
      <section id="take-action" ref={actionSectionRef} className={`action-section bg-yellow-light ${actionSectionInView ? 'zoom-active' : ''}`} >
         <div className={`page-container-inner ${actionSectionInView ? 'fade-in-up visible' : 'fade-in-up'}`}>
            <AnimatedHeading text="Take Action Now! Don’t Wait for the Next Price Hike." className="action-heading-main" level="h2" />
            <p>Remember getting only 230 units for R1000? Soon it could be even less. Energy costs are projected to keep rising significantly.</p>
            <p><strong>Take charge with SolPower.</strong> Secure predictable, lower energy costs and protect your family from endless increases and outages.</p>
            <blockquote className="quote-highlight">"Eskom’s aggregate standard tariffs for municipalities are set to increase substantially in the coming years..." <cite>– Energy Sector Report Snippet</cite></blockquote>
            <p>Regain control over your power and your budget. Contact us today for a free, personalized assessment.</p>
            <div className="action-button-wrapper">
                 {/* MODIFIED BUTTON BEHAVIOR */}
                 <Button className="btn-solpower-primary" onClick={() => navigate(paths?.contact || '/contact')}>
                     Compare Quotes & Start Saving
                 </Button>
            </div>
        </div>
      </section>

      {/* 5. Guide/Value Prop Section */}
      <section className="guide-section bg-yellow-light">
          <div ref={guideContentRef} className={`page-container-inner ${guideContentInView ? 'fade-in-up visible' : 'fade-in-up'}`}>
            <AnimatedHeading text="SolPower: Your Guide to Energy Freedom" className="guide-heading-main" level="h2" />
            <p>We get it. We’re South Africans too. That’s why we offer more than just panels; we provide a reliable path to energy independence tailored for our unique challenges.</p>
            <div className="guide-points">
              {guideCardData.map((card, index) => (
                <GuidePoint key={index} icon={card.icon} title={card.title} frontText={card.frontText} backTitle={card.backTitle} backText={card.backText} isFlipped={index === flippedGuideCardIndex} delay={index * 0.15} />
              ))}
            </div>
            <div className="guide-button-wrapper">
              {/* MODIFIED BUTTON BEHAVIOR */}
              <Link to={paths?.howItWorks || '/how-it-works'}>
                <Button className="btn-solpower-primary">Learn More About Our Process</Button>
              </Link>
            </div>
        </div>
      </section>

      {/* 6. Affiliations Banner Section */}
      <AffiliationsBanner />

      {/* NEW: Testimonials Modal */}
      {isTestimonialsModalOpen && (
        <div className="testimonials-modal-overlay" onClick={handleOverlayClick} role="dialog" aria-modal="true" aria-labelledby="testimonials-modal-title">
          <div className="testimonials-modal-content" ref={modalContentRef}>
            <button className="modal-close-button" onClick={closeTestimonialsModal} aria-label="Close testimonials modal">
              <span className="material-icons-outlined">close</span>
            </button>
            <h2 id="testimonials-modal-title" className="modal-title">Client Success Stories</h2>
            <div className="testimonials-modal-list">
              {testimonials.map((testimonial, index) => (
                <AnimatedPoint
                  key={testimonial.id}
                  className="testimonial-modal-item"
                  tag="div"
                  delay={index * 0.1} // Stagger animation
                >
                  <p className="testimonial-modal-quote">"{testimonial.quote}"</p>
                  <footer className="testimonial-modal-author">- {testimonial.author || testimonial.name}, {testimonial.location}</footer>
                </AnimatedPoint>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer component would be rendered by App.js */}
    </div>
  );
};
export default Homepage;