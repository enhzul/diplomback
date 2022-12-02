const express = require("express");
const schoolController = require("../../controller/school/Controller");
const { auth } = require("../../middleware/auth");
const { can, roles: r } = require("../../middleware/access");
const router = express.Router();

const { mergejilList, mergejilCount, ListStudent} = schoolController;
router.get("/", mergejilList);
router.get("/count", mergejilCount);
router.get("/list", ListStudent);


// router.post("/login", login);
module.exports = router;