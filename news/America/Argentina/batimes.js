const puppeteer = require('puppeteer');

const url = 'https://www.batimes.com.ar/';

async function extract() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const news = await page.evaluate(() => {
        let newsArr = [];
        let titles = Array.from(document.querySelectorAll('article a .meta-content h2'));
        
        for (let title of titles) {
            newsArr.push({ Title: title.textContent.trim(), Link: title.parentElement.parentElement.href });
        }

        return newsArr;
    });

    console.log(news);
    await browser.close();
}

extract();