import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { roastAPI, spotifyAPI } from "../../utils/api";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import MusicStats from "../../components/MusicStats/MusicStats";
import RoastDisplay from "../../components/RoastDisplay/RoastDisplay";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [roast, setRoast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [roastType, setRoastType] = useState("medium");
  const [error, setError] = useState(null);

  useEffect(() => {
    // check if there is a token in the URL (from login redirect)
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      // save it to local storage
      localStorage.setItem("token", token);

      // clean the URL so the token doesn't stay visible
      window.history.replaceState({}, document.title, "/dashboard");
    }

    // Now fetch data
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await spotifyAPI().getUserData();
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to load your Spotify data!");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // clear the token from local storage
    localStorage.removeItem("token");
    // redirect back to the landing page
    window.location.href = "/";
  };

  const generateRoast = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await roastAPI().generateRoast(userData, roastType);
      setRoast(response.data);
    } catch (error) {
      console.error("Error generating roast:", error);
      setError(error.response?.data?.error || "Failed to generate roast!");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !userData) {
    return <LoadingSpinner message="Loading your spotify data..." />;
  }

  if (!userData) {
    return <div className="error-state">Failed to load data!</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>🎼 YOUR MUSIC PROFILE</h1>
        <div className="user">
          {userData.user && (
            <div className="user-info">
              {userData.user.images?.[0] && (
                <img
                  src={userData.user.images[0].url}
                  alt="Profile"
                  className="profile-pic"
                />
              )}
              <span>{userData.user.display_name}</span>
            </div>
          )}
          <button className="logout-btn" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </header>

      {error && <div className="error-message">{error}</div>}

      {!roast ? (
        <>
          <MusicStats userData={userData} />
          <div className="roast-controls">
            <div className="fire">🔥</div>
            <h2>READY TO GET ROASTED?</h2>
            <div className="roast-type-selector">
              <button
                className={roastType === "gentle" ? "active" : ""}
                onClick={() => setRoastType("gentle")}
              >
                😀 Gentle
              </button>
              <button
                className={roastType === "medium" ? "active" : ""}
                onClick={() => setRoastType("medium")}
              >
                🔥 Medium
              </button>
              <button
                className={roastType === "brutal" ? "active" : ""}
                onClick={() => setRoastType("brutal")}
              >
                ☠️ Brutal
              </button>
            </div>
            <button
              className="generate-roast-btn"
              onClick={generateRoast}
              disabled={loading}
            >
              {loading ? "Generating..." : "Roast Me"}
            </button>
          </div>
        </>
      ) : (
        <RoastDisplay roast={roast} onReset={() => setRoast(null)} />
      )}
    </div>
  );
};

export default Dashboard;
