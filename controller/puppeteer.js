const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://pillowspecialist.com/');
    const title = await page.title();

    console.log('Title:', title);

    await browser.close();
})();
