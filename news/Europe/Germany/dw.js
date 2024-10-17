const puppeteer = require('puppeteer');

const url = 'https://www.dw.com/en/top-stories/s-9097';

async function extract() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const news = await page.evaluate(() => {
        let newsArr = [];
        let titles = Array.from(document.querySelectorAll('.ts-teaser-title h3 a, .news-title h3 a'));
        
        for (let title of titles) {
            newsArr.push({ Title: title.textContent.trim(), Link: title.href });
        }

        return newsArr;
    });

    console.log(news);
    await browser.close();
}

extract();