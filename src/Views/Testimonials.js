// --- File: src/Views/Testimonials.js ---
import React, { useState, useEffect, useRef, useCallback } from 'react';
// Removed Link as it wasn't used directly here
import './PageStyles.css'; // Shared styles - MAKE SURE THIS FILE EXISTS
import './Testimonials.css'; // Specific styles for this component
import ContactSectionCTA from '../Components/ContactSectionCTA.js'; // Import shared CTA

// Your testimonials data (unchanged)
const testimonialsData = [
  { id: 't1', name: 'Sarah M., Homeowner, Cape Town', quote: 'SolPower made going solar so easy! Professional installation, significant bill savings, and no more load shedding stress. Highly recommend!' },
  { id: 't2', name: 'David K., Business Owner, JHB', quote: 'The battery backup system has been crucial for our operations during outages. Reliable power and fantastic service from the SolPower team.' },
  { id: 't3', name: 'The Naidoo Family, Durban', quote: 'We were hesitant at first, but SolPower explained everything clearly. Our system works perfectly, and we love the lower bills!' },
  { id: 't4', name: 'Farm Manager, Western Cape', quote: 'Reliable power for irrigation is essential. SolPower delivered a robust solution that meets our demands. Great investment.' },
  { id: 't5', name: 'Guesthouse Owner, Garden Route', quote: 'Load shedding was hurting business. Now, thanks to SolPower\'s backup system, our guests always have power. It\'s made a huge difference.' },
  { id: 't6', name: 'Retiree, Somerset West', quote: 'Finally, predictable electricity costs in retirement. The financing option made it affordable, and the team was wonderful to work with.' },
  { id: 't7', name: 'Thabo L., Pretoria Resident', quote: 'The SolPower app makes it simple to track my savings in real-time. It feels great knowing exactly how much sun is translating to money saved.' },
  { id: 't8', name: 'Manufacturing Plant, PE', quote: 'Switching to the PPA option with SolPower and Enfin removed the upfront cost barrier. Our energy rate is fixed and lower than Eskom. Smart business move.' },
];

const SLIDE_INTERVAL = 5500; // Time each testimonial is shown

const Testimonials = ({ paths }) => { // Added paths prop
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false); // State to manage fade effect
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null); // Ref for fade timeout

  // Go to the next slide with fade effect
  const nextSlide = useCallback(() => {
    setIsFading(true); // Start fade out
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
      );
      setIsFading(false); // Start fade in
    }, 300); // Match fade duration in CSS
  }, []);

  // Go to the previous slide with fade effect
  const prevSlide = useCallback(() => {
    setIsFading(true); // Start fade out
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
      );
      setIsFading(false); // Start fade in
    }, 300); // Match fade duration in CSS
  }, []);

  // Go to a specific slide with fade effect
  const goToSlide = useCallback((index) => {
    if (index === currentIndex) return; // Do nothing if already on the slide
    setIsFading(true); // Start fade out
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex(index);
      setIsFading(false); // Start fade in
    }, 300); // Match fade duration in CSS
  }, [currentIndex]);


  // Start auto-scroll
  const startAutoScroll = useCallback(() => {
    pauseAutoScroll(); // Clear existing interval first
    intervalRef.current = setInterval(nextSlide, SLIDE_INTERVAL);
  }, [nextSlide]);

  // Pause auto-scroll
  const pauseAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // Clear fade timeout if interaction occurs
       // If we pause mid-fade-out, immediately show the target slide
       // This prevents getting stuck in a faded-out state
       // It might cause a slight visual jump if paused exactly mid-transition,
       // but it's better than being stuck. We'll also reset isFading.
       // Note: Directly setting currentIndex here might interfere with goToSlide/prev/next
       // if called immediately after. Resetting isFading is safer.
      setIsFading(false);
    }
  };

  // Start on mount, clear on unmount
  useEffect(() => {
    startAutoScroll();
    return () => {
        pauseAutoScroll(); // Clear interval
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current); // Clear timeout on unmount
        }
    }
  }, [startAutoScroll]); // Rerun effect if startAutoScroll changes (it shouldn't often)

  // Get the current testimonial data
  const currentTestimonial = testimonialsData[currentIndex];

  return (
    // Added overflow-hidden to page-wrapper if needed, or manage within container
    <div className="page-wrapper testimonials-page bg-white">
      <div className="page-container">
        <h1 className="page-title">Real Clients, Real Savings, Real Power</h1>
        <p className="page-subtitle" style={{ textAlign: 'center', maxWidth: '700px', margin: '-2rem auto 3rem', color: 'var(--solpower-text-medium)' }}>
            Hear directly from homeowners and businesses across South Africa who chose SolPower.
        </p>

        {/* Testimonial Display Area */}
        <div
          className="testimonial-display-container"
          onMouseEnter={pauseAutoScroll}
          onMouseLeave={startAutoScroll}
          aria-live="polite" // Announce changes to screen readers
          aria-atomic="true" // Announce the whole region when it changes
          role="region"      // Better semantic role
          aria-roledescription="carousel" // Describe the role
        >
           {/* Navigation Arrows */}
          <button
            className="testimonial-arrow prev"
            onClick={prevSlide}
            aria-label="Previous testimonial"
          >
             {/* SVG Arrow - more customizable than text */}
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
             </svg>
          </button>

          {/* Single Testimonial Card - Apply fade class */}
          <div className={`testimonial-card ${isFading ? 'fading' : ''}`}>
              <span className="testimonial-quote-icon" aria-hidden="true">“</span>
              <blockquote className="testimonial-content">
                <p>"{currentTestimonial.quote}"</p>
                <footer>- {currentTestimonial.name}</footer>
              </blockquote>
          </div>

          <button
            className="testimonial-arrow next"
            onClick={nextSlide}
            aria-label="Next testimonial"
          >
            {/* SVG Arrow */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Navigation Dots */}
          <div className="testimonial-dots">
            {testimonialsData.map((_, idx) => (
              <button
                key={idx}
                className={`testimonial-dot ${currentIndex === idx ? 'active' : ''}`}
                onClick={() => goToSlide(idx)} // Use goToSlide for fade effect
                aria-label={`Go to testimonial ${idx + 1}`}
                // Indicate current item for screen readers
                aria-current={currentIndex === idx ? 'step' : undefined}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Use shared CTA */}
       <ContactSectionCTA
            title="Ready to Write Your Own Success Story?"
            text="Join satisfied SolPower clients and take control of your energy."
            buttonText="Get My Free Quote"
            buttonLink={paths?.contact} // Use paths prop
            // Ensure any specific underline/button styles are handled within ContactSectionCTA or globally
        />
      {/* Footer rendered in App.js */}
    </div>
  );
};

export default Testimonials;