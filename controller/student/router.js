const express = require("express");
const studentController = require("../../controller/student/studentController");
const { auth } = require("../../middleware/auth");
const { can, roles: r } = require("../../middleware/access");
const router = express.Router();

const { studentOne, studentAll, updateStudent } = studentController;

router.get("/",studentAll).put("/:id", updateStudent);
router.get("/:id", studentOne);

// router.post("/login", login);
module.exports = router;