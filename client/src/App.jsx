import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Dashboard from "./pages/Dashboard/Dashboard";
import RoastDisplay from "./components/RoastDisplay/RoastDisplay";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/roast" element={<RoastDisplay />} />
      </Routes>
    </div>
  );
};

export default App;
