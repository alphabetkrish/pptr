const chromeLauncher = require('chrome-launcher');
const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const request = require('request');
const util = require('util');

(async() => {

const URL = 'https://dxploanapplv4-qa.americanexpress.com/us/personal-loans/apply';

const opts = {
  //chromeFlags: ['--headless'],
  logLevel: 'info',
  output: 'html'
};

// Launch chrome using chrome-launcher.
const chrome = await chromeLauncher.launch(opts);
opts.port = chrome.port;

// Connect to it using puppeteer.connect().
const resp = await util.promisify(request)(`http://localhost:${opts.port}/json/version`);
const {webSocketDebuggerUrl} = JSON.parse(resp.body);
const browser = await puppeteer.connect({browserWSEndpoint: webSocketDebuggerUrl});


// Run Lighthouse.
const {lhr}  = await lighthouse(URL, opts, null);
console.log(`Lighthouse scores: ${Object.values(lhr.categories).map(c => c.score).join(', ')}`);

await browser.disconnect();
await chrome.kill();

})();