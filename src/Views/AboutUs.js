// src/Views/AboutUs.js

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavigationBar from './Navigation'; // Ensure this path is correct
import Footer from '../Components/Footer';
import './AboutUs.css'; // Make sure this CSS file exists// Update with your image path

const AboutUs = () => {
  const location = useLocation();

  const scrollToSection = (id) => {
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const yOffset = -80; // Adjust this value based on your header height
        const yPosition = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: yPosition, behavior: 'smooth' });
      }
    }, 0);
  };

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      scrollToSection(hash);
    }
  }, [location]);

  return (
    <div className="aboutus-page">
      <NavigationBar />
      <div className="aboutus-container">
        {/* Hero Section */}
        <section
        >
          <div className="hero-content">
            <h1>We Guide You Through Business Challenges to Success</h1>
            <p>
              Transforming frustrations into opportunities for growth and innovation.
            </p>
            <button className="cta-button" onClick={() => scrollToSection('our-mission')}>
              Learn More
            </button>
          </div>
        </section>

        {/* Navigation Buttons */}
        <div className="aboutus-nav">
          <button onClick={() => scrollToSection('our-mission')}>Our Mission</button>
          <button onClick={() => scrollToSection('our-approach')}>Our Approach</button>
          <button onClick={() => scrollToSection('our-tools')}>Our Tools</button>
          <button onClick={() => scrollToSection('strategic-relationships')}>Strategic Relationships</button>
          <button onClick={() => scrollToSection('founder')}>Our Founder</button>
          <button onClick={() => scrollToSection('frameworks')}>Our Frameworks</button>
        </div>

        {/* Our Mission Section */}
        <section id="our-mission" className="content-section">
          <h2>The Challenge</h2>
          <p>
            The average business owner faces significant challenges in consistently growing and creating lasting value. From the outside, owning a business may seem glamorous, but few truly appreciate the stress of keeping operations running smoothly, capturing market attention, and maintaining customer satisfaction. It can be a lonely, exhausting experience to motivate staff and ensure the business has sufficient funds to reach profitability.
          </p>
        </section>

        {/* Our Approach Section */}
        <section id="our-approach" className="content-section">
          <h2>Our Understanding & Solution</h2>
          <p>
            Terbigen brings an in-depth understanding of these day-to-day challenges faced by business owners and managers. Our services are designed to directly address these pressing issues. We have the skills, compassion, and proven methodologies to support our clients. We help you see your business with fresh eyes, cutting through the clutter of frustrations and insecurity. Working with Terbigen enables you to make strategic choices to secure your company's future.
          </p>
        </section>

        {/* Our Tools Section */}
        <section id="our-tools" className="content-section">
          <h2>Our Approach</h2>
          <p>
            Terbigen provides a structured intervention approach. We assist entrepreneurs in launching new ideas and innovations. For established companies, we help them find their optimal growth path. And for business owners, we guide them towards a successful exit, at a value that meets their goals.
          </p>
          <p>
            Terbigen utilizes specialized Reinvention tools to help clients gain a new, expansive perspective on what is possible. This empowers them to create clear pathways towards revitalization and sustainable growth.
          </p>
        </section>

        {/* Strategic Relationships Section */}
        <section id="strategic-relationships" className="content-section">
          <h2>About Our Strategic Relationships</h2>
          <p>
            Terbigen has a Joint Business Relationship (JBR) with one of the top 4 accounting firms. This partnership allows Terbigen to collaborate on projects and be deployed by the firm for specific client engagements.
          </p>
          <p>
            The relationship began in 2017 when Terbigen was engaged as an Enterprise Development Agent. In that role, Terbigen conducted a business review, provided management coaching, and supported a security technology company over an 18-month period, helping to redefine the business strategy, refocus products and services, and restructure the company's financial management.
          </p>
          <p>
            In 2018, Terbigen undertook a comprehensive business review for a training institution. This project involved assessing the institution's delivery systems, marketing practices, organizational systems, and structure, while also providing direct coaching and mentoring support to the leadership team.
          </p>
          <p>
            In 2019, Terbigen was deployed to a major metropolitan municipality to participate in the review of their City Broadband Infrastructure Project. Terbigen worked closely with city officials and other professionals to develop business options for more effective infrastructure deployment and service delivery.
          </p>
          <p>
            In 2020, Terbigen submitted a joint bid to enable local government delivery systems, leading a panel of professional service providers. The goal was to positively impact municipal revenue management and strategic infrastructure planning and management.
          </p>
          <p>
            Terbigen is currently closely associated with the global Reinvention Academy, accessing the latest research on business change management programs. The firm is also partnering with technology companies specializing in cloud computing, telecommunications, and data security.
          </p>
          <p>
            ConnectMobile24 (CM24) is a software technology company leveraging an enterprise platform of Concursive to deliver solutions to the market across a number of sectors. The company invested in software skills and resources to engineer new use-cases and build derived applications.
          </p>
          <p>
            Terbigen and CM24 are in a strategic relationship where Terbigen supports the business strategy development and venture alignment for CM24, who in turn offers its platform to Terbigen projects to establish and manage collaborative working and platform development for common purpose ecosystems.
          </p>
          <p>
            Terbigen is a member of the Turnaround Management Association. This professional body is the leading organization for turnaround specialists and business rescue practitioners.
          </p>
          <p>
            Terbigen is a member of the Cape Chamber of Commerce. Our membership gives us access to the broader business community in the Cape Town area, allowing us to share our expertise as well as learn from others.
          </p>
        </section>

        {/* Our Founder Section */}
        <section id="founder" className="content-section">
          <h2>Meet Our Founder</h2>
          <p>
            Franklin Pieterse, the Founder and Business Reinvention Coach (MBA, CRP), brings over 25 years of business leadership experience. With a proven track record in senior executive roles such as CEO, Managing Director, Chief Strategy Officer, and Chief Operating Officer, Franklin is deeply passionate about people, business transformation, and delivering results. He personally provides the tailored support and guidance needed to drive meaningful impact for your business.
          </p>
          <p>
            Franklin's true strength lies in his empathy and compassion when relating to others. He is described as a visionary leader, equally adept at business analysis, strategic planning, and execution.
          </p>
        </section>

        {/* Our Frameworks Section */}
        <section id="frameworks" className="content-section">
          <h2>About Terbigen's Strategic Frameworks</h2>
          <p>
            The Terbigen Strategic Framework is designed to enhance business performance and results. We help you review your strategy, business model, and company culture to achieve the desired business outcomes. Successful business turnaround requires a structured intervention. The desired change comes from taking the most effective actions. It's all about doing things differently.
          </p>
          <p>
            Terbigen's BBBEE Strategic Framework is based on the principle that transforming the business sector is critical to enabling meaningful transformation of society. BBBEE is a crucial element in alleviating the impacts of South Africa's apartheid legacy.
          </p>
          <p>
            Every business should pursue a strategy that makes it relevant to the entire South African market. A strategic approach to BBBEE means an organization examines all the Codes' elements to make a meaningful contribution and build a market-aligned delivery system that understands its target audience's needs, wants, and desires. Well-structured BBBEE facilitates effective communication with target audiences based on strong community connections.
          </p>
          <p>
            We help you optimize your BBBEE scorecard while simultaneously strengthening your business's competitiveness. BBBEE is about empowering people and connecting with markets.
          </p>
          <p>
            Terbigen stays current with the latest business strategies and approaches, including Lean Startup, Design Thinking, Agile Development, Jobs Theory, and Critical Few Culture Change. We integrate and apply these business principles to create real-world impact for our clients. We have particular expertise in developing effective marketing and pricing strategies.
          </p>
        </section>

        {/* Call to Action Section */}
        <section className="cta-section">
          <h2>Ready to Transform Your Business?</h2>
          <p>
            Let's work together to turn your challenges into opportunities.
          </p>
          <button className="cta-button" onClick={() => window.location.href = '#contact'}>
            Get in Touch
          </button>
        </section>

      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
