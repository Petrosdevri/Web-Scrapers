const puppeteer = require('puppeteer');

const url = 'https://www.ethnos.gr/';

async function extract() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const news = await page.evaluate(() => {
        let newsArr = [];
        let titles = Array.from(document.querySelectorAll('.title'));
        let singleTitles = Array.from(document.querySelectorAll('.single-title'));
        titles.push(...singleTitles);
        
        for (const title of titles) {
            newsArr.push({ Title: title.innerText.trim(), Link: title.href });
        }

        return newsArr;
    });

    console.log(news);
    await browser.close();
}

extract();