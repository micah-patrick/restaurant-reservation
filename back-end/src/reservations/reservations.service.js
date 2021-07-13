const knex = require("../db/connection");

async function list(date){
    return knex("reservations")
    .select("*")
    .where({reservation_date: date})
    .orderBy("reservation_time");
}

function create(reservation) {
    return knex("reservations")
      .insert(reservation)
      .returning("*")
      .then((createdRecords) => createdRecords[0]);
  }

function read(reservation_id) {
    return knex("reservations")
    .select("*")
    .where({reservation_id})
    .first();
}

module.exports = {
    list,
    create,
    read,
}