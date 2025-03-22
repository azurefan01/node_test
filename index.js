import puppeteer from 'puppeteer-extra';
//const puppeteer = require('puppeteer-extra')

// add stealth plugin and use defaults (all evasion techniques)
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
puppeteer.use(StealthPlugin());

base_url = "https://danbooru.donmai.us/";

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://danbooru.donmai.us/posts?tags=1girl+order%3AScore+age%3A%3C7month&z=5');

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});

  // Type into search box
  //await page.type('.devsite-search-field', 'automate beyond recorder');

  // Wait and click on first result
  //const searchResultSelector = '.devsite-result-item-link';
  //await page.waitForSelector(searchResultSelector);
  //await page.click(searchResultSelector);

  // Locate the full title with a unique string
  //const textSelector = await page.waitForSelector(
  //  'text/Customize and automate',
  //);
  //const fullTitle = await textSelector?.evaluate(el => el.textContent);

  // Print the full title
  //console.log('The title of this blog post is "%s".', fullTitle);
    console.log(await page.content());
  await browser.close();
})();;