import React, { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";
import * as api from "./apiService.jsx";
import "./Appointments.css";
import { Link } from "react-router-dom";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [patient, setPatient] = useState(null);
  const doctorId = 1;

  useEffect(() => {
    const fetchAppointments = async () => {
      const appointmentsData = await api.getAppointments(doctorId);
      setAppointments(appointmentsData);
    };
    fetchAppointments();
  }, [doctorId]);

  useEffect(() => {
    if (selectedAppointment) {
      setPatient(null);
      const fetchPatient = async () => {
        const patientData = await api.getPatient(selectedAppointment.patientId);
        setPatient(patientData);
      };
      fetchPatient();
    }
  }, [selectedAppointment]);

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(date).toLocaleDateString("tr-TR", options);
  };
  const AppointmentDetailsModal = ({ appointment, onClose }) => {
    // Tarih ve saat için yeni bir değişken tanımlayalım.
    const appointmentDate = new Date(appointment.appointmentDate);
    return (
      <div className="modal">
        <div className="modal-content">
          {patient && (
            <div>
              <h2>Hasta Detayları:</h2>
              <p>Adı: {patient.name}</p>
              <p>Yaşı: {patient.age}</p>
              <p>Telefonu: {patient.phoneNumber}</p>
            </div>
          )}
          <h2>Randevu Tarihi: {appointmentDate.toLocaleDateString()}</h2>
          {/* Saat için de ayrı bir değişken tanımlayalım. */}
          <p>Saat: {appointmentDate.toLocaleTimeString()}</p>
          <p>Not: {appointment.note}</p>
          <p>{appointment.description}</p>

          <button onClick={onClose}>X</button>
        </div>
      </div>
    );
  };
  return (
    <div className="container">
      <Navbar />
      <h1 className="welcome-message">Randevularım</h1>
      <div className="appointment-list">
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.appointmentId} className="appointment-item">
              {formatDate(appointment.appointmentDate)}
              <button onClick={() => setSelectedAppointment(appointment)}>
                Detaylar
              </button>
              <Link to={`/doctor/dentalinfo/${appointment.appointmentId}`}>
                <button>Randevuya Git</button>
              </Link>
            </li>
          ))}
        </ul>
        {selectedAppointment && (
          <AppointmentDetailsModal
            appointment={selectedAppointment}
            onClose={() => setSelectedAppointment(null)}
          />
        )}
      </div>
    </div>
  );
};
export default Appointments;
