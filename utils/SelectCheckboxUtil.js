/**
 * Checks or unchecks a checkbox by value or label text.
 *
 * @param {import('@playwright/test').Page} page - Playwright Page instance
 * @param {string} selector - Selector for the checkbox group (e.g., 'input[type="checkbox"]')
 * @param {string} optionValue - Value attribute or label text to match
 * @param {boolean} shouldCheck - true to check, false to uncheck
 */
async function selectCheckbox(page, selector, optionValue, shouldCheck = true) {
    const checkboxes = await page.$$(selector);
  
    for (const checkbox of checkboxes) {
      const value = await checkbox.getAttribute('value');
      const id = await checkbox.getAttribute('id');
      const label = await page.$(`label[for="${id}"]`);
      const labelText = label ? await label.textContent() : '';
  
      if (value === optionValue || labelText.trim() === optionValue) {
        shouldCheck ? await checkbox.check() : await checkbox.uncheck();
        return;
      }
    }
  
    throw new Error(`Checkbox with value or label "${optionValue}" not found in selector "${selector}"`);
  }
  
  module.exports = { selectCheckbox };