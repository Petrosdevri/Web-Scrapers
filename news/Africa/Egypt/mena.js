const puppeteer = require('puppeteer');

const url = 'https://www.mena.org.eg/en';

async function extract() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const news = await page.evaluate(() => {
        let newsArr = [];
        let titles = Array.from(document.querySelectorAll('div h4 a'));
        let h5Titles = Array.from(document.querySelectorAll('div h5 a'));
        let listTitles = Array.from(document.querySelectorAll('#read ul li a'));
        titles.push(...h5Titles, ...listTitles);

        for (let title of titles) {
            newsArr.push({ Title: title.innerText.trim(), Link: title.href });
        }

        return newsArr;
    });

    console.log(news);
    await browser.close();
}

extract();