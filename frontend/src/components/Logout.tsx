import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Auth.css';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = (): void => {
    sessionStorage.removeItem("token");
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
