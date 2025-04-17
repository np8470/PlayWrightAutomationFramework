const{expect} = require('@playwright/test')
const seleniumCoreutil = require('../utils/SeleniumCoreUtil');

class RegistrationFormPage
{
    constructor(page)
    {
        this.page = page
        this.title="//h3[normalize-space()='Register For Demo']"
        this.firstname="#vfb-5"
        this.lastname="#vfb-7"
        this.gender="//label[contains(normalize-space(.),'Gender')]//parent::li//input[@type='radio']"
        this.malegender="#vfb-31-1"
        this.femalegender="#vfb-31-2"
        this.address="#vfb-13-address"
        this.city="#vfb-13-city"
        this.state="#vfb-13-state"
        this.country="#vfb-13-country"
        this.postalcode="#vfb-13-zip"
        this.email="#vfb-14"
        this.dateofdemo="#vfb-18"
        this.hour="#vfb-16-hour"
        this.minute="#vfb-16-min"
        this.mobile="#vfb-19"
        this.seleniumcourse="#vfb-20-0"
        this.devopscourse="#vfb-20-3"
        this.course="//label[normalize-space()='Course Interested']//parent::li//input[@type='checkbox']"
        this.coursesSelect = [
            "//input[@type='checkbox' and @value='Selenium WebDriver']",
            "//input[@type='checkbox' and @value='Java']",
            "//input[@type='checkbox' and @value='TestNG']"
        ]
        this.coursesUnSelect = [
            "//input[@type='checkbox' and @value='DevOps']",
            "//input[@type='checkbox' and @value='Functional Testing']",
            "//input[@type='checkbox' and @value='Others']"
        ]
        this.query="#vfb-23"
        this.verificationcode="#vfb-3"
        this.submitbutton="#vfb-4"
    }

    async enterFirstName(firstName)
    {
        await expect.soft(this.page.locator(this.firstname)).toBeVisible({timeout: 5000})
        await expect.soft(this.page.locator(this.firstname)).toBeEnabled({timeout: 5000})
        await expect.soft(this.page.locator(this.firstname)).toBeEditable({timeout: 5000})
        await this.page.fill(this.firstname, firstName)
        await expect.soft(this.page.locator(this.firstname)).toHaveValue(firstName, {timeout: 5000})
    }

    async enterLastName(lastName)
    {
        await expect.soft(this.page.locator(this.lastname)).toBeVisible({timeout: 5000})
        await expect.soft(this.page.locator(this.lastname)).toBeEnabled({timeout: 5000})
        await expect.soft(this.page.locator(this.lastname)).toBeEditable({timeout: 5000})
        await this.page.fill(this.lastname, lastName)
        await expect.soft(this.page.locator(this.lastname)).toHaveValue(lastName, {timeout: 5000})
    }

    async selectGender(gender)
    {
        await expect.soft(this.page.locator(this.malegender)).toBeVisible({timeout: 5000})
        await expect.soft(this.page.locator(this.malegender)).toBeEnabled({timeout: 5000})
        await seleniumCoreutil.selectRadioOption(this.page, this.gender, gender);
        //await selectRadioOption(page, this.malegender, 'Male');
        await expect.soft(this.page.locator(this.malegender)).toBeChecked({timeout: 5000})
    }

    async selectMaleGender()
    {
        await expect.soft(this.page.locator(this.malegender)).toBeVisible({timeout: 5000})
        await expect.soft(this.page.locator(this.malegender)).toBeEnabled({timeout: 5000})
        await seleniumCoreutil.selectRadioOption(this.page, this.malegender, 'Male');
        //await selectRadioOption(page, this.malegender, 'Male');
        await expect.soft(this.page.locator(this.malegender)).toBeChecked({timeout: 5000})
    }

    async selectFemaleGender()
    {
        await expect.soft(this.page.locator(this.femalegender)).toBeVisible({timeout: 5000})
        await expect.soft(this.page.locator(this.femalegender)).toBeEnabled({timeout: 5000})
        await seleniumCoreutil.selectRadioOption(this.page, this.femalegender, 'Female')
        await expect.soft(this.page.locator(this.femalegender)).toBeChecked({timeout: 5000})
    }

    async selectCourse(course)
    {   
        await expect.soft(this.page.locator(this.coursesSelect[0])).toBeVisible({timeout: 5000})
        await expect.soft(this.page.locator(this.coursesSelect[0])).toBeEnabled({timeout: 5000})
        await seleniumCoreutil.selectCheckbox(this.page, this.course, course);
         await expect.soft(this.page.locator(this.seleniumcourse)).toBeChecked({timeout: 5000})
    }

