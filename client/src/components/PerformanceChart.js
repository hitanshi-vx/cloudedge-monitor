import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import socket from "../services/socket";

function PerformanceChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    socket.on("systemUpdate", (newData) => {
      setChartData((prev) => [
        ...prev.slice(-9),
        {
          time: new Date().toLocaleTimeString(),
          cpu: newData.cpu
        }
      ]);
    });

    return () => {
      socket.off("systemUpdate");
    };
  }, []);

  return (
    <div className="chart-container">
      <h3>Real-Time CPU Usage</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="cpu"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PerformanceChart;