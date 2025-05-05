// src/Views/Testimonials.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './PageStyles.css'; // Shared styles
import './Testimonials.css'; // Specific styles
import Button from '../Components/Button'; // Use Button component
import ContactSectionCTA from '../Components/ContactSectionCTA'; // Import reusable CTA

// Added more testimonials
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

const SLIDE_INTERVAL = 5500; // Slightly adjusted interval

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  // Go to next slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

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
  };

  // Start on mount, clear on unmount
  useEffect(() => {
    startAutoScroll();
    return () => pauseAutoScroll();
  }, [startAutoScroll]);

  return (
    <div className="page-wrapper testimonials-page bg-white"> {/* Start with white */}
      <div className="page-container">
        <h1 className="page-title">Real Clients, Real Savings, Real Power</h1>
        <p className="page-subtitle" style={{ textAlign: 'center', maxWidth: '700px', margin: '-2rem auto 3rem', color: 'var(--solpower-text-medium)' }}>
            Hear directly from homeowners and businesses across South Africa who chose SolPower.
        </p>

        {/* Testimonial Slider */}
        <div
          className="testimonial-slider-container"
          onMouseEnter={pauseAutoScroll}
          onMouseLeave={startAutoScroll}
        >
          <div className="testimonial-slider" style={{ transform: `translateX(-${currentIndex * 100}%)`, width: `${testimonialsData.length * 100}%` }} >
            {testimonialsData.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-slide">
                <blockquote className="testimonial-item">
                  <p>"{testimonial.quote}"</p>
                  <footer>- {testimonial.name}</footer>
                </blockquote>
              </div>
            ))}
          </div>
          <div className="testimonial-dots">
              {testimonialsData.map((_, idx) => ( <button key={idx} className={`testimonial-dot ${currentIndex === idx ? 'active' : ''}`} onClick={() => setCurrentIndex(idx)} aria-label={`Go to testimonial ${idx + 1}`} /> ))}
          </div>
        </div>
      </div>

      {/* Use reusable CTA section */}
       <ContactSectionCTA
            title="Ready to Write Your Own Success Story?"
            text="Join satisfied SolPower clients and take control of your energy."
            buttonText="Get My Free Quote"
        />
        {/* Footer rendered in App.js */}
    </div>
  );
};

export default Testimonials;