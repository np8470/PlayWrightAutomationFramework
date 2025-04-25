const{expect} = require('@playwright/test')
const seleniumCoreutil = require('../utils/SeleniumCoreUtil');

let page;

class AlertPage
{
    constructor(page)
    {
        this.page = page
        this.alertBox = "//button[normalize-space()='Alert Box']"
        this.confirmAlertBox = "//button[normalize-space()='Confirm Alert Box']"
        this.promptAlertBox = "//button[normalize-space()='Prompt Alert Box']"
        this.alertMessage = "#demo"    
    }

    async verifyAlertBox(alertText)
    {
        await this.page.locator(this.alertBox).click()
        this.page.once('dialog', async dialog => {
            await dialog.accept();
        });
    }

    async verifyConfirmAlertBox(alertText)
    {
       await this.page.locator(this.confirmAlertBox).click();
        this.page.once('dialog', async dialog => {
            console.log(`Confirm Dialog message: ${dialog.message()}`)
            await dialog.accept();
        }); 
        
    }

    async veifyPromptAlertBox(alertText)
    {
        await this.page.locator(this.promptAlertBox).click();
        this.page.once('dialog', async dialog => {
            console.log(`Prompt Dialog message: ${dialog.message()}`)
            await dialog.accept('Ok');
        });
    }
}

module.exports = AlertPage