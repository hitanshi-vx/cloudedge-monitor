import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import socket from "../services/socket";

function EdgeNodes() {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    socket.on("nodeStatus", (data) => {
      setNodes((prev) => {
        const filtered = prev.filter(item => item.node !== data.node);
        return [...filtered, data];
      });
    });

    return () => socket.off("nodeStatus");
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="main-content">
        <h2>Edge Nodes</h2>

        {nodes.length === 0 ? (
          <p>No node data available</p>
        ) : (
          nodes.map((node, index) => (
            <div key={index} className="stats-card">
              <h3>{node.node}</h3>
              <p>Status: {node.status}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default EdgeNodes;