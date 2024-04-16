const puppeteer = require('puppeteer');

const url = 'https://www.bolpress.com/';

async function extract() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const news = await page.evaluate(() => {
        let newsArr = [];
        let titles = Array.from(document.querySelectorAll('div h1 a'));
        let h2Titles = Array.from(document.querySelectorAll('div h2 a')); 
        let h3Titles = Array.from(document.querySelectorAll('div h3 a'));
        titles.push(...h2Titles, ...h3Titles);
        
        for (let title of titles) {
            newsArr.push({ Title: title.textContent.trim(), Link: title.href });
        }

        return newsArr;
    });

    console.log(news);
    await browser.close();
}

extract();