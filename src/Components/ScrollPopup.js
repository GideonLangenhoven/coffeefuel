// --- File: src/Components/ScrollPopup.js ---
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollPopup() {
const { pathname } = useLocation();

useEffect(() => {
window.scrollTo(0, 0);
}, [pathname]); // Dependency array ensures this runs on every route change

return null; // This component does not render anything
}

export default ScrollToTop;import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './ScrollPopup.css';
import { X } from 'lucide-react';

const ScrollPopup = () => {
const [isVisible, setIsVisible] = useState(false);
const [hasBeenVisible, setHasBeenVisible] = useState(false); // Track if it has ever become visible in this session part
const [isDismissedInSession, setIsDismissedInSession] = useState(() => {
return sessionStorage.getItem('scrollPopupDismissed_v1') === 'true';
});

const handleScroll = useCallback(() => {
if (isDismissedInSession || hasBeenVisible) return; // Don't re-trigger if dismissed or already shown and hidden by scroll up

const scrollHeight = document.documentElement.scrollHeight;
const innerHeight = window.innerHeight;
const scrollTop = window.scrollY;

// Ensure scrollHeight is greater than innerHeight to avoid division by zero or NaN
if (scrollHeight <= innerHeight) {
if (!isVisible) setIsVisible(true); // Show if content is less than viewport
setHasBeenVisible(true);
return;
}

const scrollPercentage = (scrollTop / (scrollHeight - innerHeight)) * 100;

if (scrollPercentage >= 70) {
if (!isVisible) setIsVisible(true);
setHasBeenVisible(true); // Mark that it has been made visible
} else if (scrollPercentage < 65 && isVisible && hasBeenVisible) {
// Optionally hide if user scrolls back up significantly, but only if it was made visible by scroll
// setIsVisible(false); // Uncomment this if you want it to hide on scroll up
}
}, [isDismissedInSession, isVisible, hasBeenVisible]);

useEffect(() => {
// Initial check in case the page loads already past the 70% mark
handleScroll();
window.addEventListener('scroll', handleScroll, { passive: true });
return () => {
window.removeEventListener('scroll', handleScroll);
};
}, [handleScroll]);

const handleDismiss = () => {
setIsVisible(false);
setIsDismissedInSession(true);
sessionStorage.setItem('scrollPopupDismissed_v1', 'true');
};

if (isDismissedInSession) {
return null;
}

return (
<div className={`scroll-popup ${isVisible ? 'visible' : ''}`}>
<div className="scroll-popup-content-wrapper">
<p className="scroll-popup-text">Ready to harness the power of the sun?</p>
<Link to="/contact" className="scroll-popup-cta-button">
Ready to start?
</Link>
</div>
<button onClick={handleDismiss} className="scroll-popup-close-button" aria-label="Dismiss">
<X size={22} />
</button>
</div>
);
};

export default ScrollPopup;