 
 
 /**
 * Selects a radio button by value, label text, or custom selector.
 *
 * @param {import('@playwright/test').Page} page - Playwright page instance
 * @param {string} selector - Base selector for the radio group
 * @param {string} optionValue - The value attribute or label text of the radio button
 */
 async function selectRadioOption(page, selector, optionValue) {
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

    throw new Error(`Radio option "${optionValue}" not found in selector "${selector}"`);
}

module.exports = { selectRadioOption };