const { response } = require("express");
const { Pool } = require ("pg");

  const pool = new Pool({
    user: "postgres",
    password: "joel1968",
    host: "localhost",
    port: 5432,
    database: "capstone",
});






module.exports = pool;