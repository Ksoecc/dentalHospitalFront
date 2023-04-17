import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => (
  <nav className="navbar">
    <ul>
      <li>
        <Link to="/doctor">Ana Sayfa</Link>
      </li>
      <li>
        <Link to="/doctor/patients">Hastalarım</Link>
      </li>
      <li>
        <Link to="/doctor/appointments">Randevularım</Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
