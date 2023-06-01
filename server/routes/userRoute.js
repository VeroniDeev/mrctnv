const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.route("/user/")
	.get(userController.getUser)
	.post(userController.createUser);

router.route("/:id").post(userController.logUser);

router.route("/ah").post(userController.login);

module.exports = router;
