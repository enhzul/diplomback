const express = require("express");
const userController = require("../../controller/users/userController");
const { auth } = require("../../middleware/auth");
const { can, roles: r } = require("../../middleware/access");
const router = express.Router();

const { getUsers,getUser, createUser, login, refToken} = userController;

router.get("/",auth, getUsers).post("/",createUser).get("/:id", getUser);;
router.get("/reftoken", refToken);
router.post("/login", login);
module.exports = router;