const puppeteer = require('puppeteer');

const url = 'https://www.elkosmos.gr/';

async function extract() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const news = await page.evaluate(() => {
        let newsArr = [];
        let titles = Array.from(document.querySelectorAll('h3 a'));
        
        for (const title of titles) {
            newsArr.push({ Title: title.textContent, Link: title.href });
        }

        return newsArr;
    });

    console.log(news);
    await browser.close();
}

extract();