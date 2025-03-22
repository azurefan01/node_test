import puppeteer from 'puppeteer-extra';
//const puppeteer = require('puppeteer-extra')

// add stealth plugin and use defaults (all evasion techniques)
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
puppeteer.use(StealthPlugin());

var base_url = "https://danbooru.donmai.us";

var tags = "futanari -animated";

(async (tags) => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto(`https://danbooru.donmai.us/posts?tags=${tags.replaceAll(" ","+")}`);

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

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
  var links = await page.$$eval("a.post-preview-link", el => el.map(anchor => anchor.getAttribute("href")));
  await page.setRequestInterception(true);
  page.on('request', (request) => {
    if (request.url().endsWith('.jpg') || request.url().endsWith('.png') || request.url().endsWith('.mp4')) {
      request.abort();  // Prevent images from loading
    } else {
      request.continue();
    }
  });
  for (const link of links) {
    //console.log(decodeURIComponent(`${base_url+link}`));
    try {
      console.log(`${base_url + link}`);
      await page.goto(`${base_url + link}`);
      var tags = await page.$$eval("ul.general-tag-list > li > span > a.search-tag",el => el.map(li => li.textContent));
      tags.forEach(tag => {
        console.log(tag);
      });
      console.log("");
    } catch (error) {
      console.error('Error navigating to the page:', error);
    }
  }
  await browser.close();
})(tags);;