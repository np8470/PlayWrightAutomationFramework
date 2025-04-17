//const{expect,test} = require('@playwright/test');
const RegistrationFormPage = require('../pages/RegistrationFormPage');
const TransactionDetailsPage = require('../pages/TransactionDetailsPage');
const registerFromData = require('../testdata/registerform.json');
const transactionTestdata = require('../testdata/transactionDetails.json');
const {test, expect} = require('../utils/fixtures');

test("Form Registartion Test", async ({page}) => {
    await page.goto(registerFromData.baseUrl);
    const registrationFormPage = new RegistrationFormPage(page);
    await registrationFormPage.enterFirstName(registerFromData.firstname);
    await registrationFormPage.enterLastName(registerFromData.lastname);
    await registrationFormPage.selectGender(registerFromData.gender[0]);
    await registrationFormPage.selectCourse (registerFromData.course[0]);
    await registrationFormPage.enterAddress(registerFromData.Address);
    await registrationFormPage.enterCity(registerFromData.city);
    await registrationFormPage.enterState(registerFromData.state);
    await registrationFormPage.selectCountryOption(registerFromData.country);
    await registrationFormPage.enterPostalCode(registerFromData.postalcode);
    await registrationFormPage.enterEmail(registerFromData.email);
    await registrationFormPage.enterDateOfDemo(registerFromData.dateofdemo);
    await registrationFormPage.enterConvenientTime(registerFromData.hour, registerFromData.minute);
    await registrationFormPage.enterMobile(registerFromData.mobile);
    await registrationFormPage.enterQuery(registerFromData.query);
    await registrationFormPage.enterVerificationCode(registerFromData.verificationCode);
    await registrationFormPage.clickSubmitButton();

    const transactionDetailsPage = new TransactionDetailsPage(page);
    await transactionDetailsPage.verifyTransactionPageURL(transactionTestdata.transactionUrl)
    await transactionDetailsPage.verifyTranactionPageTitle(transactionTestdata.transactionTitle)
    await transactionDetailsPage.verifySuccessMessage(transactionTestdata.success)
})