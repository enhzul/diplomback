const Router = require("express").Router();
Router.use("/users", require("./userRouter"));
Router.use("/jobs", require("./JobRouter"));
module.exports = Router;
