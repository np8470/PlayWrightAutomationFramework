const {expect} = require('@playwright/test')
const SeleniumCoreUtil = require('../utils/SeleniumCoreUtil')

class UserSessionStorePage {

    constructor(page) {
        this.page = page
        this.usernameInput = page.getByPlaceholder('Username')
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.locator('button');
        this.dashboardHeader = page.locator("//h6");
    }

    async login(username, password)
    {
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.loginButton.click()  
    }

    async verifyDashboardHeader(headerText) {
        const header = await this.dashboardHeader.innerText()
        expect(header).toBe(headerText)
    }

    async saveUserSession(sessionFilePath  = '../testdata/UserSession.json') {   
        await this.page.context().storageState({ path : sessionFilePath });
    }

}

module.exports = UserSessionStorePage