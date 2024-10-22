import React from 'react';
import './TeamSection.css';

const TeamSection = () => {
  return (
    <div className="team-section">
      <div className="team-content">
        <div className="team-info">
          <h2>Our team</h2>
          <p>
            We're a high-performance, hand-selected team of industry professionals, subject matter experts,
            career consultants, designers and developers. We shape businesses that will change the world. It's nice
            to meet you.
          </p>
          <button className="meet-team-button">Meet the team</button>
        </div>
        <div className="team-members">
          {['Chris Weiss', 'Dieter Halfar'].map((name, index) => (
            <div key={name} className="team-member">
              <div className="member-info">
                <h3>{name}</h3>
                <p>PARTNER</p>
              </div>
              <a href="#" className="view-link">View →</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
