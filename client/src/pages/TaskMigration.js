import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import socket from "../services/socket";

function TaskMigration() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("High");

  // Load existing tasks
  useEffect(() => {
    fetch("http://localhost:5000/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.log("Fetch error:", error);
      });

    // Real-time new task listener
    socket.on("taskMigrated", (task) => {
      setTasks((prev) => {
        const exists = prev.some((t) => t._id === task._id);
        if (exists) return prev;
        return [task, ...prev];
      });
    });

    // Real-time status update listener
    socket.on("taskUpdated", (updatedTask) => {
      setTasks((prev) =>
        prev.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
    });

    // Real-time delete listener
    socket.on("taskDeleted", (taskId) => {
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    });

    return () => {
      socket.off("taskMigrated");
      socket.off("taskUpdated");
      socket.off("taskDeleted");
    };
  }, []);

  // Create task
  const handleCreateTask = async () => {
    if (!taskName.trim()) {
      alert("Please enter task name");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
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

      if (!response.ok) {
        throw new Error(newTask.message || "Failed to create task");
      }

      setTaskName("");
      setPriority("High");

    } catch (error) {
      console.log("Create task error:", error);
      alert("Failed to create task");
    }
  };

  // Delete task
  const handleDeleteTask = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE"
      });
    } catch (error) {
      console.log("Delete task error:", error);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <h2>Task Migration</h2>

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

        <table className="task-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Priority</th>
              <th>Assigned To</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task._id}>
                  <td>{task.taskName}</td>
                  <td>{task.priority}</td>
                  <td>{task.assignedTo}</td>
                  <td>
                      {task.status === "Running" ? (
                      <span style={{ color: "orange", fontWeight: "bold" }}>
                      🟡 Running
                      </span>
                      ) : (
                      <span style={{ color: "green", fontWeight: "bold" }}>
                      🟢 Completed
                      </span>
                      )}
                  </td>                  
                  <td><button onClick={() => handleDeleteTask(task._id)}
                    style={{
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold"
                    }}
>
                    🗑 Delete
                  </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No tasks available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskMigration;