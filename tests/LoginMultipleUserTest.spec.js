const{test,expect} = require('../utils/fixtures')
const multipleUserData = require('../testdata/multipleUser.json')
const MultiUserLoginPage = require('../pages/MultiUserLoginPage')

    test('Login with multiple users', async ({page}) => {
        const multiUserLoginPage = new MultiUserLoginPage(page)
        for (const user of multipleUserData.users) {
            await page.goto(multipleUserData.baseUrl)
            multiUserLoginPage.login(user.username, user.password)
            await expect.soft(page).toHaveTitle(user.title, {timeout: 10000})
            await expect.soft(page).toHaveURL(user.inventoryUrl, {timeout: 10000})
        }
    })