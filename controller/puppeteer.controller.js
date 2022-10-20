const puppeteer = require("puppeteer");

(async () => {
  // 'CH020531029', 'INTER2021*',
  const username = myArgs[0];
  const password = myArgs[1];
  // console.log(myArgs[1]);

  const browser = await puppeteer.launch({ headless: true });
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
})();
