const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const pug = require('pug');
const puppeteer = require('puppeteer');

const app = express();

app.set('view engine', 'pug');

const staticPath = path.join(__dirname, 'views');
app.use(express.static(staticPath));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/gr', (req, res) => {
    res.render('countries/gr');
});

app.get('/ru', (req, res) => {
    res.render('countries/ru');
});

app.get('/us', (req, res) => {
    res.render('countries/us');
});

app.get('/elkosmos', async (req, res) => {
    try {
        const url = 'https://www.elkosmos.gr';
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const news = await page.evaluate(() => {
            let titles = Array.from(document.querySelectorAll('h3 a'));
            return titles.map(title => ({
                title: title.textContent.trim(),
                link: title.href
            }));
        });

        await browser.close();
        res.render('Europe/Greece/elkosmos', { news });
    } catch (error) {
        console.error('Error scraping El. Kosmos:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/estia', async (req, res) => {
    try {
        const url = 'https://www.estianews.gr';
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const news = await page.evaluate(() => {
            let titles = Array.from(document.querySelectorAll('h4 a'));
            return titles.map(title => ({
                title: title.textContent.trim(),
                link: title.href
            }));
        });

        await browser.close();
        res.render('Europe/Greece/estia', { news });
    } catch (error) {
        console.error('Error scraping Estia:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/ethnos', async (req, res) => {
    try {
        const url = 'https://www.ethnos.gr';
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const news = await page.evaluate(() => {
            let titles = Array.from(document.querySelectorAll('.title'));
            let singleTitles = Array.from(document.querySelectorAll('.single-title'));
            titles.push(...singleTitles);
            return titles.map(title => ({
                title: title.innerText.trim(),
                link: title.href
            }));
        });

        await browser.close();
        res.render('Europe/Greece/ethnos', { news });
    } catch (error) {
        console.error('Error scraping Ethnos:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/karfitsa', async (req, res) => {
    try {
        const url = 'https://www.karfitsa.gr';
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const news = await page.evaluate(() => {
            let titles = Array.from(document.querySelectorAll('.info'));
            return titles.map(title => ({
                title: title.inenrHTML.trim(),
                link: title.href
            }));
        });

        await browser.close();
        res.render('Europe/Greece/karfitsa', { news });
    } catch (error) {
        console.error('Error scraping Karfitsa:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/kathimerini', async (req, res) => {
    try {
        const url = 'https://www.kathimerini.gr/';
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const news = await page.evaluate(() => {
            let titles = Array.from(document.querySelectorAll('.media-content a'));
            return titles.map(title => ({
                title: title.innerText.trim(),
                link: title.href
            }));
        });

        await browser.close();
        res.render('Europe/Greece/kathimerini', { news });
    } catch (error) {
        console.error('Error scraping Kathimerini:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/makeleio', async (req, res) => {
    try {
        const url = 'https://www.makeleio.gr/';
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const news = await page.evaluate(() => {
            let titles = Array.from(document.querySelectorAll('h3 a'));
            return titles.map(title => ({
                title: title.title.trim(),
                link: title.href
            }));
        });

        await browser.close();
        res.render('Europe/Greece/makeleio', { news });
    } catch (error) {
        console.error('Error scraping Makeleio:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/romfea', async (req, res) => {
    try {
        const url = 'https://www.romfea.gr/';
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const news = await page.evaluate(() => {
            let titles = Array.from(document.querySelectorAll('div a'));
            return titles.map(title => ({
                title: title.textContent.trim(),
                link: title.href
            }));
        });

        await browser.close();
        res.render('Europe/Greece/romfea', { news });
    } catch (error) {
        console.error('Error scraping Romfea:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/nakanune', async (req, res) => {
    try {
        const url = 'https://www.nakanune.ru/';
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const news = await page.evaluate(() => {
            let titles = Array.from(document.querySelectorAll('ul li a'));
            let linkTitles = Array.from(document.querySelectorAll('.textLink'));
            titles.push(...linkTitles);
            return titles.map(title => ({
                title: title.innerText.trim(),
                link: title.href
            }));
        });

        await browser.close();
        res.render('Europe/Russia/nakanune', { news });
    } catch (error) {
        console.error('Error scraping Nakanune:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/tass', async (req, res) => {
    try {
        const url = 'https://tass.com/';
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const news = await page.evaluate(() => {
            let titles = Array.from(document.querySelectorAll('.news-preview_default'));
            return titles.map(title => ({
                title: title.textContent.trim(),
                link: title.href
            }));
        });

        await browser.close();
        res.render('Europe/Russia/tass', { news });
    } catch (error) {
        console.error('Error scraping TASS:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/topwar', async (req, res) => {
    try {
        const url = 'https://en.topwar.ru/';
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const news = await page.evaluate(() => {
            let titles = Array.from(document.querySelectorAll('.item-link'));
            return titles.map(title => ({
                title: title.textContent.trim(),
                link: title.href
            }));
        });

        await browser.close();
        res.render('Europe/Russia/topwar', { news });
    } catch (error) {
        console.error('Error scraping TopWar:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/epochtimes', async (req, res) => {
    try {
        const url = 'https://www.theepochtimes.com/';
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const news = await page.evaluate(() => {
            let titles = Array.from(document.querySelectorAll('a h3'));
            return titles.map(title => ({
                title: title.textContent.trim(),
                link: title.href
            }));
        });

        await browser.close();
        res.render('America/United-States/epochtimes', { news });
    } catch (error) {
        console.error('Error scraping Epoch Times', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/foxnews', async (req, res) => {
    try {
        const url = 'https://www.foxnews.com/';
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const news = await page.evaluate(() => {
            let titles = Array.from(document.querySelectorAll('.title a'));
            return titles.map(title => ({
                title: title.textContent.trim(),
                link: title.href
            }));
        });

        await browser.close();
        res.render('America/United-States/foxnews', { news });
    } catch (error) {
        console.error('Error scraping Fox News:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/gabnews', async (req, res) => {
    try {
        const url = 'https://news.gab.com/';
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const news = await page.evaluate(() => {
            let titles = Array.from(document.querySelectorAll('.entry-title a'));
            return titles.map(title => ({
                title: title.textContent.trim(),
                link: title.href
            }));
        });

        await browser.close();
        res.render('America/United-States/gabnews', { news });
    } catch (error) {
        console.error('Error scraping Gab News', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/oan', async (req, res) => {
    try {
        const url = 'https://www.oann.com/';
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const news = await page.evaluate(() => {
            let titles = Array.from(document.querySelectorAll('.entry-title a'));
            let listTitles = Array.from(document.querySelectorAll('.lcp_catlist li a'))
            titles.push(...listTitles);
            return titles.map(title => ({
                title: title.textContent.trim(),
                link: title.href
            }));
        });

        await browser.close();
        res.render('America/United-States/oan', { news });
    } catch (error) {
        console.error('Error scraping One America News (OAN)', error);
        res.status(500).send('Internal Server Error');
    }
});

const port =  process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});