// src/Views/AboutUs.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutUs.css'; // Import CSS

// TODO: Add actual team photos if available
// import anvorElyPhoto from '../assets/images/anvor-ely.jpg';
// import franklinPietersePhoto from '../assets/images/franklin-pieterse.jpg';

const AboutUs = () => {
    const navigate = useNavigate();

    return (
        <div className="aboutus-page">
            {/* Section 1: Hero (White) */}
            <section className="aboutus-hero bg-white">
                 <div className="hero-content">
                     <h1>About SolPower</h1>
                     <p>Your Dedicated Partner for Sustainable Energy Success</p>
                 </div>
             </section>

            {/* Sections with alternating backgrounds */}
            <div className="page-container" style={{paddingTop: 0, paddingBottom: 0}}>
                {/* Section 2: Commitment (Grey) */}
                <section id="our-commitment" className="content-section bg-grey">
                  <div className="page-container-inner">
                    <h2>Our Commitment</h2>
                    <p> Our dedicated team is here to support you at every stage of your journey toward sustainable success. Together, we will design a solution tailored to your needs that is both affordable and cost-saving. We carefully assess your situation to create a strategy that aligns your personal or business goals with a greener, more prosperous future. </p>
                  </div>
                </section>

                {/* Section 3: Team (Light Yellow) */}
                <section id="the-team" className="content-section team-profiles bg-yellow-light">
                  <div className="page-container-inner">
                    <h2>Meet the Founders</h2>
                    <div className="profile-grid">
                        {/* Profile 1 */}
                        <div className="profile-container">
                            <div className="profile-photo">[Placeholder Image: Anvor Ely]</div>
                            <div className="profile-details">
                                <h3>Anvor Ely</h3> <h4>COO and Co-Founder</h4>
                                <p>Bringing 25 years of hands-on engineering project experience to the business. Committed to customer service and engineering excellence.</p>
                            </div>
                        </div>
                         {/* Profile 2 */}
                         <div className="profile-container">
                            <div className="profile-photo">[Placeholder Image: Franklin Pieterse]</div>
                             <div className="profile-details">
                                <h3>Franklin Pieterse</h3> <h4>Director and Co-Founder</h4>
                                <p>A business strategy advisor and coach with a background in Electrical Engineering, dedicated to sustainability and transformation. Bringing 30 years of leadership experience to drive impactful change.</p>
                            </div>
                        </div>
                    </div>
                  </div>
                </section>

                {/* Section 4: Why SolPower (White) */}
                <section id="why-solpower" className="content-section why-us-section bg-white">
                   <div className="page-container-inner">
                        <h2>Why SolPower?</h2>
                        <div className="why-us-points">
                            <div className="why-us-point"> <div className="icon">⚙️</div><h4>Customized Solutions</h4> <p>System design tailored to your unique needs.</p> </div>
                            <div className="why-us-point"> <div className="icon">💰</div><h4>Simple Access to Funding</h4> <p>Household & Business options (incl. PPA).</p> </div>
                            <div className="why-us-point"> <div className="icon">🛡️</div><h4>Best-in-Class Warranty</h4> <p>10-25 Years + Replacement Guarantee.</p> </div>
                            <div className="why-us-point"> <div className="icon">✅</div><h4>Seamless Integration</h4> <p>We handle permits, install & compliance.</p> </div>
                        </div>
                   </div>
                </section>

                {/* "Take Action" section REMOVED from here */}

                {/* Section 5: Final Page CTA (Black) */}
                 <section className="cta-section-about bg-black">
                     <h2>Ready to Invest in Your Energy Future?</h2>
                     <p> Let SolPower design your path to savings and reliability. </p>
                     {/* Use standard button, styled by AboutUs.css */}
                     <button className="button basic-button cta-final-button" onClick={() => navigate('/contact')}>
                         Get Your Free Consultation
                     </button>
                 </section>
            </div>
        </div>
    );
};
export default AboutUs;