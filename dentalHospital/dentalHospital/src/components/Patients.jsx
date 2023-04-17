import React, { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";
import * as api from "./apiService.jsx";
import "./Patients.css";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const doctorId = 1;

  useEffect(() => {
    const fetchPatients = async () => {
      const patientsData = await api.getPatients(doctorId);
      setPatients(patientsData);
    };
    fetchPatients();
  }, [doctorId]);

  const PatientDetailsModal = ({ patient, onClose }) => {
    return (
      <div className="modal">
        <div className="modal-content">
          <h2>Adı: {patient.name}</h2>
          <p>Yaşı: {patient.age} </p>
          <p>Cinsiyeti: {patient.gender ? "Erkek" : "Kadın"}</p>
          <p>TC Kimliği: {patient.turkeyId}</p>
          <p>Telefon Numarası: {patient.phoneNumber}</p>
          <button onClick={onClose}>X</button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="patient-list">
          <h1 className="welcome-text">Hastalarım</h1>
          <ul>
            {patients.map((patient) => (
              <li key={patient.patientId} className="patient-item">
                {patient.name}
                <button onClick={() => setSelectedPatient(patient)}>
                  Detaylar
                </button>
                {selectedPatient && (
                  <PatientDetailsModal
                    patient={selectedPatient}
                    onClose={() => setSelectedPatient(null)}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Patients;
