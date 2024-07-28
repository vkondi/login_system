/**
 * Users Router
 */

const { Router } = require("express");
const router = Router();
const usersController = require("../controllers/usersController");

router.post("/users", usersController.createUser);

router.get("/users/:username", usersController.getUserById);

router.get("/users", usersController.getAllUsers);

router.delete("/users/:username", usersController.deleteUser);

router.post("/users/:username", usersController.updateUser);

module.exports = router;
