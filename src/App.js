// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

// Import Views/Page
import HomePage from './Views/Homepage';
import Residential from './Views/Residential';
import Commercial from './Views/Commercial';
import HowItWorks from './Views/HowItWorks';
import FAQs from './Views/FAQs';
import AboutUs from './Views/AboutUs';
import Contact from './Views/Contact';
// import Services from './Views/Services'; // Optional

// Import Layout Components
import NavigationBar from './Views/Navigation';
import Footer from './Components/Footer';

// Helper component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Scroll to top unless it's just a hash change on the same page
    if (!window.location.hash) {
        window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <NavigationBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/residential" element={<Residential />} />
            <Route path="/commercial" element={<Commercial />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            {/* Optional: <Route path="/services" element={<Services />} /> */}
            {/* TODO: Add 404 Route */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;