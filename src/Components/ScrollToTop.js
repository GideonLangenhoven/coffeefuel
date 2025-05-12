// --- File: src/Components/ScrollToTop.js ---
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Dependency array ensures this runs on every route change

  return null; // This component does not render anything
}

export default ScrollToTop;