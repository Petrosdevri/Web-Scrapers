const puppeteer = require('puppeteer');

const url = 'https://www.theepochtimes.com/';

async function extract() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const news = await page.evaluate(() => {
        let newsArr = [];
        let titles = Array.from(document.querySelectorAll('a h3'));
        
        for (let title of titles) {
            newsArr.push({ Title: title.textContent.trim(), Link: title.parentNode.href });
        }

        return newsArr;
    });

    console.log(news);
    await browser.close();
}

extract();