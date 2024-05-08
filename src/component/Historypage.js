import React, { useEffect, useState } from 'react';
import database from '../firebaseDB';
import './Historypage.css';

const Historypage = () => {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const snapshot = await database.ref('history').once('value');
        const history = snapshot.val();
        if (history) {
          const historyArray = Object.entries(history).map(([key, value]) => ({
            id: key,
            ...value
          }));
          setHistoryData(historyArray);
        }
      } catch (error) {
        console.error('Error fetching history data:', error);
      }
    };

    fetchHistoryData();
  }, []);

  return (
    <div className="history-data-container">
      <h1 className="title">Data History</h1>
      <table className="data-table">
        <thead>
          <tr>
            <th>Date/Time</th>
            <th>Soil Moisture 1 </th>
            <th>Soil Moisture 2 </th>
            <th>Soil Moisture 3 </th>
            <th>Temperature</th>
            <th>Humidity</th>
            <th>Light (LUX)</th>
          </tr>
        </thead>
        <tbody>
          {historyData.map((data) => (
            <tr key={data.id}>
              <td>{data.Datetime}</td>
              <td>{data.SoilMoisture1} %</td>
              <td>{data.SoilMoisture2} %</td>
              <td>{data.SoilMoisture3} %</td>
              <td>{data.Temperature} ° C</td>
              <td>{data.Humidity} %</td>
              <td>{data.Light} LUX</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Historypage;
