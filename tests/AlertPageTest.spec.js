const{test,expect} = require('../utils/fixtures')
const AlertPage = require('../pages/AlertPage')
const alertPageTestData = require('../testdata/alerts.json')



test("Alert Page Test", async ({page}) => {
    await page.goto(alertPageTestData.baseUrl)
    const alertPage = new AlertPage(page)
    await alertPage.verifyAlertBox(alertPageTestData.alertText)
    await alertPage.verifyConfirmAlertBox(alertPageTestData.confirmText)
    await alertPage.veifyPromptAlertBox(alertPageTestData.promptText)
})