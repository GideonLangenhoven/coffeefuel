import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Ensure you have run: npm install react-intersection-observer
import { useInView } from 'react-intersection-observer';
import Header from './Header'; // **** Re-added Header import ****
import Button from '../Components/Button'; // Assuming Button component exists
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
    ></dotlottie-player>
  </div>
);

// --- Guide Icons ---
const GuideIcon1 = () => (
  <div className="lottie-icon-wrapper">
    <dotlottie-player
      src="https://lottie.host/70d9e09a-259e-4f5d-bd09-98e8bb7ad86e/ngRNK3nMQP.lottie"
      background="transparent"
      speed="1"
      style={{ width: '80px', height: '80px' }}
      loop
      autoplay
    ></dotlottie-player>
  </div>
);
const GuideIcon2 = () => (
  <div className="lottie-icon-wrapper">
    <dotlottie-player
      src="https://lottie.host/d5023c9d-afaf-48c8-a796-faaf1c8acb65/s7v5WkXMmE.lottie"
      background="transparent"
      speed="1"
      style={{ width: '80px', height: '80px' }} // Keeping standard icon size
      loop
      autoplay
    ></dotlottie-player>
  </div>
);
const GuideIcon3 = () => (
  <div className="lottie-icon-wrapper">
    <dotlottie-player
      src="https://lottie.host/551679ca-a41e-47b8-8998-920d1022b0fe/RFFPXq3Oyv.lottie"
      background="transparent"
      speed="1"
      style={{ width: '80px', height: '80px' }}
      loop
      autoplay
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
    triggerOnce: false,
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
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
    buttonText = "Get My Free Quote"
}) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="contact-section-cta cta-content-white">
        <SunriseAnimation isAnimating={inView} />
        <div className="cta-text-content">
            <h2>{title}</h2>
            <p>{text}</p>
            <Link to="/contact">
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
          <div className="problem-card-text-content"> {/* Reusing class */}
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
    {
      id: 'trust-solar',
      name: 'Fox.ESS',
      description: 'Proudly associated with Fox ESS for high-voltage battery technology.',
      logo: 'fox.png', // Assumes logo is in public folder or handled by build process
      linkType: 'internal', // This was internal in the original
      link: '/contact', // This was '/contact' in the original
      buttonText: 'Enquire Now',
    },
    {
      id: 'oobasolar',
      name: 'Oobasolar',
      description: 'Offering residential finance through partnership.',
      logo: 'ooba.png',
      linkType: 'external',
      link: 'https://oobasolar.co.za',
      buttonText: 'Apply For Finance',
    },
    {
      id: 'enfin',
      name: 'Enfin',
      description: 'Specialized energy finance partner.',
      logo: 'enfin.png',
      linkType: 'external',
      link: 'https://enfin-energy-finance.co.za/', // Check URL is correct
      buttonText: 'Visit Enfin',
    },
  ];

  return (
    <section ref={ref} className="affiliations-section bg-white">
       <div className={`page-container-inner ${inView ? 'fade-in-up visible' : 'fade-in-up'}`}>
        <AnimatedHeading
          text="Trusted Partners & Affiliations"
          className="affiliations-heading-main"
          level="h2"
        />
        <p className="affiliations-subheading">
          We collaborate with leading industry partners to provide you with the best technology and financing options available.
        </p>
        <div className="affiliations-grid">
          {affiliationsData.map((partner, index) => (
            <AnimatedPoint
              key={partner.id}
              className="affiliation-card"
              tag="div"
              delay={index * 0.15}
            >
              <div className="affiliation-logo-wrapper">
                  <img src={partner.logo} alt={`${partner.name} Logo`} />
              </div>
              <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h3>{partner.name}</h3>
                  <p>{partner.description}</p>
              </div>
              <div className="affiliation-button-wrapper">
                  {partner.linkType === 'internal' ? (
                      <Link to={partner.link}>
                          <Button className="btn-solpower-primary">{partner.buttonText}</Button>
                      </Link>
                  ) : (
                      <a
                          href={partner.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="button btn-solpower-primary" // Apply both classes for styling
                      >
                          {partner.buttonText}
                      </a>
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
const Homepage = () => {
  const navigate = useNavigate();

  // --- Intersection Observers ---
  const { ref: problemContentRef, inView: problemContentInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: successContentRef, inView: successContentInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: actionSectionRef, inView: actionSectionInView } = useInView({ threshold: 0.1, triggerOnce: false });
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
      }, 5000);
    } else {
       setFlippedCardIndex(-1);
    }
    return () => { if (intervalId) clearInterval(intervalId); };
  }, [problemContentInView, problemCardData.length]);

  // --- Testimonial Carousel State & Data ---
  const testimonials = [
    { id: 1, quote: "SolPower was fantastic from the first call to flipping the switch. Professional, efficient, and the savings are real. Load shedding is a thing of the past!", author: "Happy Homeowner", location: "Johannesburg" },
    { id: 2, quote: "Dealing with Eskom was a nightmare. Since installing SolPower, we have consistent power and our bill is down nearly 80%. Best decision we made.", author: "Relieved Family", location: "Cape Town" },
    { id: 3, quote: "The financing options made it possible for us. The team explained everything clearly, installation was quick, and the system works perfectly.", author: "Smart Saver", location: "Durban" },
    { id: 4, quote: "Running my home business during load shedding was impossible. SolPower's backup system has been a lifesaver. Worth every cent!", author: "Small Business Owner", location: "Pretoria" }
  ];
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  const handleNextTestimonial = () => {
    setCurrentTestimonialIndex(prevIndex => (prevIndex + 1) % testimonials.length);
    resetInterval();
  };
  const handlePrevTestimonial = () => {
    setCurrentTestimonialIndex(prevIndex => (prevIndex - 1 + testimonials.length) % testimonials.length);
    resetInterval();
  };

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentTestimonialIndex(prevIndex => (prevIndex + 1) % testimonials.length);
    }, 7000);
  };

  const resetInterval = () => {
    if (!isPaused) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        startInterval();
    }
  };

  useEffect(() => {
    if (!isPaused) {
      startInterval();
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, testimonials.length]);


  // --- Guide Cards State & Data ---
  const [flippedGuideCardIndex, setFlippedGuideCardIndex] = useState(-1);
  const guideCardData = [
    {
      icon: GuideIcon1,
      title: "World-Class Technology",
      frontText: "Benefit from top-tier, efficient solar & battery systems.",
      backTitle: "Reliable Power, Day & Night",
      backText: "Our FOX.ESS systems ensure you have electricity when you need it most."
    },
    {
      icon: GuideIcon2,
      title: "Affordable Financing",
      frontText: "Access R0-down options and flexible payment plans.",
      backTitle: "Solar Savings Made Easy",
      backText: "Don't let upfront costs stop you. We make solar accessible to more homes."
    },
    {
      icon: GuideIcon3,
      title: "Unbeatable Support",
      frontText: "Enjoy peace of mind with expert installation & ongoing service.",
      backTitle: "Your Long-Term Partner",
      backText: "Go solar with confidence. We're here for you every step of the way."
    }
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
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [guideContentInView, guideCardData.length]);


  // --- Render Homepage ---
  return (
    <div className="homepage">
      {/* **** Header Component Included **** */}
      <Header />

      {/* 1. Problem Section */}
      <section className="problem-section bg-grey">
         <div ref={problemContentRef} className={`page-container-inner ${problemContentInView ? 'fade-in-up visible' : 'fade-in-up'}`}>
            <AnimatedHeading
              text="Feeling Powerless Against Eskom?"
              className="problem-heading-main"
              level="h2"
            />
            <p className="problem-subheading-main">Endless load shedding turning your life upside down? Skyrocketing bills draining your budget? The constant stress impacting your family and work? You're not alone.</p>
            <div className="problem-points">
               {problemCardData.map((card, index) => (
                 <div
                    key={card.id}
                    className={`problem-point problem-point-flip ${index === flippedCardIndex ? 'is-flipped' : ''}`}
                 >
                    <div className="problem-flip-card-inner">
                        <div className="problem-flip-card-front">
                            <card.icon />
                            <div className="problem-card-text-content">
                                <h3>{card.title}</h3>
                                <p>{card.frontText}</p>
                            </div>
                        </div>
                        <div className="problem-flip-card-back">
                            <h4>{card.backTitle}</h4>
                            <p>{card.backText}</p>
                        </div>
                    </div>
                 </div>
               ))}
            </div>
        </div>
      </section>

      {/* 2. ContactSectionCTA */}
      <ContactSectionCTA />

      {/* 3. Success Section */}
      <section className="success-home bg-grey">
           <div ref={successContentRef} className={`page-container-inner ${successContentInView ? 'fade-in-up visible' : 'fade-in-up'}`}>
            <AnimatedHeading
                text="Imagine: No More Eskom Bills. No More Load Shedding."
                className="success-heading-main"
                level="h2"
            />
            <p>Join thousands of South Africans who've slashed their electricity bills by up to 90% and now enjoy uninterrupted power, thanks to solar solutions.</p>
            <div
              className="testimonial-carousel"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
               <div className="testimonial-track" style={{ transform: `translateX(-${currentTestimonialIndex * 100}%)` }}>
                {testimonials.map((testimonial) => (
                  <div className="testimonial-card" key={testimonial.id}>
                    <p className="testimonial-quote">"{testimonial.quote}"</p>
                    <footer className="testimonial-author">- {testimonial.author}, {testimonial.location}</footer>
                  </div>
                ))}
              </div>
              <button className="carousel-button prev material-icons-outlined" onClick={handlePrevTestimonial} aria-label="Previous Testimonial">arrow_back_ios</button>
              <button className="carousel-button next material-icons-outlined" onClick={handleNextTestimonial} aria-label="Next Testimonial">arrow_forward_ios</button>
            </div>
             <div className="success-button-wrapper">
                 <Link to="/testimonials">
                     <Button className="btn-solpower-primary">Read More Success Stories</Button>
                 </Link>
             </div>
          </div>
       </section>

      {/* 4. Take Action Section */}
      <section
        id="take-action"
        ref={actionSectionRef}
        className={`action-section bg-yellow-light ${actionSectionInView ? 'zoom-active' : ''}`}
      >
         <div className={`page-container-inner ${actionSectionInView ? 'fade-in-up visible' : 'fade-in-up'}`}>
            <AnimatedHeading
              text="Take Action Now! Don't Wait for the Next Price Hike."
              className="action-heading-main"
              level="h2"
            />
            <p> Remember getting only 230 units for R1000? Soon it could be even less. Energy costs are projected to keep rising significantly.</p>
            <p> <strong>Take charge with SolPower.</strong> Secure predictable, lower energy costs and protect your family from endless increases and outages.</p>
            <blockquote className="quote-highlight"> "Eskom's aggregate standard tariffs for municipalities are set to increase substantially in the coming years..." <cite>– Energy Sector Report Snippet</cite> </blockquote>
            <p> Regain control over your power and your budget. Contact us today for a free, personalized assessment.</p>
            <div className="action-button-wrapper">
                 <Button className="btn-solpower-primary" onClick={() => navigate('/contact')}>
                     Compare Quotes & Start Saving
                 </Button>
            </div>
        </div>
      </section>

      {/* 5. Guide/Value Prop Section */}
      <section className="guide-section bg-yellow-light">
          <div ref={guideContentRef} className={`page-container-inner ${guideContentInView ? 'fade-in-up visible' : 'fade-in-up'}`}>
            <AnimatedHeading
                text="SolPower: Your Guide to Energy Freedom"
                className="guide-heading-main"
                level="h2"
            />
            <p>We get it. We're South Africans too. That's why we offer more than just panels; we provide a reliable path to energy independence tailored for our unique challenges.</p>
            <div className="guide-points">
              {guideCardData.map((card, index) => (
                <GuidePoint
                  // Using index as key isn't ideal if list order changes, but okay if static
                  key={index}
                  icon={card.icon}
                  title={card.title}
                  frontText={card.frontText}
                  backTitle={card.backTitle}
                  backText={card.backText}
                  isFlipped={index === flippedGuideCardIndex}
                  delay={index * 0.15}
                />
              ))}
            </div>
            <div className="guide-button-wrapper">
              <Link to="/how-it-works">
                <Button className="btn-solpower-primary">Learn More About Our Process</Button>
              </Link>
            </div>
        </div>
      </section>

      {/* 6. Affiliations Banner Section */}
      <AffiliationsBanner />

      {/* Footer component reference if it exists */}
      {/* <Footer /> */}

    </div> // End homepage div
  );
};
export default Homepage;