const { default: axios } = require("axios");
const { Router } = require("express");
const express = require("express");
var cron = require("node-cron");
const {
  getJobJson,
  getCategory,
  postTest,
  postPuppeteer,
} = require("../api/jobController");
const router = express.Router();
//api/job
router.route("/").get(getJobJson).post(postTest);
router.route("/puppeteer").post(postPuppeteer);

router.route("/:id").get(getCategory);
cron.schedule(" * * * * *", () => {
  axios({ method: "get", url: "http://localhost:8990/api/job/" });
  console.log("--------");
});
module.exports = router;
