// src/Views/Homepage.js - REWRITTEN & FIXED
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import Header from './Header'; // Assuming Header is in the same directory (./) or adjust path
import Button from '../Components/Button';
import './Homepage.css';
// Swiper imports
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// Font Awesome for Swiper icons
import '@fortawesome/fontawesome-free/css/all.min.css';

// Component imports from src/Components/
import AnimatedPoint from '../Components/AnimatedPoint/AnimatedPoint';
import ProblemPointCard from '../Components/ProblemPointCard/ProblemPointCard';
import GuidePointCard from '../Components/GuidePointCard/GuidePointCard';
import AffiliationCard from '../Components/AffiliationCard/AffiliationCard';
// MODIFIED: Import the shared ContactSectionCTA
import ContactSectionCTA from '../Components/ContactSectionCTA.js';

// Lottie Icons from src/Components/LottieIcons/
import ProblemIcon1 from '../Components/LottieIcons/ProblemIcon1';
import ProblemIcon2 from '../Components/LottieIcons/ProblemIcon2';
import ProblemIcon3 from '../Components/LottieIcons/ProblemIcon3';
import GuideIcon1 from '../Components/LottieIcons/GuideIcon1';
import GuideIcon2 from '../Components/LottieIcons/GuideIcon2';
import GuideIcon3 from '../Components/LottieIcons/GuideIcon3';


// --- Animated Heading with Continuous Underline ---
// This component remains as it might be used elsewhere, but not by the shared CTA's title by default.
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

// MODIFIED: Removed local SunriseAnimation component definition
// const SunriseAnimation = ({ isAnimating }) => { ... };

// MODIFIED: Removed local ContactSectionCTA component definition
// const ContactSectionCTA = ({ ... }) => { ... };

// --- Affiliations Banner Component ---
const AffiliationsBanner = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const affiliationsData = [
    { id: 'foxess', name: 'Fox.ESS', description: 'Proudly associated with Fox ESS for high-voltage battery technology.', logo: '/fox.png', linkType: 'internal', link: '/contact', buttonText: 'Enquire Now', },
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
            <AffiliationCard key={partner.id} partner={partner} delay={index * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
};


// --- Homepage Component ---
const Homepage = ({ paths }) => {
  const navigate = useNavigate();

  const { ref: problemContentRef, inView: problemContentInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: guideContentRef, inView: guideContentInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: mergedSectionRef, inView: mergedSectionInView } = useInView({ threshold: 0.1, triggerOnce: false });

  const [flippedProblemCardIndex, setFlippedProblemCardIndex] = useState(-1);
  const problemCardData = useMemo(() => [
     { id: 1, icon: ProblemIcon1, title: "Hours Lost Every Day", frontText: "Missed deadlines, disrupted routines, lost productivity due to unreliable power.", backTitle: "Reclaim Your Time", backText: "SolPower's intelligent systems provide seamless backup power, keeping your life on track." },
     { id: 2, icon: ProblemIcon2, title: "Skyrocketing Electricity Costs", frontText: "Wasting thousands yearly on Eskom tariffs that only keep increasing.", backTitle: "Lock In Lower Rates", backText: "Stop burning money. Generate your own clean energy and significantly reduce your bills." },
     { id: 3, icon: ProblemIcon3, title: "Constant Worry & Uncertainty", frontText: "The stress of unpredictable outages affecting your security and peace of mind.", backTitle: "Gain Control & Peace of Mind", backText: "End the stress. Secure your energy future with reliable, independent solar power." }
  ], []);

  useEffect(() => {
    let intervalId = null;
    if (problemContentInView && problemCardData.length > 0) {
      intervalId = setInterval(() => {
        setFlippedProblemCardIndex(prevIndex => (prevIndex + 1) % problemCardData.length);
      }, 5000);
    } else {
       setFlippedProblemCardIndex(-1);
    }
    return () => { if (intervalId) clearInterval(intervalId); };
  }, [problemContentInView, problemCardData]);

  const testimonials = useMemo(() => [
    { id: 1, quote: "SolPower was fantastic from the first call to flipping the switch. Professional, efficient, and the savings are real. Load shedding is a thing of the past!", author: "Lisa R.", location: "Johannesburg", imgSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80", rating: 5 },
    { id: 2, quote: "Dealing with Eskom was a nightmare. Since installing SolPower, we have consistent power and our bill is down nearly 80%. Best decision we made.", author: "John B.", location: "Cape Town", imgSrc: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80", rating: 4 },
    { id: 3, quote: "The financing options made it possible for us. The team explained everything clearly, installation was quick, and the system works perfectly.", author: "Aisha K.", location: "Durban", imgSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80", rating: 5 },
    { id: 4, quote: "Running my home business during load shedding was impossible. SolPower's backup system has been a lifesaver. Worth every cent!", author: "Mike S.", location: "Pretoria", imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80", rating: 5 },
  ], []);

  const [flippedGuideCardIndex, setFlippedGuideCardIndex] = useState(-1);
  const guideCardData = useMemo(() => [
    { id: 'g1', icon: GuideIcon1, title: "World-Class Technology", frontText: "Benefit from top-tier, efficient solar & battery systems.", backTitle: "Reliable Power, Day & Night", backText: "Our FOX.ESS systems ensure you have electricity when you need it most." },
    { id: 'g2', icon: GuideIcon2, title: "Affordable Financing", frontText: "Access R0-down options and flexible payment plans.", backTitle: "Solar Savings Made Easy", backText: "Don't let upfront costs stop you. We make solar accessible to more homes." },
    { id: 'g3', icon: GuideIcon3, title: "Unbeatable Support", frontText: "Enjoy peace of mind with expert installation & ongoing service.", backTitle: "Your Long-Term Partner", backText: "Go solar with confidence. We're here for you every step of the way." }
  ], []);

  useEffect(() => {
    let intervalId = null;
    if (guideContentInView && guideCardData.length > 0) {
      intervalId = setInterval(() => {
        setFlippedGuideCardIndex(prevIndex => (prevIndex + 1) % guideCardData.length);
      }, 5000);
    } else {
      setFlippedGuideCardIndex(-1);
    }
    return () => { if (intervalId) clearInterval(intervalId); };
  }, [guideContentInView, guideCardData]);

  const [isTestimonialsModalOpen, setIsTestimonialsModalOpen] = useState(false);
  const modalContentRef = useRef(null);

  const closeTestimonialsModal = () => setIsTestimonialsModalOpen(false);

  const handleOverlayClick = (event) => {
    if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
      closeTestimonialsModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeTestimonialsModal();
      }
    };

    if (isTestimonialsModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isTestimonialsModalOpen]);


  return (
    <div className="homepage">
      <Header />

      <section className="problem-section bg-grey">
         <div ref={problemContentRef} className={`page-container-inner ${problemContentInView ? 'fade-in-up visible' : 'fade-in-up'}`}>
            <AnimatedHeading text="Feeling Powerless Against Eskom?" className="problem-heading-main" level="h2" />
            <p className="problem-subheading-main">Endless load shedding turning your life upside down? Skyrocketing bills draining your budget? The constant stress impacting your family and work? You’re not alone.</p>
            <div className="problem-points">
               {problemCardData.map((card, index) => (
                 <ProblemPointCard
                    key={card.id}
                    icon={card.icon}
                    title={card.title}
                    frontText={card.frontText}
                    backTitle={card.backTitle}
                    backText={card.backText}
                    isFlipped={index === flippedProblemCardIndex}
                    delay={index * 0.15}
                 />
               ))}
            </div>
        </div>
      </section>

      {/* MODIFIED: Using the imported shared ContactSectionCTA and passing specific props for homepage */}
      <ContactSectionCTA
        title="Ready to Start Saving with SolPower?"
        text="Get your free, no-obligation quote and discover how much you could save."
        buttonText="Get My Free Quote"
        buttonLink={paths?.contact || '/contact'}
        className="homepage-cta" // Optional: for any homepage-specific minor tweaks
      />

      <section id="take-action" ref={mergedSectionRef} className={`action-section bg-yellow-light ${mergedSectionInView ? 'zoom-active' : ''}`}>
        <div className={`page-container-inner ${mergedSectionInView ? 'fade-in-up visible' : 'fade-in-up'}`}>
            <AnimatedHeading text="Imagine: No More Eskom Bills. No More Load Shedding." className="success-heading-main" level="h2" />
            <p className="merged-section-intro">Join thousands of South Africans slashing electricity bills by up to 90% and enjoying uninterrupted power with solar solutions.</p>
            <div className="merged-section-pain-points">
                <p>Remember getting only 230 units for R1000? Soon it could be even less. Energy costs are projected to keep rising significantly. <strong>Take charge with SolPower.</strong> Secure predictable, lower energy costs and protect your family from endless increases and outages.</p>
            </div>
            <div className="testimonials-section-inline">
              <AnimatedHeading text="What Our Clients Say" level="h3" className="testimonials-inline-heading"/>
              {testimonials.length > 0 ? (
                <SwiperReact
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={30}
                  slidesPerView={1}
                  autoplay={{ delay: 7000, disableOnInteraction: false }}
                  loop={testimonials.length > 1}
                  navigation={{ nextEl: '.swiper-button-next-custom-inline', prevEl: '.swiper-button-prev-custom-inline' }}
                  pagination={{ clickable: true, dynamicBullets: true }}
                  className="mySwiperInline"
                >
                  {testimonials.map((testimonial) => (
                    <SwiperSlide key={testimonial.id}>
                      <div className="feedback-slider-item-transparent">
                        <div className="testimonial-content">
                          <img src={testimonial.imgSrc} alt={testimonial.author} className="testimonial-avatar" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/100x100/DDD5D6/333333?text=Client'; }} />
                          <div className="testimonial-text">
                            <div className="rating">
                              {[...Array(testimonial.rating)].map((_, i) => (<i key={`filled-${testimonial.id}-${i}`} className="fas fa-star" />))}
                              {[...Array(5 - testimonial.rating)].map((_, i) => (<i key={`empty-${testimonial.id}-${i}`} className="far fa-star" />))}
                            </div>
                            <blockquote>"{testimonial.quote}"</blockquote>
                            <cite><strong>{testimonial.author}</strong>{testimonial.location && <span>, {testimonial.location}</span>}</cite>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                  <div className="swiper-button-prev-custom-inline"><i className="fas fa-chevron-left"></i></div>
                  <div className="swiper-button-next-custom-inline"><i className="fas fa-chevron-right"></i></div>
                </SwiperReact>
              ) : ( <p className="no-testimonials-text">No testimonials available at the moment.</p> )}
            </div>
            <div className="action-button-wrapper merged-button-wrapper">
                 <Button className="btn-solpower-primary btn-large" onClick={() => navigate(paths?.contact || '/contact')}>
                     Compare Quotes & Start Saving
                 </Button>
            </div>
        </div>
      </section>

      <section className="guide-section bg-yellow-light">
          <div ref={guideContentRef} className={`page-container-inner ${guideContentInView ? 'fade-in-up visible' : 'fade-in-up'}`}>
            <AnimatedHeading text="SolPower: Your Guide to Energy Freedom" className="guide-heading-main" level="h2" />
            <p>We get it. We’re South Africans too. That’s why we offer more than just panels; we provide a reliable path to energy independence tailored for our unique challenges.</p>
            <div className="guide-points">
              {guideCardData.map((card, index) => (
                <GuidePointCard
                    key={card.id}
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
              <Link to={paths?.howItWorks || '/how-it-works'}>
                <Button className="btn-solpower-primary">Learn More About Our Process</Button>
              </Link>
            </div>
        </div>
      </section>

     <AffiliationsBanner />

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
                delay={index * 0.1}
              >
                <p className="testimonial-modal-quote">"{testimonial.quote}"</p>
                <footer className="testimonial-modal-author">- {testimonial.author || testimonial.name}{testimonial.location && `, ${testimonial.location}`}</footer>
              </AnimatedPoint>
            ))}
          </div>
        </div>
      </div>
    )}
    </div>
  );
};

export default Homepage;