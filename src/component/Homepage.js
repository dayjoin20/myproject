import React, { useState, useEffect } from 'react';
import database from '../firebaseDB';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Switchbutton from './Switchbutton';
import './GaugeDisplay.css';

const Homepage = () => { 
  const [gaugeData, setGaugeData] = useState([
    { id: 1, name: 'ความชื้นในดิน 1', value: 0, unit: '%', maxValue: 100 },
    { id: 2, name: 'ความชื้นในดิน 2', value: 0, unit: '%', maxValue: 100 },
    { id: 3, name: 'ความชื้นในดิน 3', value: 0, unit: '%', maxValue: 100 },
    { id: 4, name: 'อุณหภูมิ', value: 0, unit: '°C', maxValue: 100 },
    { id: 5, name: 'ความชื้นในอากาศ', value: 0, unit: '%', maxValue: 100 },
    { id: 6, name: 'แสงสว่าง', value: 0, unit: 'LUX', maxValue: 10000 },
  ]);

  useEffect(() => {
    const gaugeRef = database.ref('realtime');

    gaugeRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const updatedGaugeData = gaugeData.map((gauge) => {
          switch (gauge.name) {
            case 'ความชื้นในดิน 1':
              return { ...gauge, value: data.SoilMoisture1 };
            case 'ความชื้นในดิน 2':
              return { ...gauge, value: data.SoilMoisture2 };
            case 'ความชื้นในดิน 3':
              return { ...gauge, value: data.SoilMoisture3 };
            case 'อุณหภูมิ':
              return { ...gauge, value: data.Temperature };
            case 'ความชื้นในอากาศ':
              return { ...gauge, value: data.Humidity };
            case 'แสงสว่าง':
              return { ...gauge, value: data.Light };
            default:
              return gauge;
          }
        });
        setGaugeData(updatedGaugeData);
      }
    });

    return () => {
      gaugeRef.off();
    };
  }, [gaugeData]); 

  return (
    <div className="app-container">
      <div className="gauge-container">
        {gaugeData.map((gauge) => (
          <div key={gauge.id} className="gauge">
            <div className="gauge-name">{gauge.name}</div>
            <div className="gauge-value">
              <CircularProgressbar
                value={gauge.value}
                maxValue={gauge.maxValue}
                text={`${gauge.value} ${gauge.unit}`}
                strokeWidth={10}
                styles={buildStyles({
                  rotation: 0.25,
                  strokeLinecap: 'butt',
                  textSize: '18px',
                  pathTransitionDuration: 0.5,
                  pathColor: `rgba(0, 128, 0, ${gauge.value / gauge.maxValue})`,
                  textColor: '#d4b960',
                  trailColor: '#d6d6d6',
                  backgroundColor: '#3e98c7',
                })}
              />
            </div>
          </div>
        ))}
      </div>
      <div>
        <Switchbutton />
      </div>
    </div>
  );
};

export default Homepage;
