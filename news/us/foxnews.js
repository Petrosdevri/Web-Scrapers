const puppeteer = require('puppeteer');

const url = 'https://www.foxnews.com/';

async function extract() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const news = await page.evaluate(() => {
        let newsArr = [];
        let titles = Array.from(document.querySelectorAll('.title a'));
        
        for (let title of titles) {
            newsArr.push({ Title: title.textContent.trim(), Link: title.href });
        }

        return newsArr;
    });

    await browser.close();
    console.log(news);
}

extract();