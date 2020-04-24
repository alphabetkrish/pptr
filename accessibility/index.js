const lp = require('google-lighthouse-puppeteer');
const options = {};
lp.exec('./whateverYouWant.js', options)
    .then(() => console.log('everything ok'))
    .catch((err) => console.error(err));