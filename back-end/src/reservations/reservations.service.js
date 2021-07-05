const knex = require("../db/connection");

async function list(){
    return knex("reservations")
    .select("*");
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