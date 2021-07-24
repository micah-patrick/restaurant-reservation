exports.seed = function (knex) {
  return knex("reservations").insert([
    {
      first_name: "Anthony",
      last_name: "Anderson",
      mobile_number: "620-646-8897",
      reservation_date: "2021-07-20",
      reservation_time: "18:00",
      people: 2,
      status: "booked",
    },
    {
      first_name: "Bryan",
      last_name: "Box",
      mobile_number: "620-646-8897",
      reservation_date: "2021-07-20",
      reservation_time: "18:00",
      people: 2,
      status: "booked",
    },
    {
      first_name: "Cathy",
      last_name: "Charboneau",
      mobile_number: "620-646-8897",
      reservation_date: "2021-07-20",
      reservation_time: "18:00",
      people: 2,
      status: "booked",
    },
    {
      first_name: "Dana",
      last_name: "Drew",
      mobile_number: "620-646-8897",
      reservation_date: "2021-07-20",
      reservation_time: "18:00",
      people: 2,
      status: "booked",
    },
  ]);
};
