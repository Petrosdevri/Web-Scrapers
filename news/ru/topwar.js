const puppeteer = require('puppeteer');

const url = 'https://en.topwar.ru/';

async function extract() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);

    try {
        await page.waitForSelector('.item-link', { timeout: 60000 });

        const news = await page.evaluate(() => {
            let newsArr = [];
            let titles = Array.from(document.querySelectorAll('.item-link'));

            for (const title of titles) {
                newsArr.push({ Title: title.textContent.trim(), Link: title.href });
            }

            return newsArr;
        });

        console.log(news);
    } catch (error) {
        console.log('Error:', error);
    } finally {
        await browser.close();
    }
}

extract();