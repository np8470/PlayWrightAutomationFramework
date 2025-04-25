const{expect} = require('@playwright/test')
const seleniumCoreutil = require('../utils/SeleniumCoreUtil');

class DropdownPage
{
    constructor(page)
    {
      this.page = page
      this.simpleDropdown = "#simpleDropdown"
      this.dynamicDropdown = "#FromAccount"
      this.multiSelectDropdown = "//select[@name='programming']"  
    }

    async selectSimpleDropdown(city)
    {
        await expect.soft(this.page.locator(this.simpleDropdown)).toBeVisible({timeout: 5000})  
        await expect.soft(this.page.locator(this.simpleDropdown)).toBeEnabled({timeout: 5000})
        await seleniumCoreutil.selectDropdownOption(this.page, this.simpleDropdown, { value: city })
        await expect.soft(this.page.locator(this.simpleDropdown)).toHaveValue(city, {timeout: 5000})  
    }

    async selectDynamicDropdown(account)
    {
        await expect.soft(this.page.locator(this.dynamicDropdown)).toBeVisible({timeout: 5000})
        await expect.soft(this.page.locator(this.dynamicDropdown)).toBeEnabled({timeout: 5000}) 
        await seleniumCoreutil.selectDropdownOption(this.page, this.dynamicDropdown, { value: account })
        await expect.soft(this.page.locator(this.dynamicDropdown)).toHaveValue(account, {timeout: 5000})
    }

    async selectMultiSelectDropdown(language)
    {
        await expect.soft(this.page.locator(this.multiSelectDropdown)).toBeVisible({timeout: 5000})
        await expect.soft(this.page.locator(this.multiSelectDropdown)).toBeEnabled({timeout: 5000})
        await seleniumCoreutil.selectDropdownOption(this.page, this.multiSelectDropdown, { value: language })
        await expect.soft(this.page.locator(this.multiSelectDropdown)).toHaveValue(language, {timeout: 5000}) 
    }
}
module.exports = DropdownPage