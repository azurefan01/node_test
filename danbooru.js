import puppeteer from 'puppeteer-extra';

// add stealth plugin and use defaults (all evasion techniques)
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
puppeteer.use(StealthPlugin());

var base_url = "https://danbooru.donmai.us";

var tags = "";//add you search tags here!

(async (tags) => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto(`${base_url}/posts?tags=${tags.replaceAll(" ", "+")}`);

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

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
    try {
      console.log(`${base_url + link}`);
      await page.goto(`${base_url + link}`);
      var tags = await page.$$eval("ul.general-tag-list > li > span > a.search-tag", el => el.map(li => li.textContent));
      if (!tags.includes("animated")) {
        tags.forEach(tag => {
          console.log(tag);
        });
      }
      console.log("");
    } catch (error) {
      console.error('Error navigating to the page:', error);
    }
  }
  await browser.close();
})(tags);;