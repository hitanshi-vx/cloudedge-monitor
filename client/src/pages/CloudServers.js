import React from "react";
import Sidebar from "../components/Sidebar";

function CloudServers() {
  const servers = [
    { name: "Cloud Server 1", load: "60%", storage: "500GB" },
    { name: "Cloud Server 2", load: "48%", storage: "1TB" }
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <h2>Cloud Servers</h2>
        {servers.map((server, index) => (
          <div className="stats-card" key={index}>
            <h3>{server.name}</h3>
            <p>Load: {server.load}</p>
            <p>Storage: {server.storage}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CloudServers;