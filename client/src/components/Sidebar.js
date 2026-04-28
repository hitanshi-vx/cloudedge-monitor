import React from "react";
import { Link } from "react-router-dom";
import { FaServer, FaCloud, FaBell, FaChartBar, FaExchangeAlt } from "react-icons/fa";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>EdgeCloud</h2>

      <ul>
        <li><Link to="/dashboard"><FaChartBar /> Dashboard</Link></li>
        <li><Link to="/edge"><FaServer /> Edge Nodes</Link></li>
        <li><Link to="/cloud"><FaCloud /> Cloud Servers</Link></li>
        <li><Link to="/alerts"><FaBell /> Alerts</Link></li>
        <li><Link to="/tasks"><FaExchangeAlt style={{ marginRight: "10px" }}/>Task Migration</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;