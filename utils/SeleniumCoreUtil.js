const{expect} = require('@playwright/test');
 
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
  
async dragAndDrop(page, sourceLocator, targetLocator)  {
  try {
    const source = await page.locator(sourceLocator);
    const target = await page.locator(targetLocator);
    await expect.soft(page.locator(sourceLocator)).toBeVisible({timeout: 5000})
    await expect.soft(page.locator(targetLocator)).toBeVisible({timeout: 5000})
    await source.dragTo(target);

    console.log(`✅ Dragged element from ${sourceLocator} to ${targetLocator} using dragTo()`);
  } catch (err) {
    console.error('❌ Drag and drop using dragTo() failed:', err);
    throw err;
  }
};


/**
     * Waits for a new window (popup or tab) to open after a specific action
     * @param {Page} page - The current Playwright page
     * @param {Function} triggerAction - Function that triggers the new window
     * @returns {Promise<Page>} - The newly opened page
*/
async waitForNewWindow(page, triggerAction) {
    const [newPage] = await Promise.all([
        page.context().waitForEvent('page'),
        triggerAction(), // Call the function that triggers the new window
    ]);
    await newPage.waitForLoadState();
    return newPage;
  }
  
  /**
     * Handles a new window: switches, performs callback, and optionally closes
     * @param {Page} page - The current page
     * @param {Function} triggerAction - Function that opens the new window
     * @param {Function} callback - Actions to perform on the new page
     * @param {boolean} closeAfter - Whether to close the new page after action
     */
  async handleNewWindow(page, triggerAction, callback, closeafter = true) { 
    const newPage = await this.waitForNewWindow(page, triggerAction);
    await callback(newPage); // Call the callback function with the new page  
    if (closeafter) {
      await newPage.close(); // Close the new page if closeafter is true
    }
  }

  async getAllOpenPages(page) {
    const pages = await this.page.context().pages();
    return pages.filter(page => page.url() !== 'about:blank'); // Filter out blank pages
  }

  async swithToPageByTitle(page, expectedTitle) {
    const pages = await this.getAllOpenPages(page);
    for (const newPage of pages) {
      await newPage.waitForLoadState();
        const title = await newPage.title();
        if (title === expectedTitle) {
            await newPage.bringToFront(); // Bring the page to the front
            return newPage; // Return the page with the expected title
        }
    }
    throw new Error(`No page found with title: ${expectedTitle}`);
  }

 async swithcToPageByUrl(page, expectedUrl) { 
    const pages = await this.getAllOpenPages(page);
    for (const newPage of pages) {
        await newPage.waitForLoadState();
        const url = await newPage.url();
        if (url === expectedUrl) {
            await newPage.bringToFront(); // Bring the page to the front
            return newPage; // Return the page with the expected URL
        }
    }
    throw new Error(`No page found with URL: ${expectedUrl}`);
 }

 async closeAllOtherTabs(page){
    const pages = await this.getAllOpenPages(page);
    for (const allPage of pages) {
        if (allPage !== this.page) {
            await allPage.close(); // Close the all page if it's not the current one
        }
    }
    console.log('Closed all other tabs except the current one.');
  }

  async setText(page, selector, value, description = '') {
      this._log('⏩ Typing in', selector, description, ` with value "${value}"`);
      const locator = page.locator(selector);
      await locator.waitFor({ state: 'visible', timeout: 5000 });
      await locator.fill('');
      await locator.type(value);
  }

  async clickElement(page, selector, description = '') {
      this._log('🖱️ Clicking on', selector, description);
      const locator = page.locator(selector);
      await locator.waitFor({ state: 'visible', timeout: 5000 });
      await locator.click();
  }

  async getText(page, selector) {
      const locator = page.locator(selector);
      await locator.waitFor({ state: 'visible', timeout: 5000 });
      return await locator.textContent();
  }

  async isVisible(page, selector) {
      return await page.locator(selector).isVisible();
  }
  
  // Helper for consistent logging
  _log(action, selector, description = '', extra = '') {
       console.log(`${action} selector "${selector}"${description ? ` (${description})` : ''}${extra}`);
  }

 }



 
// Exporting the class as a module
module.exports = new SeleniumCoreUtil();