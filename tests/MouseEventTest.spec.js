const {test, expect} = require('../utils/fixtures');
const MouseEventPage = require('../pages/MouseEventPage');
const mouseEventTestData = require('../testdata/mouseevent.json');

test("Mouse Event Test", async ({page}) => {

    await page.goto(mouseEventTestData.baseUrl);
    const mouseEventPage = new MouseEventPage(page);
    await mouseEventPage.verifyDragAndDropObject();
    await mouseEventPage.verifyTooltipText(mouseEventTestData.tooltipText);
    await mouseEventPage.verifyDoubleClickText(mouseEventTestData.doubleClickText);
    await mouseEventPage.verifyRightClickAction();
})