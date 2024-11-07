// src/Views/Homepage.js
import React from 'react';
import './Homepage.css';
import CompanyShowcase from '../Components/CompanyShowcase';
import CoreCapabilities from '../Components/CoreCapabilities';
import TeamSection from '../Components/TeamSection';
import ContactCTA from '../Components/ContactCTA';
import Footer from '../Components/Footer';
import Header from './Header';
import Pivot from './Pivot';

const Homepage = () => {
  return (
    <div className="homepage">
      <Header />
      <CompanyShowcase />
      <Pivot />
      <CoreCapabilities />
      <TeamSection />
      <ContactCTA />
      <Footer />
    </div>
  );
};

export default Homepage;
