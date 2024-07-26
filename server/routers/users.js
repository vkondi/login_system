/**
 * Users Router
 */

const { Router } = require("express");
const router = Router();
const usersController = require("../controllers/usersController");

router.post("/user/register", usersController.registerUser);

module.exports = router;
