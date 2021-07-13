const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

async function create(req, res) {
    const data = await service.create(req.body.data);
    res.status(201).json({ data });
  }

  const VALID_PROPERTIES = [
    "table_name",
    "capacity",
  ];

  function hasOnlyValidProperties(req, res, next) {
    const { data = {} } = req.body;
  
    const invalidFields = Object.keys(data).filter(
      (field) => !VALID_PROPERTIES.includes(field)
    );
  
    if (invalidFields.length) {
      return next({
        status: 400,
        message: `Invalid field(s): ${invalidFields.join(", ")}`,
      });
    }
    next();
  }

  const hasRequiredProperties = hasProperties(...VALID_PROPERTIES);

  function tableNameIsValid(req, res, next) {
      const {table_name} = req.body.data;
      const length = table_name.length;

      if (length >= 2) {
        return next();
      }
        return next({
          status: 400,
          message: `Invalid table_name field. table_name must be at least 2 characters long`
        })
  }

  function capacityIsPositiveInteger(req, res, next) {
    let {capacity} = req.body.data;
  
    if (capacity > 0 && Number.isInteger(capacity)) {
      return next();
    }
      return next({
        status: 400,
        message: `Invalid capacity field. Capacity must be a positive integer greater than 0`
      })
  }

module.exports = {
    list: [asyncErrorBoundary(list)],
    create: [
        hasOnlyValidProperties,
        hasRequiredProperties,
        tableNameIsValid,
        capacityIsPositiveInteger,
        asyncErrorBoundary(create)
    ]
}