const puppeteer = require('puppeteer');

const url = 'https://www.oann.com/';

async function extract() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const news = await page.evaluate(() => {
        let newsArr = [];
        let titles = Array.from(document.querySelectorAll('.entry-title a'));
        let listTitles = Array.from(document.querySelectorAll('.lcp_catlist li a'))
        titles.push(...listTitles);
        
        for (let title of titles) {
            newsArr.push({ Title: title.textContent.trim(), Link: title.href });
        }

        return newsArr;
    });

    console.log(news);
    await browser.close();
}

extract();