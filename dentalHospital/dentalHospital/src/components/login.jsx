import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const testUser = {
  username: "testuser",
  password: "testpassword",
  userRole: "doktor",
};

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (username === testUser.username && password === testUser.password) {
      const userRole = testUser.userRole;
      if (userRole === "doktor") {
        navigate("/doctor");
      } else if (userRole === "hasta") {
        navigate("/hasta");
      } else {
        alert("Kullanici rolu gecersiz.");
      }
    } else {
      // Gerçek kullanıcı doğrulaması yapın.
      try {
        const response = await axios.post("http://localhost:5173", {
          username: username,
          password: password,
        });
        const userRole = response.data.userRole;

        if (userRole === "doktor") {
          navigate("/doctor");
        } else if (userRole === "hasta") {
          navigate("/hasta");
        } else {
          alert("Kullanici rolu gecersiz.");
        }
      } catch (error) {
        alert("Kullanici adi veya sifre yanlis.");
      }
    }
  };

  return (
    <div className="container">
      <h1>Giriş</h1>
      <form onSubmit={handleSubmit}>
        <label className="test">
          Kullanıcı Adı:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Şifre:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <input type="submit" value="Giriş" />
      </form>
    </div>
  );
};

export default Login;
