const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const {URL} = require('url');

const fs = require('fs');
(async() => {
const url = 'https://dxploanapplv4-qa.americanexpress.com/us/personal-loans/apply#/';

// Use Puppeteer to launch headful Chrome and don't use its default 800x600 viewport.
const browser = await puppeteer.launch({
  headless: false,
  defaultViewport: null,
});

// Wait for Lighthouse to open url, then customize network conditions.
// Note: this will re-establish these conditions when LH reloads the page. Think that's ok....
browser.on('targetchanged', async target => {
  const page = await target.page();
  await page.waitFor(30000);
            // await page.type('input[placeholder="User ID"]', 'duma344590');
            // await page.type('input[placeholder="Password"]', 'flower1234');
            // await page.$eval('button[type=submit]', x => x.click());
            // await page.waitFor(10000);
            // await page.goto('https://dxploanapplv4-qa.americanexpress.com/us/personal-loans/apply', { waitUntil: 'networkidle0' })
            // await page.waitFor(10000);
  function addStyleContent(content) {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(content));
    document.head.appendChild(style);
  }

  const css = '* {color: red}';

  if (page && page.url() === url) {
    // Note: can't use page.addStyleTag due to github.com/GoogleChrome/puppeteer/issues/1955.
    // Do it ourselves.
    const client = await page.target().createCDPSession();
    await client.send('Runtime.evaluate', {
      expression: `(${addStyleContent.toString()})('${css}')`
    });
  }
});

// Lighthouse will open URL. Puppeteer observes `targetchanged` and sets up network conditions.
// Possible race condition.
const result = await lighthouse(url, {
  port: (new URL(browser.wsEndpoint())).port,
  output: 'html',
  logLevel: 'info',
  
  view: true
});
fs.writeFileSync('result.json', JSON.stringify(result.lhr))

// console.log(`Lighthouse scores: ${Object.values(lhr.categories).map(c => c.score).join(', ')}`);

await browser.close();
})();