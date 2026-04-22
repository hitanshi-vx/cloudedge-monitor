import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="overlay">
        <h1>Hybrid Cloud Data Center Monitoring</h1>
        <p>
          Monitor cloud servers, edge nodes, system performance,
          and real-time alerts in one platform.
        </p>

        <div className="home-buttons">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default Home;