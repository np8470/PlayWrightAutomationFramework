const{test, expect} = require('../utils/fixtures')
const KeyboardEventPage = require('../pages/KeyboardEventPage')
const keyboardEventTestData = require('../testdata/keyboardevent.json')

test("Keyboard Event Test", async ({page}) => {
    await page.goto(keyboardEventTestData.baseUrl)
    const keyboardEventPage = new KeyboardEventPage(page)
    await keyboardEventPage.verifyCopyPasteByKeyboardEvent(keyboardEventTestData.searchText)
    //await keyboardEventPage.verifyAuoSuggetionsByKeyboardEvent(keyboardEventTestData.searchText)
    await keyboardEventPage.verifyAuoSuggetionsUsingLoopByKeyboardEvent(keyboardEventTestData.searchText)
})