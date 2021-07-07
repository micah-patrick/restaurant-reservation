/**
 * List handler for reservation resources
 */

const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");


async function list(req, res) {
  const {date} = res.locals;
  const data = await service.list(date);
  res.json({ data });
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

function getDate(req, res, next) {
  let today = new Date();
  today = `${today.getFullYear().toString(10)}-${(today.getMonth() + 1)
    .toString(10)
    .padStart(2, "0")}-${today.getDate().toString(10).padStart(2, "0")}`;
  const date = req.query.date || today;
  res.locals.date = date;
  next();
}

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "people",
  "reservation_date",
  "reservation_time",
  "mobile_number",
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

function peopleIsPositiveInteger(req, res, next) {
  let {people} = req.body.data;

  if (people > 0 && Number.isInteger(people)) {
    return next();
  }
    return next({
      status: 400,
      message: `Invalid people field. People must be a positive integer greater than 0`
    })

}

const hasRequiredProperties = hasProperties(...VALID_PROPERTIES);

function mobileNumberIsValid(req, res, next) {
  const pattern = /^[1-9]\d{2}-\d{3}-\d{4}/;
  const {mobile_number} = req.body.data;
  if (pattern.test(mobile_number) && mobile_number.length === 12) {
    return next();
  }
  return next({
    status: 400,
    message: `mobile_number must be formatted as xxx-xxx-xxxx `,
  })
}

function dateIsValid(req, res, next) {
  const {reservation_date} = req.body.data;
  if ((new Date(reservation_date) !== "Invalid Date") && !isNaN(new Date(reservation_date)) ) {
    return next();
  }
  return next({
    status: 400,
    message: `reservation_date must be a valid date`,
  })
}

function timeIsValid(req, res, next) {
  const {reservation_time} = req.body.data;

  const pattern = /^[0-9]{2}:[0-9]{2}?(:[0-9]{2})$/;
  if (pattern.test(reservation_time)); {
      let divided = reservation_time.split(":");

      const hour = Number(divided[0]);
      const minute = Number(divided[1]);
      const seconds = Number(divided[2]) || 0;

      if (hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59 && seconds >= 0 && seconds <= 59){
        return next();
      }
  }
  return next({
    status: 400,
    message: `reservation_time must be a valid time`,
  })
}

module.exports = {
  list: [asyncErrorBoundary(getDate), asyncErrorBoundary(list)],
  create: [
    hasOnlyValidProperties, 
    hasRequiredProperties, 
    peopleIsPositiveInteger,
    mobileNumberIsValid,
    dateIsValid,
    timeIsValid,
    asyncErrorBoundary(create)
  ],
};
