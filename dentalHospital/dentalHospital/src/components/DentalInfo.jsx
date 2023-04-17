// DentalInfo.jsx
import React, { useState, useEffect } from "react";
import {
  getTeethByAppointmentId,
  getPatients,
  getAppointments,
} from "./apiService";

import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import "./DentalInfo.css";

const DentalInfo = () => {
  const [dentalInfo, setDentalInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { appointmentId } = useParams();
  const [patient, setPatient] = useState(null);
  const [doctorId] = useState(1);

  useEffect(() => {
    fetchDentalInfo();
    fetchPatient();
  }, []);

  const fetchPatient = async () => {
    try {
      const appointmentsResponse = await getAppointments(doctorId);
      const foundAppointment = appointmentsResponse.find(
        (appointment) => appointment.appointmentId === parseInt(appointmentId)
      );
      const patientId = foundAppointment.patientId;

      const patientsResponse = await getPatients(doctorId);
      const foundPatient = patientsResponse.find(
        (patient) => patient.patientId === patientId
      );
      setPatient(foundPatient);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchDentalInfo = async () => {
    setLoading(true);
    try {
      const response = await getTeethByAppointmentId(appointmentId);
      setDentalInfo(response[0]);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const updateDentalInfo = async (updatedInfo) => {
    // Güncelleme işlemini gerçekleştirin
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateDentalInfo(dentalInfo);
  };
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          <h2 className="patient-name">Hasta Adı: {patient && patient.name}</h2>
          <div className="form-container">
            {/* Diş bilgilerini gösteren tablo */}
            <form onSubmit={handleSubmit}>
              {
                <table>
                  <thead>
                    <tr>
                      <th>Tooth Number</th>
                      <th>Facial Mezial</th>
                      <th>Facial Mid</th>
                      <th>Facial Distal</th>
                      <th>Lungial Mezial</th>
                      <th>Lungial Mid</th>
                      <th>Lungial Distal</th>
                      <th>Pocket Depth</th>
                      <th>Gum Recession</th>
                      <th>Attachment Loss</th>
                      <th>Plaque Index</th>
                      <th>Mobility</th>
                      <th>Furcation Problem</th>
                      <th>Bleeding</th>
                      <th>Fremitus</th>
                      <th>Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{dentalInfo.toothNumber}</td>
                      <td>{dentalInfo.facialMezial}</td>
                      <td>{dentalInfo.facialMid}</td>
                      <td>{dentalInfo.facialDistal}</td>
                      <td>{dentalInfo.lungialMezial}</td>
                      <td>{dentalInfo.lungialMid}</td>
                      <td>{dentalInfo.lungialDistal}</td>
                      <td>{dentalInfo.pocketDepth}</td>
                      <td>{dentalInfo.gumRecession}</td>
                      <td>{dentalInfo.attachmentLoss}</td>
                      <td>{dentalInfo.plaqueIndex}</td>
                      <td>{dentalInfo.mobility}</td>
                      <td>{dentalInfo.furcationProblem}</td>
                      <td>{dentalInfo.bleeding ? "Yes" : "No"}</td>
                      <td>{dentalInfo.fremitus ? "Yes" : "No"}</td>
                      <td>{dentalInfo.note}</td>
                    </tr>
                  </tbody>
                </table>
              }
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default DentalInfo;
