import React from 'react';
import './Pivot.css';
import TotoImage from '../assets/images/Toto.png'; 
const Pivot = () => {
  return (
    <div className="pivotWrapper">
      <div className="pivotContainer">
        {/* Image Section - Now appears first */}
        <div className="pivotImageWrapper">
          <img 
            src={TotoImage} 
            alt="Satellite dish overlooking city"
            className="pivotImage visible"
          />
          {/* Purple Overlay Box */}
          <div className="pivotOverlay">
            <div className="percentage">
              86%
            </div>
            <p className="text-sm">
              of industry visionaries agree:
            </p>
            <p className="text-lg">
              Risk-takers make better leaders.
            </p>
          </div>
        </div>

        {/* Text Content */}
        <div className="pivotTextContent">
          <h2 className="pivotTitle visible">
            Pivoting for success amidst economic challenges
          </h2>
          
          <p className="pivotText visible">
            Embracing opportunity in times of change is core to how we operate at the Challenger 
            Consultancy, and we support our clients in doing the same. It's our fundamental belief 
            that this is where success is built.
          </p>
          
          <p className="pivotText visible">
            Our recent study shows that risk-taking is a fundamental factor in achieving growth in
            business. Those who have remained forward-thinking and made investments for the 
            future, rather than pressing pause, are finding themselves ahead of the pack.
          </p>
          
          <button className="pivotButton">
            Read the research
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pivot;
