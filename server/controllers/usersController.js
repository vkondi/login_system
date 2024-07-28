/**
 * Users controller
 */

const { pool } = require("../db/database");
const CONSTANTS = require("../utils/Constants");
const logger = require("../utils/logger");

const createUser = async (req, res) => {
  logger.info("[userController] >> [createUser]");

  const username = req.body?.username;
  const password = req.body?.password;
  const name = req.body?.name;

  if (username && password && name) {
    // Check for existing user with same username
    const { rowCount } = await pool.query(
      "SELECT * from accounts where username=$1",
      [username]
    );
    if (rowCount) {
      return res.status(200).json({
        message: "error",
        error: "Record with the username already exists",
      });
    }

    // Insert record into DB
    const insertStmt = `INSERT INTO accounts (username, password, name) VALUES ($1, $2, $3);`;
    pool
      .query(insertStmt, [username, password, name])
      .then(() => {
        res
          .status(200)
          .json({ status: CONSTANTS.SUCCESS_STATUS, message: "success" });
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

const getUserById = async (req, res) => {
  logger.info("[userController] >> [getUserById]");

  const username = req.params?.username;

  // Check record with username
  const { rowCount, rows } = await pool.query(
    "SELECT * from accounts where username=$1",
    [username]
  );

  if (rowCount) {
    const record = rows?.[0];

    res.status(200).json({
      status: CONSTANTS.SUCCESS_STATUS,
      message: "success",
      data: { name: record?.name, username: record?.username },
    });
  } else {
    res.status(200).json({
      status: CONSTANTS.FAILURE_STATUS,
      message: "Failed to find user with the given username",
    });
  }
};

const getAllUsers = async (req, res) => {
  logger.info("[userController] >> [getAllUsers]");

  // Check record with username
  const { rowCount, rows } = await pool.query("SELECT * from accounts");

  if (rowCount) {
    const record = rows?.[0];

    res.status(200).json({
      status: CONSTANTS.SUCCESS_STATUS,
      message: "success",
      data: rows.map((rec) => ({ name: rec?.name, username: rec?.username })),
    });
  } else {
    res.status(200).json({
      status: CONSTANTS.FAILURE_STATUS,
      message: "Failed to find user with the given username",
    });
  }
};

const deleteUser = async (req, res) => {
  logger.info("[userController] >> [deleteUser]");

  const username = req.params?.username;

  // Check record with username
  const { rowCount, rows } = await pool.query(
    "DELETE from accounts where username=$1",
    [username]
  );

  if (rowCount) {
    res.status(200).json({
      status: CONSTANTS.SUCCESS_STATUS,
      message: `User \'${username}\' deleted successfully`,
    });
  } else {
    res.status(200).json({
      status: CONSTANTS.FAILURE_STATUS,
      message: `User \'${username}\' does not exist`,
    });
  }
};

const updateUser = async (req, res) => {
  logger.info("[userController] >> [updateUser]");

  const username = req.params?.username;
  const name = req.body?.name;

  if (username && name) {
    // Check for existing user with same username
    const { rowCount } = await pool.query(
      "UPDATE accounts SET name=$1 where username=$2",
      [name, username]
    );

    if (rowCount) {
      res.status(200).json({
        status: CONSTANTS.SUCCESS_STATUS,
        message: `User \'${username}\' updated successfully`,
      });
    } else {
      res.status(200).json({
        status: CONSTANTS.FAILURE_STATUS,
        message: `User \'${username}\' not found`,
      });
    }
  } else {
    res.status(200).json({
      message: "error",
      error: "Name is missing",
    });
  }
};

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  deleteUser,
  updateUser,
};
