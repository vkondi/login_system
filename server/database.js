const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "admin",
  host: "localhost",
  port: 5432,
  database: "login_system"
});

// const createTableQuery = `CREATE TABLE ACCOUNTS (
// 	USER_ID SERIAL PRIMARY KEY,
// 	USERNAME VARCHAR(50) UNIQUE NOT NULL,
// 	PASSWORD VARCHAR(50) UNIQUE NOT NULL
// );`;

// pool
//   .query(createTableQuery)
//   .then((res) => {
//     console.log("table created");
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log("database not created");
//     console.log(err);
//   });

module.exports = pool;
