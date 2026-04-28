const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

router.post("/", async (req, res) => {
  try {
    const { taskName, priority } = req.body;

    const assignedTo = priority === "High" ? "Edge" : "Cloud";

    const task = await Task.create({
      taskName,
      priority,
      assignedTo,
      status: "Running"
    });

    const io = req.app.get("io");

    // Send new task instantly
    io.emit("taskMigrated", task);

    // Auto update after 5 seconds
    setTimeout(async () => {
      const updatedTask = await Task.findByIdAndUpdate(
        task._id,
        { status: "Completed" },
        { new: true }
      );

      io.emit("taskUpdated", updatedTask);
    }, 5000);

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

router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    const io = req.app.get("io");
    io.emit("taskDeleted", req.params.id);

    res.json({ message: "Task deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;