    async selectSeleniumCourse()
    {   
        await expect.soft(this.page.locator(this.coursesSelect[0])).toBeVisible({timeout: 5000})
        await expect.soft(this.page.locator(this.coursesSelect[0])).toBeEnabled({timeout: 5000})
        await seleniumCoreutil.selectCheckbox(this.page, this.coursesSelect[0], 'Selenium WebDriver');
         await expect.soft(this.page.locator(this.seleniumcourse)).toBeChecked({timeout: 5000})
    }

    async selectJavaCourse()
    {
        await expect.soft(this.page.locator(this.coursesSelect[1])).toBeVisible({timeout: 5000})
        await expect.soft(this.page.locator(this.coursesSelect[1])).toBeEnabled({timeout: 5000})
        await seleniumCoreutil.selectCheckbox(this.page, this.coursesSelect[1], 'Java');
        await expect.soft(this.page.locator(this.coursesSelect[1])).toBeChecked({timeout: 5000})
    }

    async selectTestNGCourse()
    {
        await expect.soft(this.page.locator(this.coursesSelect[2])).toBeVisible({timeout: 5000})
        await expect.soft(this.page.locator(this.coursesSelect[2])).toBeEnabled({timeout: 5000})
        await seleniumCoreutil.selectCheckbox(this.page, this.coursesSelect[2], 'TestNG');
        await expect.soft(this.page.locator(this.coursesSelect[2])).toBeChecked({timeout: 5000})
    }

    async selectDevOpsCourse()
    {
        await expect.soft(this.page.locator(this.devopscourse)).toBeVisible({timeout: 5000})
        await expect.soft(this.page.locator(this.devopscourse)).toBeEnabled({timeout: 5000})
        await seleniumCoreutil.selectCheckbox(this.page, this.devopscourse, 'DevOps');
        await expect.soft(this.page.locator(this.devopscourse)).toBeChecked({timeout: 5000})
    }

    async selectFunctionalTestingCourse()
    {
        await expect.soft(this.page.locator(this.coursesUnSelect[1])).toBeVisible({timeout: 5000})
        await expect.soft(this.page.locator(this.coursesUnSelect[1])).toBeEnabled({timeout: 5000})
        await seleniumCoreutil.selectCheckbox(this.page, this.coursesUnSelect[1], 'Functional Testing', false);
        await expect.soft(this.page.locator(this.coursesUnSelect[1])).toBeChecked({timeout: 5000})
    }

    async selectOthersCourse()
    {
        await expect.soft(this.page.locator(this.coursesUnSelect[1])).toBeVisible({timeout: 5000})
        await expect.soft(this.page.locator(this.coursesUnSelect[1])).toBeEnabled({timeout: 5000})
        await selectRadioOption(this.page, this.coursesUnSelect[2], 'Others', false);
        await expect.soft(this.page.locator(this.coursesUnSelect[1])).toBeChecked({timeout: 5000})
    }
   
    async enterAddress(address)
    {
        await expect.soft(this.page.locator(this.address)).toBeVisible({timeout: 5000})
        await expect.soft(this.page.locator(this.address)).toBeEnabled({timeout: 5000})
        await expect.soft(this.page.locator(this.address)).toBeEditable({timeout: 5000})
        await this.page.fill(this.address, address)
        await expect.soft(this.page.locator(this.address)).toHaveValue(address, {timeout: 5000})
    }

    async enterCity(city)
    {
        await expect.soft(this.page.locator(this.city)).toBeVisible({timeout: 5000})
        await expect.soft(this.page.locator(this.city)).toBeEnabled({timeout: 5000})
        await expect.soft(this.page.locator(this.city)).toBeEditable({timeout: 5000})
        await this.page.fill(this.city, city)
        await expect.soft(this.page.locator(this.city)).toHaveValue(city, {timeout: 5000})
    }

    async enterState(state)
    {
        await expect.soft(this.page.locator(this.state)).toBeVisible({timeout: 5000})
        await expect.soft(this.page.locator(this.state)).toBeEnabled({timeout: 5000})
        await expect.soft(this.page.locator(this.state)).toBeEditable({timeout: 5000})
        await this.page.fill(this.state, state)
        await expect.soft(this.page.locator(this.state)).toHaveValue(state, {timeout: 5000})
    }

    async selectCountry(country)
    {
        await expect.soft(this.page.locator(this.country)).toBeVisible({timeout: 5000})
        await expect.soft(this.page.locator(this.country)).toBeEnabled({timeout: 5000})
        await expect.soft(this.page.locator(this.country)).toBeEditable({timeout: 5000})
        await this.page.fill(this.country, country)
        await expect.soft(this.page.locator(this.country)).toHaveValue(country, {timeout: 5000})
        await this.page.keyboard.press('ArrowDown')
        await this.page.keyboard.press('Enter')
        await expect.soft(this.page.locator(this.country)).toHaveValue(country, {timeout: 5000})    
    }

