const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskName: String,
  priority: String,
  assignedTo: String,
  status: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Task", taskSchema);