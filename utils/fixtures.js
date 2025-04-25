const { test, expect } = require('@playwright/test');
const { captureOnFailure } = require('../utils/screenshotHelper');


// Attach screenshot helper without extending the test (to keep Allure working)
test.afterEach(async ({ page }, testInfo) => {
    await captureOnFailure({ page }, testInfo);
  });

  exports.test = test;
  exports.expect = expect;