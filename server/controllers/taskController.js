const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  const { taskName, taskType, priority } = req.body;

  let assignedTo = "Cloud";

  if (priority === "High") {
    assignedTo = "Edge";
  }

  const task = await Task.create({
    taskName,
    taskType,
    priority,
    assignedTo
  });

  res.json(task);
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};