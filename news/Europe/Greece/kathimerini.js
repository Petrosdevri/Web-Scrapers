const puppeteer = require('puppeteer');

const url = 'https://www.kathimerini.gr/';

async function extract() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const news = await page.evaluate(() => {
        let newsArr = [];
        let titles = Array.from(document.querySelectorAll('.media-content a'));
        
        for (const title of titles) {
            newsArr.push({ Title: title.innerText, Link: title.href });
        }

        return newsArr;
    });

    console.log(news);
    await browser.close();
}

extract();