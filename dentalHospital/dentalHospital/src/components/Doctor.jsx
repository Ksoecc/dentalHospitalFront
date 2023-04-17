import React, { useState, useEffect } from "react";
import "./DoctorsPage.css";
import * as api from "./apiService.jsx";
import Navbar from "./Navbar.jsx";

const Doctors = () => {
  const [doctor, setDoctor] = useState(null);

  const doctorId = 1;

  useEffect(() => {
    const fetchData = async () => {
      const doctorData = await api.getDoctor(doctorId);

      setDoctor(doctorData);
    };
    fetchData();
  }, [doctorId]);

  return (
    <div className="main-container">
      <Navbar />
      <div className="welcome-container">
        {doctor && (
          <div>
            <h1>Hoşgeldiniz {doctor.name}</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;
