// src/Components/TeamSection.js
import React from 'react';
import './TeamSection.css'; // Import CSS
import { Link } from 'react-router-dom'; // Use Link for navigation

// TODO: Update with actual SolPower team members or remove if not needed
const teamMembersData = [
  { name: 'Alex Johnson', role: 'Lead Solar Technician', imageUrl: '/path/to/alex.jpg', link: '/about#team-alex' },
  { name: 'Maria Garcia', role: 'Energy Consultant', imageUrl: '/path/to/maria.jpg', link: '/about#team-maria' },
  // Add more team members
];

const TeamSection = () => {
  // TODO: Update content for SolPower
  return (
    <section id="team-section" className="team-section">
      <div className="team-content">
        <div className="team-info">
          <h2>Meet the SolPower Experts</h2>
          <p>
            Our dedicated team of certified technicians, energy consultants, and support staff are passionate about delivering high-quality solar and backup power solutions across South Africa. We're here to guide you every step of the way.
          </p>
          {/* Use Link component if linking internally */}
          <Link to="/about#team" className="meet-team-button">
            More About Our Team
          </Link>
        </div>
        <div className="team-members">
          {teamMembersData.map((member) => (
            <div key={member.name} className="team-member">
              {/* TODO: Add actual image */}
              <img src={'https://via.placeholder.com/120'} alt={member.name} className="member-image" />
              <div className="member-info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
              <Link to={member.link} className="view-link">
                View Bio →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;