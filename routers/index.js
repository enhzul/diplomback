const Router = require("express").Router();
const { auth } = require("../middleware/auth");
Router.use("/users", require("../controller/users/router"));
Router.use("/students", require("../controller/student/router"))
Router.use("/school", require("../controller/school/router"))
module.exports = Router;