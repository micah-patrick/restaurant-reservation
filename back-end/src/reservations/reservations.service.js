const knex = require("../db/connection");

async function list(date){
    return knex("reservations")
    .select("*")
    .where({reservation_date: date});
}

function create(reservation) {
    return knex("reservations")
      .insert(reservation)
      .returning("*")
      .then((createdRecords) => createdRecords[0]);
  }

module.exports = {
    list,
    create,
}