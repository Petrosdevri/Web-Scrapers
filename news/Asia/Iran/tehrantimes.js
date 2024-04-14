const puppeteer = require('puppeteer');

const url = 'https://www.tehrantimes.com/';

async function extract() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const news = await page.evaluate(() => {
        let newsArr = [];
        let titles = Array.from(document.querySelectorAll('.news h3 a'));
        
        for (let title of titles) {
            newsArr.push({ Title: title.innerText.trim(), Link: title.href });
        }

        return newsArr;
    });

    console.log(news);
    await browser.close();
}

extract();