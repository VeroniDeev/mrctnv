const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.route("").post(adminController.login);
router.route("/create").post(adminController.create);

module.exports = router;
