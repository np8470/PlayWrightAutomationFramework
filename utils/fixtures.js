const { test, expect } = require('@playwright/test');
const { captureOnFailure } = require('../utils/screenshotHelper');


// Attach screenshot helper without extending the test (to keep Allure working)
test.afterEach(async ({ page }, testInfo) => {
    await captureOnFailure({ page }, testInfo);
  });

  exports.test = test;
  exports.expect = expect;


// Wrap base test with Allure
//const test = allurePlaywright(base.test).extend({});

/* const test = base.test.extend({
  // Add custom fixtures here if needed
}); */

/* test.afterEach(async ({ page }, testInfo) => {
    await captureOnFailure({ page }, testInfo);
  }); */

//module.exports = test;
//module.exports.test = test;
