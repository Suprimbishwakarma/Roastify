import React from "react";
import "./Landing.css";
import { spotifyAPI } from "../../utils/api";

const Landing = () => {
  return (
    <div className="hero-section">
      <div className="fire-emoji">🔥</div>
      <h1 className="main-title">Roastify</h1>
      <p className="tagline">
        Get roasted based on your Spotify listening habits!
      </p>
      <button
        className="spotify-login-btn"
        onClick={() => spotifyAPI().login()}
      >
        Roast My Music Taste
      </button>
      <p className="privacy-note">
        🔒 We only read your Spotify data for roasting purposes. We do not edit
        or modify any personal information.
      </p>
    </div>
  );
};

export default Landing;
