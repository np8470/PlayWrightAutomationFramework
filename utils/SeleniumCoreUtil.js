 class SeleniumCoreUtil {
 
 /**
 * Selects a radio button by value, label text, or custom selector.
 *
 * @param {import('@playwright/test').Page} page - Playwright page instance
 * @param {string} selector - Base selector for the radio group
 * @param {string} optionValue - The value attribute or label text of the radio button
 */
 async selectRadioOption(page, selector, optionValue) {
    const radioButtons = await page.$$(selector);

    for (const radio of radioButtons) {
    const value = await radio.getAttribute('value');
    const id = await radio.getAttribute('id');
    const label = await page.$(`label[for="${id}"]`);
    const labelText = label ? await label.textContent() : '';

    if (value === optionValue || labelText.trim() === optionValue) {
        await radio.check();
        return;
    }
    }

    module.exports = {
      selectRadioOption
  };

    throw new Error(`Radio option "${optionValue}" not found in selector "${selector}"`);
}

/**
 * Checks or unchecks a checkbox by value or label text.
 *
 * @param {import('@playwright/test').Page} page - Playwright Page instance
 * @param {string} selector - Selector for the checkbox group (e.g., 'input[type="checkbox"]')
 * @param {string} optionValue - Value attribute or label text to match
 * @param {boolean} shouldCheck - true to check, false to uncheck
 */
async selectCheckbox(page, selector, optionValue, shouldCheck = true) {
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

  /**
 * Selects an option from a dropdown by value, label text, or index.
 *
 * @param {import('@playwright/test').Page} page - Playwright Page instance
 * @param {string} selector - Selector for the <select> element
 * @param {object} options - Options to match (value, label, or index)
 * @param {string} [options.value] - Value of the option to select
 * @param {string} [options.label] - Visible text of the option to select
 * @param {number} [options.index] - Index of the option to select (0-based)
 */
async selectDropdownOption(page, selector, { value, label, index }) {
    const dropdown = page.locator(selector);
  
    if (value) {
      await dropdown.selectOption({ value });
    } else if (label) {
      await dropdown.selectOption({ label });
    } else if (typeof index === 'number') {
      const options = await dropdown.locator('option').all();
      if (index >= 0 && index < options.length) {
        const optionValue = await options[index].getAttribute('value');
        await dropdown.selectOption(optionValue);
      } else {
        throw new Error(`Index ${index} is out of range for dropdown: ${selector}`);
      }
    } else {
      throw new Error('You must provide value, label, or index to select a dropdown option.');
    }
  }

  async waitForElementVisible(page, selector, timeout = 5000) {
    await page.waitForSelector(selector, { state: 'visible', timeout });
}
  

}

 
// Exporting the class as a module
module.exports = new SeleniumCoreUtil();