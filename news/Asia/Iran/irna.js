const puppeteer = require('puppeteer');

const url = 'https://en.irna.ir/';

async function extract() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector(('.desc h3 a'), { timeout: 15000 });

    const news = await page.evaluate(() => {
        let newsArr = [];
        let titles = Array.from(document.querySelectorAll('.desc h3 a'));
        
        for (let title of titles) {
            newsArr.push({ Title: title.innerText.trim(), Link: title.href });
        }

        return newsArr;
    });

    console.log(news);
    await browser.close();
}

extract();