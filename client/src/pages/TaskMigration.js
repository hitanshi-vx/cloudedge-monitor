import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import socket from "../services/socket";

function TaskMigration() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("High");

  // Load tasks from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.log("Fetch error:", error);
      });

    // Real-time socket listener
    socket.on("taskMigrated", (task) => {
      setTasks((prev) => {
        const oldTasks = Array.isArray(prev) ? prev : [];

        const exists = oldTasks.some((t) => t._id === task._id);

        if (exists) return oldTasks;

        return [task, ...oldTasks];
      });
    });

    return () => {
      socket.off("taskMigrated");
    };
  }, []);

  // Create task
  const handleCreateTask = async () => {
    if (!taskName.trim()) {
      alert("Please enter task name");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/tasks/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          taskName,
          priority
        })
      });

      const newTask = await response.json();

      setTasks((prev) => {
        const oldTasks = Array.isArray(prev) ? prev : [];
        return [newTask, ...oldTasks];
      });

      setTaskName("");
      setPriority("High");

    } catch (error) {
      console.log("Create task error:", error);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <h2>Task Migration</h2>

        {/* Create Task Form */}
        <div className="task-form">
          <input
            type="text"
            placeholder="Enter task name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="High">High Priority</option>
            <option value="Low">Low Priority</option>
          </select>

          <button type="button" onClick={handleCreateTask}>
            Create Task
          </button>
        </div>

        {/* Task Table */}
        <table className="task-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Priority</th>
              <th>Assigned To</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <tr key={index}>
                  <td>{task.taskName}</td>
                  <td>{task.priority}</td>
                  <td>{task.assignedTo}</td>
                  <td>{task.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No tasks available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskMigration;