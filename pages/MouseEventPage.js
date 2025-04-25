const{expect} = require('@playwright/test');
const seleniumCoreutil = require('../utils/SeleniumCoreUtil');

class MouseEventPage
{
    constructor(page)
    {
        this.page = page
        this.sourceElement = "#draggableElement"
        this.destinationElement = "#droppableElement"
        this.tooltipElement = "#textbox"
        this.doubleClickElement = "#dblclick"
        this.doubleClickText = "#demo"
        this.rightClickElement = "#rightclick"
        this.registrationFormLink = "//div[@id='myDiv']//a[normalize-space()='Registration Form']"
        this.alertPopupLink = "//a[normalize-space()='Alert Popup']"
        this.mouseEventLink = "//div[@id='myDiv']//a[normalize-space()='Mouse Event']"
    }

    async verifyDragAndDropObject()
    {
        await seleniumCoreutil.dragAndDrop(this.page, this.sourceElement, this.destinationElement)
    }

    async verifyTooltipText(tooltipText)
    {
        await expect.soft(this.page.locator(this.tooltipElement)).toBeVisible({timeout: 5000})
        await this.page.locator(this.tooltipElement).hover({force: true})
        const tooltip = await this.page.locator(this.tooltipElement).getAttribute('title')
        console.log("Tooltip text is: " + tooltip)
        await expect.soft(tooltip).toBe(tooltipText, {timeout: 5000})
    }

    async verifyDoubleClickText(doubleClickText)
    {
        await expect.soft(this.page.locator(this.doubleClickElement)).toBeVisible({timeout: 5000})
        await this.page.locator(this.doubleClickElement).dblclick()
        const doubleClickTextValue = await this.page.locator(this.doubleClickText)
        await expect.soft(doubleClickTextValue).toContainText(doubleClickText, {timeout: 5000})
    }

    async verifyRightClickAction()
    {
        await expect.soft(this.page.locator(this.rightClickElement)).toBeVisible({timeout: 5000})
        await this.page.locator(this.rightClickElement).click({button: 'right'})
        await expect.soft(this.page.locator(this.registrationFormLink)).toBeVisible({timeout: 5000})
        await expect.soft(this.page.locator(this.alertPopupLink)).toBeVisible({timeout: 5000})
        await expect.soft(this.page.locator(this.mouseEventLink)).toBeVisible({timeout: 5000})
    }
}

module.exports = MouseEventPage