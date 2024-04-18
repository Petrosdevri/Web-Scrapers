const puppeteer = require('puppeteer');

const url = 'https://www.telesurenglish.net/';

async function extract() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const news = await page.evaluate(() => {
        let newsArr = [];
        let titles = Array.from(document.querySelectorAll('div h2 a'));
        let h3Titles = Array.from(document.querySelectorAll('div h3 a'));
        let h4Titles = Array.from(document.querySelectorAll('div h4 a'));
        let linkTitles = Array.from(document.querySelectorAll('.titleBoxHome a'));
        titles.push( ...h3Titles, ...h4Titles, ...linkTitles);
        
        for (let title of titles) {
            newsArr.push({ Title: title.innerText.trim(), Link: title.href });
        }

        return newsArr;
    });

    console.log(news);
    await browser.close();
}

extract();