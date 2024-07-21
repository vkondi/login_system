require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { initializeDatabase, pool } = require("./db/database");
const usersRoutes = require("./routers/users");

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());
app.use(usersRoutes);

initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`SERVER STARTED on localhost:${PORT}`);
  });
});
