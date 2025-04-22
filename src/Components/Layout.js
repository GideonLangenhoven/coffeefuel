// src/components/Layout.js
import React from 'react';
// Adjust import paths based on your actual file structure
// It's common to have Header/Footer directly in components or in a dedicated layout folder
import Header from '../Views/Navigation'; // Assuming Header is the NavigationBar component from Views
import Footer from './Footer'; // Assuming Footer is in the same components folder

// Basic Layout component to wrap pages/views
// Provides consistent Header and Footer across the application
const Layout = ({ children }) => {
  return (
    <div className="layout"> {/* Add base styles for 'layout' if needed */}
      <Header />
      <main>{children}</main> {/* Main content area */}
      <Footer />
    </div>
  );
};

export default Layout;