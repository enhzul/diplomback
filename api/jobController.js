const { login, getJson, getjob } = require("../api/login");
const puppeteer = require("puppeteer");

const dboperation = require("../dboperation");

exports.getJobJson = async (req, res, next) => {
  const jsonList = [];
  const token = await dboperation.getRole();
  for (let i = 0; i < token.length; i++) {
    const loginId = token[i];
    const accessToken = await login(loginId);
    const job = await getJson(accessToken);
    Object.values(job.data).forEach(async (obj) => {
      if (obj.State !== "Running") {
        const job_where = await dboperation.getjob(obj.Id);
        if (job_where[0] === 0) {
          const add = await dboperation.insert({ obj: obj, id: job.auth_id });
          jsonList.push(job.data);
        }
      }
    });
  }
  res.status(200).json({
    success: true,
    data: { jsonList: jsonList },
    user: req.userId,
  });
};

exports.getCategory = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: `${req.params.id} id huselt`,
  });
};

exports.postTest = async (req, res, next) => {
  let order = { ...req.body };
  console.log("data--------: ", order);
  res.status(200).json({
    success: true,
    data: order,
  });
};

exports.postPuppeteer = async (req, res, next) => {
  let param = { ...req.body };
  console.log(param.username);
  const username = param.username;
  const password = param.password;
  let token = [];
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setViewport({ width: 1200, height: 800 });

  await page.setRequestInterception(true);

  page.on("request", (request) => {
    if (
      (request.method() == "POST") &
      (request.url() == "https://egolomt.mn/api/auth/login?language=mn")
    ) {
      const obj = JSON.parse(request.postData());
      // console.log('>>', request.method(), request.url(), obj.body.password)
      console.log(obj.body.password);
      token.push(obj.body.password);
    }

    request.continue();
  });

  // page.on('response', (response) => {
  //     console.log('<<', response.status(), response.url())
  // })

  await page.goto("https://egolomt.mn/", { waitUntil: "networkidle2" });
  await new Promise((resolve) => setTimeout(resolve, 5000));
  await page.waitForSelector("input[name=username]");
  await page.type("input[name=username]", username);
  // 'CH020531029', 'INTER2021*',
  await page.waitForSelector("input[name=password]");
  await page.type("input[name=password]", password);
  // await page.$eval('input[name=password]', el => el.value = 'testt ');

  // await new Promise(resolve => setTimeout(resolve, 5000));
  await page.click('button[type="submit"]');

  // await new Promise(resolve => setTimeout(resolve, 10000));
  // await page.screenshot({ path: 'screenshot.png' })

  await browser.close();
  res.status(200).json({
    success: true,
    data: token,
  });
};
