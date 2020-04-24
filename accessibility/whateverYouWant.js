class whateverYouWant
{
    getUrls() {
        return [
           "https://dxploanapplv4-qa.americanexpress.com/us/personal-loans/apply",
          
       ];
    }
 
    connect(browser) {
        return new Promise(async (resolve, reject) => {
            const page = await browser.newPage();
            await page.goto('https://dxploanapplv4-qa.americanexpress.com/us/personal-loans/apply', {waitUntil: 'load'});
            await page.type('#form input[placeholder=User ID]', 'duma344590');
            await page.type('#form input[placeholder=Password]', 'flower1234');
            await page.$eval('#form button[type=submit]', x => x.click());
            await page.waitForNavigation({waitUntil: 'networkidle2'});
            resolve(browser);
        });
    }
}
 
module.exports = new whateverYouWant();