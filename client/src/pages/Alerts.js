import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import socket from "../services/socket";

function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    socket.on("newAlert", (alert) => {
      setAlerts((prev) => [alert, ...prev]);
    });

    return () => socket.off("newAlert");
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="main-content">
        <h2>System Alerts</h2>

        {alerts.length === 0 ? (
          <p>No alerts available</p>
        ) : (
          alerts.map((alert, index) => (
            <div key={index} className="alert-box">
              <h4>{alert.level} Alert</h4>
              <p>{alert.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Alerts;