const puppeteer = require('puppeteer');

const url = 'https://news.gab.com/';

async function extract() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { timeout: 300000 });

    const news = await page.evaluate(() => {
        let newsArr = [];
        let titles = Array.from(document.querySelectorAll('.entry-title a'));
        
        for (let title of titles) {
            newsArr.push({ Title: title.textContent.trim(), Link: title.href });
        }

        return newsArr;
    });

    console.log(news);
    await browser.close();
}

extract();