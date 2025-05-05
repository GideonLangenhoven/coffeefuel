// src/Views/Contact.js
import React, { useState } from 'react';
import './Contact.css'; // Import the CSS file

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ message: 'Please fill out all required fields.', type: 'error' });
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
      // Ensure this endpoint is correct (proxy or full URL)
      const apiEndpoint = '/api/contact';
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData), // Send full formData matching state
      });
      const result = await response.json();

      if (response.ok) {
        setStatus({ message: result.message || 'Message sent successfully! We will be in touch soon.', type: 'success' });
        setFormData({ name: '', email: '', message: '' });
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

  return (
    <div className="contact-page-wrapper"> {/* Use class from CSS file */}
      <div className="contact-form-container"> {/* Use class from CSS file */}
        <h1>Get In Touch</h1>
        <p>
          Have questions about solar, backup power, or our services? Fill out the form below, and we'll get back to you shortly.
        </p>
        <form onSubmit={handleSubmit} className="contact-form"> {/* Use class from CSS file */}
          {/* Using standard HTML elements styled via Contact.css */}
          <input
            type="text"
            name="name"
            placeholder="Your Name*"
            value={formData.name}
            onChange={handleChange}
            required
            // No Tailwind classes needed here
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email Address*"
            value={formData.email}
            onChange={handleChange}
            required
            // No Tailwind classes needed here
          />
          <textarea
            name="message"
            placeholder="Your Message*"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            // No Tailwind classes needed here
          />
          <button
            type="submit"
            disabled={isLoading}
            // No Tailwind classes needed here
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
        {/* Status Message Display */}
        {status.message && (
           // Use classes from CSS file
          <p className={`contact-status-message ${status.type}`} role="alert">
            {status.message}
          </p>
        )}
      </div>
    </div>
  );
}