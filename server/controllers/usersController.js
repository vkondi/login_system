/**
 * Users controller
 */

const { pool } = require("../db/database");

const registerUser = async (req, res) => {
  const username = req.body?.username;
  const password = req.body?.password;
  const name = req.body?.name;

  if (username && password && name) {
    // Check for existing user with same username
    const existingUsername = await pool.query(
      "SELECT * from accounts where username=$1",
      [username]
    );
    if (existingUsername.rows.length) {
      return res.status(200).json({
        message: "error",
        error: "Record with the username already exists",
      });
    }

    // Insert record into DB
    const insertStmt = `INSERT INTO accounts (username, password, name) VALUES ($1, $2, $3);`;
    pool
      .query(insertStmt, [username, password, name])
      .then((response) => {
        res
          .status(200)
          .json({ message: "success", data: JSON.stringify(response) });
      })
      .catch((err) => {
        console.log(err);
        res.status(200).json({ message: "error", error: JSON.stringify(err) });
      });
  } else {
    res.status(200).json({
      message: "error",
      error: "Either username, password or name is missing",
    });
  }
};

module.exports = {
  registerUser,
};