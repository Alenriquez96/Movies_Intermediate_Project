const puppeteer = require('puppeteer');

const scrap_filmaffinity = async (title) => {
  try {

    //lanzamos chrome
    const browser = await puppeteer.launch({
      headless: true, args: ["--incognito",
        "--no-sandbox",
        "--single-process",
        "--no-zygote"]
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 614 });

    //abrimos site
    await page.goto(`https://www.filmaffinity.com/es/search.php?stext=${title}`);
    await page.waitForSelector('.z-search');

    const links = await page.evaluate(() => {
      const elements = document.querySelectorAll('.mc-title a')
      const link = elements[0].href;
      return link;
    })
    
    //hacemos click en ese enlace 
    await page.goto(`https://www.filmaffinity.com/es/reviews/1/${links.slice(36,42)}.html`);
    await page.waitForSelector('.review-text1');

    //sacamos el primer comentario de las reviews de usuarios (username + comentario)
    let innerTextOfReview = await page.$eval('.fa-shadow.movie-review-wrapper.rw-item .review-text1', el => el.textContent)
    let innerUserOfReview = await page.$eval('div.mr-user-nick > a > b', el => el.innerText) || 'nada'

    const reviewsFilmaffinity = {
      innerTextOfReview,
      innerUserOfReview
    }

    await browser.close();
    return reviewsFilmaffinity;

  } catch (error) {
    return console.log(`There's no review in Filmaffinity because of: ${error.stack}`);

  }
}

/* scrap_filmaffinity("pulp fiction")  */
module.exports = scrap_filmaffinity;