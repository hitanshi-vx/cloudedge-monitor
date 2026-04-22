import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import PerformanceChart from "../components/PerformanceChart";
import socket from "../services/socket";

function Dashboard() {
  const [stats, setStats] = useState({
    cpu: 0,
    memory: 0,
    latency: 0,
    edgeNodes: 0
  });

  useEffect(() => {
    socket.on("systemUpdate", (data) => {
      setStats({
        cpu: data.cpu,
        memory: data.memory,
        latency: data.latency,
        edgeNodes: data.edgeNodes
      });
    });

    return () => {
      socket.off("systemUpdate");
    };
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div className="stats-grid">
          <StatsCard title="CPU Usage" value={`${stats.cpu}%`} />
          <StatsCard title="Memory Usage" value={`${stats.memory}%`} />
          <StatsCard title="Latency" value={`${stats.latency} ms`} />
          <StatsCard title="Edge Nodes" value={stats.edgeNodes} />
        </div>

        <PerformanceChart />
      </div>
    </div>
  );
}

export default Dashboard;