    async selectCountryOption(country)
    {
        await expect.soft(this.page.locator(this.country)).toBeVisible()
        await expect.soft(this.page.locator(this.country)).toBeEnabled()
        await expect.soft(this.page.locator(this.country)).toBeEditable()
        //await this.page.locator(this.country).selectOption(country)
        //await seleniumCoreutil.selectDropdownOption(this.page, this.country, { label: country });
        await seleniumCoreutil.selectDropdownOption(this.page, this.country, { value: country });
        //await seleniumCoreutil.selectDropdownOption(this.page, this.country, { index: 0 });

        //await seleniumCoreutil.selectSelect2Option(this.page, this.country, { value: country });
        await expect.soft(this.page.locator(this.country)).toHaveValue(country)    
    }

    async enterPostalCode(postalcode)
    {
        await expect.soft(this.page.locator(this.postalcode)).toBeVisible({timeout: 5000})
        await expect.soft(this.page.locator(this.postalcode)).toBeEnabled({timeout: 5000})
        await expect.soft(this.page.locator(this.postalcode)).toBeEditable({timeout: 5000})
        await this.page.fill(this.postalcode, postalcode)
        await expect.soft(this.page.locator(this.postalcode)).toHaveValue(postalcode, {timeout: 5000})
    }

    async enterEmail(email)
    {
        await expect.soft(this.page.locator(this.email)).toBeVisible({timeout: 5000})
        await expect.soft(this.page.locator(this.email)).toBeEnabled({timeout: 5000})
        await expect.soft(this.page.locator(this.email)).toBeEditable({timeout: 5000})
        await this.page.fill(this.email, email)
        await expect.soft(this.page.locator(this.email)).toHaveValue(email, {timeout: 5000})
    }

    async enterDateOfDemo(date)
    {
        await expect.soft(this.page.locator(this.dateofdemo)).toBeVisible({timeout: 5000})
        await expect.soft(this.page.locator(this.dateofdemo)).toBeEnabled({timeout: 5000})
        await expect.soft(this.page.locator(this.dateofdemo)).toBeEditable({timeout: 5000})
        await this.page.fill(this.dateofdemo, date)
        await expect.soft(this.page.locator(this.dateofdemo)).toHaveValue(date, {timeout: 5000})
    }
    
    async enterConvenientTime(hour, min)
    {
        await expect.soft(this.page.locator(this.hour)).toBeVisible({timeout: 5000})
        await expect.soft(this.page.locator(this.hour)).toBeEnabled({timeout: 5000})
        await expect.soft(this.page.locator(this.hour)).toBeEditable({timeout: 5000})
        await seleniumCoreutil.selectDropdownOption(this.page, this.hour, { value: hour });
        await seleniumCoreutil.selectDropdownOption(this.page, this.minute, { value: min });
        await expect.soft(this.page.locator(this.hour)).toHaveValue(hour, {timeout: 5000})
        await expect.soft(this.page.locator(this.minute)).toHaveValue(min, {timeout: 5000})
    }

    async enterMobile(mobile)
    {
        await expect.soft(this.page.locator(this.mobile)).toBeVisible({timeout: 5000})
        await expect.soft(this.page.locator(this.mobile)).toBeEnabled({timeout: 5000})
        await expect.soft(this.page.locator(this.mobile)).toBeEditable({timeout: 5000})
        await this.page.fill(this.mobile, mobile)
        await expect.soft(this.page.locator(this.mobile)).toHaveValue(mobile, {timeout: 5000})
    }

    async enterQuery(query)
    {
        await expect.soft(this.page.locator(this.query)).toBeVisible({timeout: 5000})
        await expect.soft(this.page.locator(this.query)).toBeEnabled({timeout: 5000})
        await expect.soft(this.page.locator(this.query)).toBeEditable({timeout: 5000})
        await this.page.fill(this.query, query)
        await expect.soft(this.page.locator(this.query)).toHaveValue(query, {timeout: 5000})
    }
    
    async enterVerificationCode(code)
    {
        await expect.soft(this.page.locator(this.verificationcode)).toBeVisible({timeout: 5000})
        await expect.soft(this.page.locator(this.verificationcode)).toBeEnabled({timeout: 5000})
        await expect.soft(this.page.locator(this.verificationcode)).toBeEditable({timeout: 5000})
        await this.page.fill(this.verificationcode, code)
        await expect.soft(this.page.locator(this.verificationcode)).toHaveValue(code, {timeout: 5000})
    }

    async clickSubmitButton()
    {
        await expect.soft(this.page.locator(this.submitbutton)).toBeVisible({timeout: 5000})
        await expect.soft(this.page.locator(this.submitbutton)).toBeEnabled({timeout: 5000})
        await this.page.click(this.submitbutton)
    }

}

module.exports=RegistrationFormPage