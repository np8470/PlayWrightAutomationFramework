const{expect, test} = require('@playwright/test')
const iFramePageTestData = require('../testdata/iframe.json')

class IFramePage
{
    constructor(page)
    {
        this.page = page
        this.firstFrameLocator = "iframe[name='employeetable']"
        this.firstFrameHeading = "xpath=//h2[normalize-space()='Project Details']"
        this.secondFrameLocator = "iframe[name='popuppage']"
        this.alertBox = "xpath=//button[normalize-space()='Alert Box']"
        this.firstName = "xpath=//input[@id='vfb-5']"
    }

    async verifyFirstFrame(frameHeading)
    {
        const firstFrameLocator = await this.page.frameLocator(this.firstFrameLocator)
        const heading = await firstFrameLocator.locator(this.firstFrameHeading)
        const firstFrameText = await heading.textContent()   
        console.log('First frame text: ', firstFrameText)
        await expect.soft(firstFrameText).toContain(frameHeading)
    }

    async verifyAlertBox() {
        this.page.once('dialog', async dialog => {
            console.log('Dialog message:', dialog.message());
            await dialog.accept();
        });
    
        const secondFrame = await this.page.frame({ name: iFramePageTestData.secondFrameName });
        if (!secondFrame) {
            throw new Error(`Frame "${iFramePageTestData.secondFrameName}" not found`);
        }
        //const alertBoxButton = await secondFrame.waitForSelector("button[name='alertbox']", { state: 'visible', timeout: 10000 });
        const alertBoxButton = await secondFrame.waitForSelector(this.alertBox, { state: 'visible', timeout: 10000 });
        await alertBoxButton.click();
    }

    async enterFirstName(name) {
        //const firstFrameLocator = await this.page.frameLocator(this.firstFrameLocator)
        const thirdFrame = await this.page.frame({ name: iFramePageTestData.thirdFrameName });
        if (!thirdFrame) {
            throw new Error(`Frame "${iFramePageTestData.thirdFrame}" not found`);
        }
        const enterFirstName = await thirdFrame.locator(this.firstName)
        await expect.soft(enterFirstName).toBeVisible({timeout: 5000})
        await expect.soft(enterFirstName).toBeEnabled({timeout: 5000})
        await expect.soft(enterFirstName).toBeEditable({timeout: 5000})
        await enterFirstName.fill(name)
        await expect.soft(enterFirstName).toHaveValue(name, {timeout: 5000})
    }

}

module.exports = IFramePage