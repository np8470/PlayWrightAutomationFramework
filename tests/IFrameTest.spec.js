const{test, expect} = require('../utils/fixtures')
const IFramePage = require('../pages/IFramePage')
const AlertPage = require('../pages/AlertPage')
const iFramePageTestData = require('../testdata/iframe.json')
const alertpagetestdata = require('../testdata/alerts.json')

test.beforeEach('Launch the application',async ({page}) => {
    await page.goto(iFramePageTestData.baseUrl)
})

test.use({viewport:{width:1536,height:864}})


test("First IFrame Test", async ({page}) => {   
    const iFramePage = new IFramePage(page)
    const allFrames = await page.frames()
    console.log('Number of frames: ', allFrames.length)

    console.log('Current window height: ', page.viewportSize().height)
    console.log('Current window width: ', page.viewportSize().width)
    console.log('Current window size: ', page.viewportSize())

    //approach 1 - using the name or url of the frame
    //const firstFrame = await page.frame({name: iFramePageTestData.firstFrameName})
    const firstFrame = await page.frame({url: iFramePageTestData.firstFrameName})
    const firstFrameTitle = await firstFrame.title()
    console.log('First frame title: ', firstFrameTitle)
    expect.soft(firstFrameTitle).toContain(iFramePageTestData.firstFrameTitle)

    //approach 2 - using the frame locator
    iFramePage.verifyFirstFrame(iFramePageTestData.firstFrameTitle)
})


test("Second IFrame Tests", async ({ page }) => {
    const iFramePage = new IFramePage(page);
    await iFramePage.verifyAlertBox();
});


test.only("Third IFrame Test", async ({page}) => {   
    const iFramePage = new IFramePage(page)
    await iFramePage.enterFirstName(iFramePageTestData.firstName)
})