// src/Views/Homepage.js
import React from 'react';
import './Homepage.css';
import Header from './Header.js';
import InfoCard from '../Components/InfoCard';
import TeamSection from '../Components/TeamSection';
import { FaLightbulb, FaChartLine, FaUsers } from 'react-icons/fa';
import Footer from '../Components/Footer';

const HomePage = () => {
  return (
    <div className="container-fluid">
      <Header />
      <div className="content-wrapper">
        <div className="info-cards-container">
          <InfoCard
            icon={<FaLightbulb />}
            title="Innovative Solutions"
            description="We provide cutting-edge solutions to help your business grow and thrive in today's competitive market."
          />
          <InfoCard
            icon={<FaChartLine />}
            title="Strategic Growth"
            description="Our expert team develops tailored strategies to accelerate your business growth and achieve your goals."
          />
          <InfoCard
            icon={<FaUsers />}
            title="Collaborative Approach"
            description="We work closely with you, fostering a collaborative environment to ensure the best outcomes for your business."
          />
        </div>
        <TeamSection />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;

