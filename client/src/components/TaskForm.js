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
    await API.post("/tasks", task);
    alert("Task Created");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Task Name"
        onChange={(e) => setTask({...task, taskName: e.target.value})}
      />
      <input
        placeholder="Task Type"
        onChange={(e) => setTask({...task, taskType: e.target.value})}
      />
      <select
        onChange={(e) => setTask({...task, priority: e.target.value})}
      >
        <option>Select Priority</option>
        <option>High</option>
        <option>Low</option>
      </select>
      <button type="submit">Create Task</button>
    </form>
  );
}

export default TaskForm;