const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://instagram.com/rocketseat_oficial');

  const imgList = await page.evaluate(() => {
    const nodeList = document.querySelectorAll('article img');

    const imgArray = [...nodeList];

    const imgList = imgArray.map(({ src }) => ({
      src,
    }));

    return imgList;
  });

  await fs.promises.writeFile(
    'instagram.json',
    JSON.stringify(imgList, null, 2)
  );

  await browser.close();
})();
