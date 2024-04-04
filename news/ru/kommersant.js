const puppeteer = require('puppeteer');

const url = 'https://www.kommersant.ru/';

async function extract() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    try {
        const news = await page.evaluate(() => {
            let newsArr = [];
            let titles = Array.from(document.querySelectorAll('div h2 a'));
            // let linkTitles = Array.from(document.querySelectorAll('.textLink'));
            // titles.push(...linkTitles);
    
            for (let title of titles) {
                newsArr.push({ Title: title.innerText.trim(), Link: title.href });
            }
    
            return newsArr;
        });
    
        console.log(news);
        await browser.close();
    } catch (error) {
        console.log('Error:', error);
    } 
}

extract();