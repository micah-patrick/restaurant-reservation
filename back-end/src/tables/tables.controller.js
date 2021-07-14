const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}
async function listFree(req, res) {
  const capacity = res.locals.capacity;
  const data = await service.listFree(capacity);
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

  function getCapacity(req, res, next) {
    const capacity = req.query.capacity || 99999;
    res.locals.capacity = capacity;
    next();
  }

  async function tableExists(req, res, next) {
    const table = await service.read(req.params.table_id);
    if (table) {
      res.locals.table = table;
      return next();
    }
    next({
      status: 404,
      message: `Table cannot be found.`
    })
  }

  async function update(req, res, next) {
    const updatedTable = {
      ...res.locals.table,
      ...req.body.data,
    }
    const data = await service.update(updatedTable);
    res.json({ data });
  }



module.exports = {
    list: [asyncErrorBoundary(list)],
    create: [
        hasOnlyValidProperties,
        hasRequiredProperties,
        tableNameIsValid,
        capacityIsPositiveInteger,
        asyncErrorBoundary(create)
    ],
    listFree: [getCapacity, asyncErrorBoundary(listFree)],
    update: [asyncErrorBoundary(tableExists), asyncErrorBoundary(update)],
}