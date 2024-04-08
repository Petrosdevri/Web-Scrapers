const puppeteer = require('puppeteer');

const url = 'https://www.amna.gr/';

async function extract() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector('div a h2', { timeout: 15000 });
    await page.waitForSelector('div a h3', { timeout: 15000 });

    const news = await page.evaluate(() => {
        let newsArr = [];
        let titles = Array.from(document.querySelectorAll('div a h2'));
        let otherTitles = Array.from(document.querySelectorAll('div a h3'));
        titles.push(...otherTitles);
        
        for (let title of titles) {
            newsArr.push({ Title: title.textContent.trim(), Link: title.parentElement.href });
        }

        return newsArr;
    });

    console.log(news);
    await browser.close();
}

extract();