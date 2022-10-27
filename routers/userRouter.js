const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();

const { getEvents } = userController;

router.get("/getUser", getEvents);

module.exports = router;
