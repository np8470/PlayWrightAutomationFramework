const{expect} = require('@playwright/test')
const seleniumCoreutil = require('../utils/SeleniumCoreUtil');

class MultiUserLoginPage
{
    constructor(page)
    {
      this.page = page
      this.usernameField = "#user-name"
      this.passwordField = "#password"
      this.loginButton = "#login-button"
    }

    async login(username, password)
    {
        await expect.soft(this.page.locator(this.usernameField)).toBeVisible({timeout: 5000})  
        await expect.soft(this.page.locator(this.passwordField)).toBeVisible({timeout: 5000})  
        await expect.soft(this.page.locator(this.loginButton)).toBeVisible({timeout: 5000})  
        await seleniumCoreutil.setText(this.page, this.usernameField, username)
        await seleniumCoreutil.setText(this.page, this.passwordField, password)
        await seleniumCoreutil.clickElement(this.page, this.loginButton)
    }
    
    async verifyLoginSuccess(username)
    {
        const welcomeMessage = await this.page.locator(this.welcomeMessage).innerText()
        expect(welcomeMessage).toContain(`Welcome ${username}`)
    }

    async logout()
    {
        await seleniumCoreutil.clickElement(this.page, this.logoutButton)
    }

}

module.exports = MultiUserLoginPage