import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useInView } from 'react-intersection-observer';
import './Contact.css';
import Button from '../Components/Button'; // Assuming Button component path

// --- Reusable Animation Components (Ideally imported) ---
const AnimatedPointComponent = React.forwardRef(
  ({ children, className, tag: Tag = 'div', delay = 0, threshold = 0.1, triggerOnce = false, style: customStyle = {} }, ref) => {
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

// --- Main Contact Component ---
export default function Contact({ paths = {} }) { // Added default for paths
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interestType: 'General Inquiry', // Added new field with default
    message: ''
  });
  const [status, setStatus] = useState({ message: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message || !formData.interestType) {
      setStatus({ message: 'Please fill out all required fields, including your area of interest.', type: 'error' });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        setStatus({ message: 'Please enter a valid email address.', type: 'error'});
        return;
    }
    setIsLoading(true);
    setStatus({ message: '', type: '' });
    try {
      const apiEndpoint = '/api/contact'; // Ensure this endpoint is correctly configured
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        setStatus({ message: result.message || 'Message sent successfully! We will be in touch soon.', type: 'success' });
        setFormData({ name: '', email: '', interestType: 'General Inquiry', message: '' });
      } else {
        setStatus({ message: result.error || 'An error occurred. Please try again later.', type: 'error' });
      }
    } catch (error) {
      console.error('Form submission network error:', error);
      setStatus({ message: 'Failed to send message. Please check your connection or try again later.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  // SEO Content
  const pageTitle = "Contact SolPower | Solar Solutions South Africa";
  const metaDescription = "Get in touch with SolPower for expert advice on residential and commercial solar solutions in South Africa. Request a free quote or book a discovery call today.";
  const canonicalUrl = "https://www.YOUR_DOMAIN.co.za" + (paths?.contact || '/contact');
  const webpageSchema = { "@context": "https://schema.org", "@type": "ContactPage", "url": canonicalUrl, "name": pageTitle, "description": metaDescription, "publisher": { "@type": "Organization", "name": "SolPower", "logo": { "@type": "ImageObject", "url": "https://www.YOUR_DOMAIN.co.za/logo.png" } } };


  return (
    <div className="page-wrapper contact-page-wrapper">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(webpageSchema)}</script>
      </Helmet>

      <section className="contact-main-section"> {/* Added section for consistent padding */}
        <div className="page-container-inner">
          <AnimatedHeadingComponent
            text="Get In Touch"
            level="h1"
            className="contact-page-title" // Specific class for H1 styling
          />
          <AnimatedPointComponent className="contact-intro-text" tag="p" delay={0.1}>
            Have questions about solar power, battery backup, or our specialized services for homes and businesses? Fill out the form below, or book a discovery call. We're here to help you harness the sun!
          </AnimatedPointComponent>

          <AnimatedPointComponent className="contact-form-card" delay={0.2} tag="div"> {/* Form container card */}
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-field">
                <label htmlFor="name">Full Name*</label>
                <input type="text" id="name" name="name" placeholder="e.g., Jane Doe" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="form-field">
                <label htmlFor="email">Email Address*</label>
                <input type="email" id="email" name="email" placeholder="e.g., jane.doe@example.com" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-field">
                <label htmlFor="interestType">I'm interested in*</label>
                <select id="interestType" name="interestType" value={formData.interestType} onChange={handleChange} required >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Residential Solar">Residential Solar</option>
                  <option value="Commercial Solar">Commercial Solar</option>
                  <option value="Solar PPA">Solar PPA (Commercial)</option>
                  <option value="Financing Options">Financing Options</option>
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="message">Your Message*</label>
                <textarea id="message" name="message" placeholder="Tell us a bit about your needs or questions..." value={formData.message} onChange={handleChange} required rows="6" />
              </div>
              <Button type="submit" className="btn-solpower-primary btn-contact-submit" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
            {status.message && (
              <p className={`contact-status-message ${status.type}`} role="alert">
                {status.message}
              </p>
            )}
          </AnimatedPointComponent>

          <AnimatedPointComponent className="calendly-cta-section" delay={0.3} tag="div">
            <h2>Prefer to Talk Sooner?</h2>
            <p>Schedule a free, no-obligation discovery call directly with one of our solar specialists at your convenience.</p>
            <a href="https://calendly.com/YOUR_USERNAME/discovery-call" target="_blank" rel="noopener noreferrer" className="calendly-button-link">
                <Button className="btn-solpower-secondary">Book Discovery Call</Button>
            </a>
            {/* Replace with your actual Calendly link above */}
          </AnimatedPointComponent>

        </div>
      </section>
    </div>
  );
}