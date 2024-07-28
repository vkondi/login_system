/**
 * Users Router
 */

const { Router } = require("express");
const router = Router();
const usersController = require("../controllers/usersController");

router.post("/user/register", usersController.registerUser);

router.post("/user/details", usersController.getUserDetails);

module.exports = router;
