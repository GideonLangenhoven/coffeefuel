// src/components/TeamSection.js
import React from 'react';
import './TeamSection.css'; // Ensure CSS path is correct

// Placeholder data for team members (Update with actual data or fetch from API)
const teamMembersData = [
  { name: 'Chris Weiss', role: 'Partner', link: '#' },
  { name: 'Dieter Halfar', role: 'Partner', link: '#' },
  // Add more team members as needed
];

const TeamSection = () => {
  // TODO: Replace hardcoded text with content relevant to 'coffeefuel'
  return (
    <section id="team-section" className="team-section"> {/* Added id for potential navigation */}
      <div className="team-content">
        {/* Left side: Information about the team */}
        <div className="team-info">
          <h2>Our Team</h2>
          <p>
            {/* Update this description for coffeefuel */}
            We're a high-performance, hand-selected team of industry professionals, subject matter experts,
            career consultants, designers and developers. We shape businesses that will change the world. It's nice
            to meet you.
          </p>
          {/* TODO: Link this button to the actual team page/section if it exists */}
          <button className="meet-team-button">Meet the Team</button>
        </div>

        {/* Right side: Grid of team members */}
        <div className="team-members">
          {teamMembersData.map((member) => (
            <div key={member.name} className="team-member">
              {/* Placeholder for image - Add <img src={member.imageUrl} alt={member.name} className="member-image" /> when available */}
              <div className="member-info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
              <a href={member.link} className="view-link" target="_blank" rel="noopener noreferrer">
                View →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;