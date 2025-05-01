const{test,expect} = require('@playwright/test')
const UserSessionStore = require('../pages/UserSessionStorePage')
const userCredentialsTestData = require('../testdata/userCredentials.json')

test.describe('UserSessionStore', () => {  

    test('UserSessionStore Test', async ({page}) => {
        await page.goto(userCredentialsTestData.baseUrl)
        const userSessionStore = new UserSessionStore(page)
        await userSessionStore.login(userCredentialsTestData.validUser.username, userCredentialsTestData.validUser.password)
        await userSessionStore.verifyDashboardHeader(userCredentialsTestData.dashboardHeader)
        await userSessionStore.saveUserSession()
    })

    test('UserSessionStore Test with saved session', async ({browser}) => {
        const browserContext = await browser.newContext({storageState: '../testdata/UserSession.json'})
        const pageContext = await browserContext.newPage()
        await pageContext.goto(userCredentialsTestData.baseUrl)
        const dashboard = pageContext.locator("//h6")
        await expect(dashboard).toHaveText(userCredentialsTestData.dashboardHeader)
    })  

})