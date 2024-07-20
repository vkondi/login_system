const pool = require("./database");
const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 4000;

app.use(express.json());
app.use(cors());

app.post("/adduser", (req, res) => {
  console.log(req.body);

  const username = req.body?.username;
  const password = req.body?.password;

  const insertStmt = `INSERT INTO accounts ( username, password ) VALUES ( '${username}', '${password}' );`;
  pool
    .query(insertStmt)
    .then((response) => {
      console.log("Data saved");
      console.log(response);

      res.send("Response received: " + JSON.stringify(req.body));
    })
    .catch((err) => {
      console.log(err);

      res.send("Error: " + JSON.stringify(err));
    });
});

app.listen(PORT, () => console.log(`SERVER ON localhost:${PORT}`));
