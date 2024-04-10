const puppeteer = require('puppeteer');

const url = 'https://www.granma.cu/';

async function extract() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { timeout: 120000, waitUntil: 'networkidle0' });
    await page.waitForSelector('div h2 a', { timeout: 15000 });
    await page.waitForSelector('div h4 a', { timeout: 15000 });

    const news = await page.evaluate(() => {
        let newsArr = [];
        let titles = Array.from(document.querySelectorAll('div h2 a'));
        let otherTitles = Array.from(document.querySelectorAll('div h4 a'));
        titles.push(...otherTitles);
        
        for (let title of titles) {
            newsArr.push({ Title: title.textContent.trim(), Link: title.href });
        }

        return newsArr;
    });

    console.log(news);
    await browser.close();
}

extract();