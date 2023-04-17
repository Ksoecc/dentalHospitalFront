import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Doctors from "./components/Doctor";
import Patients from "./components/Patients";
import Login from "./components/Login";
import Appointments from "./components/Appointments";
import DentalInfo from "./components/DentalInfo";

const HomePage = ({ onLogin, userType }) => {
  if (userType === "doctor") {
    return <Navigate to="/doctor" />;
  }

  return <Login onLogin={onLogin} />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");

  const handleLogin = (userType) => {
    setIsLoggedIn(true);
    setUserType(userType);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={<HomePage onLogin={handleLogin} userType={userType} />}
          />
          <Route path="/doctor/patients" element={<Patients />} />
          <Route path="/doctor/appointments" element={<Appointments />} />
          <Route path="/doctor" element={<Doctors />} />
          <Route
            path="/doctor/DentalInfo/:appointmentId"
            element={<DentalInfo />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
