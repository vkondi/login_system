/**
 * Users Router
 */

const { Router } = require("express");
const router = Router();
const { registerUser } = require("../controllers/usersController");

router.post("/user/register", registerUser);

module.exports = router;
