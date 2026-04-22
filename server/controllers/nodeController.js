const Node = require("../models/Node");

exports.getNodes = async (req, res) => {
  const nodes = await Node.find();
  res.json(nodes);
};