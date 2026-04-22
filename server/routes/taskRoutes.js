const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

router.post("/create", async (req, res) => {
  try {
    const { taskName, priority } = req.body;

    const assignedTo =
      priority === "High" ? "Edge" : "Cloud";

    const task = await Task.create({
      taskName,
      priority,
      assignedTo,
      status: "Running"
    });

    const io = req.app.get("io");
    io.emit("taskMigrated", task);

    res.status(201).json(task);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;