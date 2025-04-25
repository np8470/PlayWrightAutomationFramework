const{expect} = require('@playwright/test');
const seleniumCoreutil = require('../utils/SeleniumCoreUtil');

class KeyboardEventPage
{
    constructor(page)
    {
        this.page = page
        this.searchBox = "//textarea[@id='APjFqb']"
        this.searchListOption = "//li[@role='presentation']"
    }

    async verifyCopyPasteByKeyboardEvent(searchText)
    {
        const searchElement = await this.page.locator(this.searchBox)
        await expect.soft(searchElement).toBeVisible({timeout: 5000})
        await searchElement.focus()
        await searchElement.fill(searchText)
        try {
            await Promise.all([
                this.page.waitForNavigation({ waitUntil: 'load', timeout: 5000}),
                searchElement.press('Enter')
            ])  
        } catch (error) {
            console.error('Navigation might not have occurred:', err.message);
        }
       
        //await this.page.keyboard.press('Enter')
        await this.page.goBack()

        await searchElement.fill(searchText)
        await searchElement.press('Control+A')
        await searchElement.press('Control+c')
        await searchElement.press('Backspace')
        await searchElement.press('Control+v')
    }

    async verifyAuoSuggetionsByKeyboardEvent(searchText)
    {
        const searchElement = this.page.locator(this.searchBox);
        await searchElement.focus();
        await searchElement.type(searchText);  
        await page.waitForSelector(this.searchListOption, { state: 'visible', timeout: 10000 })
        const searchListElement = await this.page.locator(this.searchListOption)
        //await this.page.waitForSelector(searchListElement, { state: 'visible', timeout: 5000 })
        
        
        //await seleniumCoreutil.selectSearchSuggestion(this.page, this.searchListOption, searchText);

        
        await searchListElement.waitFor({ state: 'visible', timeout: 5000 });
        
        await searchListElement.press('ArrowDown')
        await searchListElement.press('ArrowDown')
        await searchListElement.press('Enter')

    }

    async verifyAuoSuggetionsUsingLoopByKeyboardEvent(searchText)
    {
        const searchElement = await this.page.locator(this.searchBox)
        await searchElement.focus()
        await searchElement.type(searchText)
        const searchListElement = await this.page.locator(this.searchListOption)

        const searchListElements = await this.page.$$(this.searchListOption)
        for (const element of searchListElements) {
            const text = await element.evaluate(el => el.textContent);
            console.log("Search List Element Text: " + text)
            if (text.includes(searchText)) {
                await element.click()
                break
            }
        }
    }

}

module.exports = KeyboardEventPage