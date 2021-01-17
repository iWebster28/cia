//This will only work if on server side. Not in react.
let Scraper = require('images-scraper');

const google = new Scraper({
  puppeteer: {
    headless: false,
  },
});

async function getImage() {
  const results = await google.scrape('', 1);
  console.log('results', results);
}

module.exports.getImage = getImage;