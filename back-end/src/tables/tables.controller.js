const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

async function create(req, res) {
    const data = await service.create(req.body.data);
    res.status(201).json({ data });
  }

module.exports = {
    create: [asyncErrorBoundary(create)]
}