const DropdownPage = require('../pages/DropdownPage')
const {test, expect} = require('../utils/fixtures')
const dropdownTestData = require('../testdata/dropdown.json')

test("Dropdown Test", async ({page}) => {
    await page.goto(dropdownTestData.baseUrl)
    const dropdownPage = new DropdownPage(page)
    await dropdownPage.selectSimpleDropdown(dropdownTestData.city)
    await dropdownPage.selectDynamicDropdown(dropdownTestData.account)
    await dropdownPage.selectMultiSelectDropdown(dropdownTestData.language)
})

