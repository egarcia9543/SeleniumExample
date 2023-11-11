const { Builder, By, Key, until } = require('selenium-webdriver');

(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to the route you want to test
        await driver.get('http://localhost:3000/');

        // Find an element on the page and interact with it
        let element = await driver.findElement(By.name('q'));
        await element.sendKeys('Selenium', Key.RETURN);

        // Wait for the page to load and assert that the expected element is present
        await driver.wait(until.titleIs('Selenium - Google Search'), 1000);
        let results = await driver.findElements(By.css('h3'));
        let firstResult = await results[0].getAttribute('textContent');
        if (firstResult.includes('Selenium')) {
            console.log('Test passed!');
        } else {
            console.log('Test failed.');
        }
    } finally {
        await driver.quit();
    }
})();
