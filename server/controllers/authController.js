/**
 * Auth controller
 */

const { pool } = require("../db/database");
const CONSTANTS = require("../utils/Constants");
const { sleep } = require("../utils/utils");
const logger = require("../utils/logger");

const login = async (req, res) => {
  logger.info("[authController] >> [login]");
  
  const username = req.body?.username;
  const password = req.body?.password;

  // TODO: added custom delay. TO be removed later.
  await sleep(3000);

  // Check record with username
  const userRecord = await pool.query(
    "SELECT * from accounts where username=$1",
    [username]
  );

  if (userRecord.rowCount) {
    const record = userRecord.rows?.[0];

    if (record?.password === password) {
      res.status(200).json({
        status: CONSTANTS.SUCCESS_STATUS,
        message: "success"
      });
    } else {
      res.status(200).json({
        status: CONSTANTS.FAILURE_STATUS,
        message: "Wrong password",
      });
    }
  } else {
    res.status(200).json({
      status: CONSTANTS.FAILURE_STATUS,
      message: "There is no user with the given username",
    });
  }
};

module.exports = {
  login,
};
