import React, { useState, useEffect } from 'react';
import database from './firebaseDB'; // Import database instance
import './component/Switchbutton.css'; 

const Switchbutton = () => {
  const [switch1Enabled, setSwitch1Enabled] = useState(() => {
    const savedState = localStorage.getItem('switch1Enabled');
    return savedState !== null ? JSON.parse(savedState) : false;
  });

  const [switch2Enabled, setSwitch2Enabled] = useState(() => {
    const savedState = localStorage.getItem('switch2Enabled');
    return savedState !== null ? JSON.parse(savedState) : false;
  });

  useEffect(() => {
    localStorage.setItem('switch1Enabled', JSON.stringify(switch1Enabled));
  }, [switch1Enabled]);

  useEffect(() => {
    localStorage.setItem('switch2Enabled', JSON.stringify(switch2Enabled));
  }, [switch2Enabled]);

  const handleSwitch1Change = () => {
    setSwitch1Enabled(!switch1Enabled);
    if (switch2Enabled) {
      setSwitch1Enabled(false);
    }
  };

  const handleSwitch2Change = () => {
    setSwitch2Enabled(!switch2Enabled);
    if (switch1Enabled) {
      setSwitch2Enabled(false);
    }
  };

  return (
    <div className='switch-container'>
      <label className="switch">
        <input type="checkbox" checked={switch1Enabled} onChange={handleSwitch1Change} />
        <span className="slider round"></span>
      </label>

      <label className="switch">
        <input type="checkbox" checked={switch2Enabled} onChange={handleSwitch2Change} />  
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default Switchbutton;