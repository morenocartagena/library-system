import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Auth.css";

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Se obtiene la función logout del contexto

  const handleLogout = (): void => {
    logout(); // Actualiza el estado global y limpia tokens
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <p>Do you wish to sign out?</p>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
