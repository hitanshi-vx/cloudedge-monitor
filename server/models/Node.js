const mongoose = require("mongoose");

const nodeSchema = new mongoose.Schema({
  nodeName: String,
  type: String,
  location: String,
  cpuUsage: Number,
  latency: Number,
  status: String
});

module.exports = mongoose.model("Node", nodeSchema);