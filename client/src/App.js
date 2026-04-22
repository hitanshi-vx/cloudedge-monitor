import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import EdgeNodes from "./pages/EdgeNodes";
import CloudServers from "./pages/CloudServers";
import Alerts from "./pages/Alerts";
import TaskMigration from "./pages/TaskMigration";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edge" element={<EdgeNodes />} />
        <Route path="/cloud" element={<CloudServers />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/tasks" element={<TaskMigration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;