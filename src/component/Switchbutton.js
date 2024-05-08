import React, { useState, useEffect } from 'react';
import database from '../firebaseDB'; // นำเข้าไฟล์เชื่อมต่อ Firebase
import 'firebase/compat/database'; // Import Database compat
import './Switchbutton.css'; 

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
    database.ref('realtime/Valvecontrol').set(switch1Enabled ? 1 : 0); // อัปเดตค่า Valve control ใน Firebase Realtime Database
  }, [switch1Enabled]);

  useEffect(() => {
    localStorage.setItem('switch2Enabled', JSON.stringify(switch2Enabled));
    if (switch2Enabled) {
      const soilMoistureRef = database.ref('realtime');
      const callback = (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const { SoilMoisture1, SoilMoisture2, SoilMoisture3 } = data;
          const average = (SoilMoisture1 + SoilMoisture2 + SoilMoisture3) / 3;
          if (average <= 75) { // ปรับเป็น 75 จาก 80
            database.ref('realtime/Valvecontrol').set(1); // ปรับเป็น 1
          } else if (average >= 80) { // เปลี่ยนเป็น else if และปรับเป็น >= 80
            // หน่วงเวลา 5 วินาทีก่อนส่งค่า Valvecontrol เป็น 0
            setTimeout(() => {
              database.ref('realtime/Valvecontrol').set(0);
            }, 5000);
          }
        }
      };
      soilMoistureRef.on('value', callback);
      
      // Cleanup function
      return () => {
        soilMoistureRef.off('value', callback);
      };
    } else {
      database.ref('realtime/Valvecontrol').set(0); // เมื่อปิด Switch 2 ให้ Valvecontrol เป็น 0
    }
  }, [switch2Enabled]);

 const handleSwitch1Change = () => {
  if (!switch2Enabled) {
    setSwitch1Enabled(!switch1Enabled);
  }
};

const handleSwitch2Change = () => {
  if (!switch1Enabled) {
    setSwitch2Enabled(!switch2Enabled);
    if (!switch2Enabled) {
      const soilMoistureRef = database.ref('realtime');
      const callback = (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const { SoilMoisture1, SoilMoisture2, SoilMoisture3 } = data;
          const average = (SoilMoisture1 + SoilMoisture2 + SoilMoisture3) / 3;
          if (average <= 75) { // ปรับเป็น 75 จาก 80
            database.ref('realtime/Valvecontrol').set(1); // ปรับเป็น 1
          } else if (average >= 80) { // เปลี่ยนเป็น else if และปรับเป็น >= 80
            // หน่วงเวลา 5 วินาทีก่อนส่งค่า Valvecontrol เป็น 0
            setTimeout(() => {
              database.ref('realtime/Valvecontrol').set(0);
            }, 5000);
          }
        }
      };

      soilMoistureRef.on('value', callback);

      // Cleanup function
      return () => {
        soilMoistureRef.off('value', callback);
      };
    } else {
      const soilMoistureRef = database.ref('realtime');
      soilMoistureRef.off('value'); // หยุดการตรวจสอบค่า soil moisture เมื่อ switch 2 ถูกปิด
      database.ref('realtime/Valvecontrol').set(0); // เมื่อปิด Switch 2 ให้ Valvecontrol เป็น 0
    }
  }
};
  
  return (
    <div className='switch-container'>
      <label className="switch">
        <input type="checkbox" checked={switch1Enabled} onChange={handleSwitch1Change} />
        <span className="slider round">
          <span className="switch-text">เปิดวาล์ว : </span> {/* ข้อความที่ต้องการแสดง */}
        </span>
      </label>

      <label className="switch">
        <input type="checkbox" checked={switch2Enabled} onChange={handleSwitch2Change} />  
        <span className="slider round">
          <span className="switch-text2">เปิดวาล์ว Auto :</span> {/* ข้อความที่ต้องการแสดง */}
        </span>
      </label>
    </div>
  );
};

export default Switchbutton;
