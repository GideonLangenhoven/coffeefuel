// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Views/Homepage';
import Industries from './Views/Industries';
import Services from './Views/Services';
import Insights from './Views/Insights';
import AboutUs from './Views/AboutUs';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/industry1" element={<Industries />} />
          <Route path="/service1" element={<Services />} />
          <Route path="/insight1" element={<Insights />} />
          <Route path="/about" element={<AboutUs />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
