import React, { useState } from "react";
import API from "../services/api";

function TaskForm() {
  const [task, setTask] = useState({
    taskName: "",
    taskType: "",
    priority: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/tasks", task);
      console.log(response.data);
      alert("Task Created");

      setTask({
        taskName: "",
        taskType: "",
        priority: ""
      });

    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Task Name"
        value={task.taskName}
        onChange={(e) =>
          setTask({ ...task, taskName: e.target.value })
        }
      />

      <input
        placeholder="Task Type"
        value={task.taskType}
        onChange={(e) =>
          setTask({ ...task, taskType: e.target.value })
        }
      />

      <select
        value={task.priority}
        onChange={(e) =>
          setTask({ ...task, priority: e.target.value })
        }
      >
        <option value="">Select Priority</option>
        <option value="High">High</option>
        <option value="Low">Low</option>
      </select>

      <button type="submit">Create Task</button>
    </form>
  );
}

export default TaskForm;