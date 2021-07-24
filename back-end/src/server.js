const { PORT = 5000 } = process.env;

const app = require("./app");
const knex = require("./db/connection");

app.listen(PORT, listener);

function listener() {
  console.log(`Listening on Port ${PORT}!`);
}
