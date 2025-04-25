const{test, expect}  = require('../utils/fixtures')
const MultipleWindowPage = require('../pages/MultipleWindowPage')
const multipleWindowPageTestData = require('../testdata/Windows.json')
const seleniumCoreutil = require('../utils/SeleniumCoreUtil')

test.beforeEach('Launch the application',async ({page}) => {
    await page.goto(multipleWindowPageTestData.baseUrl)
})

test("New Borwser Window Test", async ({page}) => {   
    const multipleWindowPage = new MultipleWindowPage(page)
    //await page.goto(multipleWindowPageTestData.baseUrl)
    await seleniumCoreutil.handleNewWindow(page,
         () => multipleWindowPage.openNewBrowserWindow(),
         async (newPage) => {   
            expect.soft(await newPage.title()).toBe(multipleWindowPageTestData.newWindowTitle)
         })
})


test("New Browser Tab Test", async ({page}) => {   
    const multipleWindowPage = new MultipleWindowPage(page)
    //await page.goto(multipleWindowPageTestData.baseUrl)
    await seleniumCoreutil.handleNewWindow(page,
         () => multipleWindowPage.openNewBrowserTab(),
         async (newPage) => {   
            expect.soft(await newPage.title()).toBe(multipleWindowPageTestData.newTabTitle)
         })
})

test("New Message Window Test", async ({page}) => {
    const multipleWindowPage = new MultipleWindowPage(page)
    //await page.goto(multipleWindowPageTestData.baseUrl)
    await seleniumCoreutil.handleNewWindow(page,
         () => multipleWindowPage.openNewMessageWindow(),
         async (newPage) => {   
            expect.soft(await multipleWindowPage.verifyNewMessageWindowText())
        })
})