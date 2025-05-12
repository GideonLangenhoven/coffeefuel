// --- File: src/App.js ---
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from './Components/ScrollToTop'; // Import the new component
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
// import Footer from './Components/Footer.js';
// import ContactPage from './Views/ContactPage.js';
// import NotFoundPage from './Views/NotFoundPage.js';
// import PrivacyPolicy from './Views/PrivacyPolicy.js';
// import TermsOfUse from './Views/TermsOfUse.js';


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
};

function App() {
    return (
        <Router>
            <ScrollToTop /> {/* Add ScrollToTop component here */}
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
                        {/* <Route path={sitePaths.contact} element={<ContactPage />} /> */}
                        {/* <Route path={sitePaths.privacyPolicy} element={<PrivacyPolicy />} /> */}
                        {/* <Route path={sitePaths.termsOfUse} element={<TermsOfUse />} /> */}
                        <Route path="/process-steps/:stepId" element={<StepDetailPage />} />
                        {/* <Route path="*" element={<NotFoundPage />} /> */}
                    </Routes>
                </main>
               <Footer paths={sitePaths} /> 
            </HelmetProvider>
        </Router>
    );
}

export default App;