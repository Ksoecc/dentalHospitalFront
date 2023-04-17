import axios from "axios";

const API_BASE_URL = "http://localhost:5104/api";

export const getDoctor = async (doctorId) => {
  const response = await axios.get(
    `${API_BASE_URL}/Doctors/GetDoctorById/${doctorId}`
  );
  return response.data;
};

export const getPatients = async (doctorId) => {
  const response = await axios.get(
    `${API_BASE_URL}/Doctors/${doctorId}/doctorPatients`
  );
  return response.data;
};

export const getAppointments = async (doctorId) => {
  const response = await axios.get(
    `${API_BASE_URL}/Doctors/${doctorId}/appointments`
  );
  return response.data;
};
export const getPatient = async (patientId) => {
  const response = await fetch(
    `${API_BASE_URL}/Patients/GetPatientById/${patientId}`
  );
  const data = await response.json();
  return data;
};

export const getTeethByAppointmentId = async (appointmentId) => {
  const response = await axios.get(
    `${API_BASE_URL}/Teeth/GetTeethByAppointmentId/${appointmentId}`
  );
  return response.data;
};
