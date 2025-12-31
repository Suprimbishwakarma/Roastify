import React from "react";
import "./LoadingSpinner.css";
import { LuLoaderPinwheel } from "react-icons/lu";

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="loading">
      <LuLoaderPinwheel className="loader" />
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
