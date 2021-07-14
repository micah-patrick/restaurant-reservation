const knex = require("../db/connection");

async function list(){
  return knex("tables")
  .select("*")
  .orderBy("table_name");
}

async function listFree(minCapacity){
  console.log(minCapacity);
  return knex("tables")
  .select("*")
  .where({reservation_id: null})
  .andWhere("capacity", ">=", minCapacity)
  .orderBy("table_name");
}

function create(table) {
    return knex("tables")
      .insert(table)
      .returning("*")
      .then((createdRecords) => createdRecords[0]);
  }

async function read(table_id){
    return knex("tables")
    .select("*")
    .where({ table_id })
    .first();
}

async function update(updatedTable){
  return knex("tables")
  .select("*")
  .where({table_id : updatedTable.table_id})
  .update(updatedTable, "*");
}

module.exports = {
    list,
    create,
    listFree,
    read,
    update,
}