import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Import BrowserRouter, Route, Routes, and Link
import Homepage from './component/Homepage'; // Import Homepage component
import Historypage from './component/Historypage'; // Import History component
import ChartComponent from './component/ChartComponent';

import './component/header.css';

const App = () => {
  return (
    <Router> {/* Wrap the components with BrowserRouter */}
      <div>
        {/* Render the Header */}
        <div className="header">
          <div className="header-title">
            <img src="/corn-icon.png" alt="Corn Icon" className="corn-icon" />
            Corn Planting Tracking System
          </div>
          <div className="header-buttons">
            {/* Add Link to Homepage */}
            <Link to="/" className="header-button" direction="ltr">Home</Link>
            {/* Add Link to History */}
            <Link to="/history" className="header-button" direction="rtl">History</Link>
          </div>
        </div>
          <ChartComponent />
        {/* Define routes */}
        <Routes>
          <Route exact path="/" element={<Homepage />} /> {/* Route for Homepage */}
          <Route path="/history" element={<Historypage />} /> {/* Route for History */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
