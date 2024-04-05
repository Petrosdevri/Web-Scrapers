const puppeteer = require('puppeteer');

const url = 'https://www.karfitsa.gr/';

async function extract() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const news = await page.evaluate(() => {
        let newsArr = [];
        let titles = Array.from(document.querySelectorAll('.info'));
        
        for (let title of titles) {
            let titleElement = title.querySelector('.title-post');
            let linkElement = title.querySelector('a');            
            newsArr.push({ Title: title.innerHTML.trim(), Link: title.href });
        }

        return newsArr;
    });

    console.log(news);
    await browser.close();
}

extract();