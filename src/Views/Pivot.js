// src/Views/Pivot.js
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom'; // Use Link for button if appropriate
import './Pivot.css';
import Button from '../Components/Button';

// TODO: Replace with a relevant SolPower image (e.g., system diagram, savings graph)
import pivotImageDefault from '../assets/images/solar-benefits.jpg';

const Pivot = ({ backgroundClass = "bg-grey" }) => { // Accept background class as prop
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => { /* ... intersection observer logic as before ... */ }, []);

  return (
    // Apply background class passed via prop
    <section ref={sectionRef} className={`pivotWrapper ${backgroundClass}`}>
      <div className="pivotContainer">
        <div className={`pivotImageWrapper ${isVisible ? 'visible' : ''}`}>
          {/* [Placeholder Image: Infographic/Diagram of Solar Savings or How it Works] */}
          <img
            src={pivotImageDefault} // Use imported image
            alt="Infographic showing SolPower benefits"
            className="pivotImage"
          />
          {/* Removed overlay */}
        </div>

        <div className={`pivotTextContent ${isVisible ? 'visible' : ''}`}>
          {/* Updated Content */}
          <h2 className="pivotTitle">Smart Investment, Sustainable Future</h2>
          <p className="pivotText">
            Choosing SolPower isn't just about escaping load shedding; it's a strategic investment. Increase your property value significantly, lock in predictable energy costs immune to Eskom hikes, and enjoy potential earnings by selling surplus power back to the grid (in supported areas).
          </p>
          <p className="pivotText">
            Beyond the savings, you're investing in a cleaner South Africa. Reduce your carbon footprint and power your life with sustainable, renewable energy harnessed directly from the sun. It's good for your wallet, great for the planet.
          </p>
          {/* Update button link/action */}
          <Link to="/how-it-works">
            <Button className="pivotButton">See How It Works</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Pivot;