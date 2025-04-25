const{test, expect} = require('playwright/test')
const seleniumCoreutil = require('../utils/SeleniumCoreUtil')
const multipleWindowPageTestData = require('../testdata/Windows.json')

class MultipleWindowPage
{
    constructor(page)
    {
        this.page = page
        this.newBrowserWindow = "//button[normalize-space()='New Browser Window']"
        this.newMessageWindow = "//button[normalize-space()='New Message Window']"
        this.newBrowserTab = "//button[normalize-space()='New Browser Tab']"
        this.newMessageWindowText = "//body"
    }

    async openNewBrowserTab()
    {
        this.page.locator(this.newBrowserTab).click()
    }

    async openNewBrowserWindow()
    {
        this.page.locator(this.newBrowserWindow).click()
    }

    async openNewMessageWindow()
    {
        this.page.locator(this.newMessageWindow).click()
    }

    async verifyNewMessageWindowText()
    {
        //expect.soft(await this.page.locator(this.newMessageWindowText).textContent()).toContain(multipleWindowPageTestData.newMessageWindowText)
        // expect.soft(await this.page.locator(this.newMessageWindowText).textContent()).toBe("This is a new message window")
        
        const bodyText = await this.page.locator(this.newMessageWindowText).textContent()
        expect.soft(bodyText).toContain(multipleWindowPageTestData.newMesssage)
        // const textContent = await this.page.locator(this.newMessageWindowText).textContent();
        //return textContent ? textContent.trim() : '';
    }

}

module.exports = MultipleWindowPage