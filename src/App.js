// --- File: src/App.js ---
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from './Components/ScrollToTop';
import Footer from './Components/Footer.js';
// --- Import Page/View Components ---
import NavigationBar from './Views/Navigation.js';
import Homepage from './Views/Homepage.js';
import HowItWorksPage from './Views/HowItWorks.js';
import StepDetailPage from './Views/StepDetailPage.js';
import Residential from './Views/Residential.js';
import Commercial from './Views/Commercial.js';
import FAQs from './Views/FAQs.js';
import AboutUs from './Views/AboutUs.js';
import Testimonials from './Views/Testimonials.js';
import Contact from './Views/Contact.js';
import LearnSolar from './Components/LearnSolar/LearnSolar.js'; // *** IMPORT THE NEW COMPONENT ***

// Placeholder component for the Gallery page (until you create it similarly)
const GalleryPage = () => <div style={{ padding: '20px', textAlign: 'center' }}><h1>Gallery Page</h1><p>Content coming soon!</p></div>;


// --- Define Site Paths ---
const sitePaths = {
  home: '/',
  residential: '/residential',
  commercial: '/commercial',
  howItWorks: '/how-it-works',
  faqs: '/faqs',
  about: '/about',
  contact: '/contact',
  testimonials: '/testimonials',
  privacyPolicy: '/privacy-policy',
  termsOfUse: '/terms-of-use',
  learnSolar: '/learn-solar-power', // Path for "Learn about Solar Power"
  gallery: '/gallery', // Path for "Gallery"
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <HelmetProvider>
        <NavigationBar paths={sitePaths} />
        <main style={{ paddingTop: '70px', minHeight: 'calc(100vh - 70px)' }}>
          <Routes>
            <Route path={sitePaths.home} element={<Homepage paths={sitePaths} />} />
            <Route path={sitePaths.residential} element={<Residential paths={sitePaths} />} />
            <Route path={sitePaths.commercial} element={<Commercial paths={sitePaths} />} />
            <Route path={sitePaths.howItWorks} element={<HowItWorksPage paths={sitePaths} />} />
            <Route path={sitePaths.faqs} element={<FAQs paths={sitePaths} />} />
            <Route path={sitePaths.about} element={<AboutUs paths={sitePaths} />} />
            <Route path={sitePaths.testimonials} element={<Testimonials paths={sitePaths} />} />
            <Route path={sitePaths.contact} element={<Contact paths={sitePaths} />} />
            <Route path={sitePaths.learnSolar} element={<LearnSolar />} /> {/* *** USE THE IMPORTED COMPONENT *** */}
            <Route path={sitePaths.gallery} element={<GalleryPage />} /> {/* Route for Gallery Page */}
            {/* <Route path={sitePaths.privacyPolicy} element={<PrivacyPolicy />} /> */}
            {/* <Route path={sitePaths.termsOfUse} element={<TermsOfUse />} /> */}
            <Route path="/process-steps/:stepId" element={<StepDetailPage />} />
        {/* Other routes in your application */}
        <Route path="/learn-solar-power" element={<LearnSolar />} />
        <Route path="/learn-solar-power/:articleSlug" element={<LearnSolar />} />
        {/* Other routes */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </main>
        <Footer paths={sitePaths} />
      </HelmetProvider>
    </Router>
  );
}

export default App;