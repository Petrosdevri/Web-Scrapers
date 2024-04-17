const puppeteer = require('puppeteer');

const url = 'https://www.laprensani.com/';

async function extract() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const news = await page.evaluate(() => {
        let newsArr = [];
        let titles = Array.from(document.querySelectorAll('header h3 a'));
        let h2Titles = Array.from(document.querySelectorAll('h2 a'));
        let h4Titles = Array.from(document.querySelectorAll('h4 a'));
        let h5Titles = Array.from(document.querySelectorAll('h4 a'));
        titles.push(...h2Titles, ...h4Titles, ...h5Titles);
        
        for (let title of titles) {
            newsArr.push({ Title: title.textContent.trim(), Link: title.href });
        }

        return newsArr;
    });

    console.log(news);
    await browser.close();
}

extract();