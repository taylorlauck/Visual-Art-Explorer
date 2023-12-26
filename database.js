const { response } = require("express");
const { Pool } = require ("pg");

  const pool = new Pool({
    user: "postgres",
    password: "shhhh",
    host: "localhost",
    port: 5432,
    database: "capstone",
});






module.exports = pool;