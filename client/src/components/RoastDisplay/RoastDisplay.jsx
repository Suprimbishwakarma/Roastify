import React from "react";
import "./RoastDisplay.css";
import { useNavigate } from "react-router-dom";
import Dashboard from "../../pages/Dashboard/Dashboard";

const RoastDisplay = ({ roast, onReset }) => {
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    if (onReset) onReset();
    navigate("/dashboard");
  };

  return (
    <div className="roast-display">
      <div className="roast-card">
        <div className="roast-header">
          <h2>Your Roast</h2>
          <span className="roast-badge">{roast.metadata?.type}</span>
        </div>
        <div className="roast-content">
          <p>{roast.roast}</p>
        </div>
      </div>
      <button onClick={handleClick} className="dashboard-btn">
        Dashboard
      </button>
    </div>
  );
};

export default RoastDisplay;
