/**
 * Auth router
 */

const { Router } = require("express");
const router = Router();
const authController = require("../controllers/authController");

router.post("/auth/login", authController.login);

module.exports = router;