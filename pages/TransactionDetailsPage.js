const{expect} = require('@playwright/test');

class TransactionDetailsPage
{

    constructor(page)
    {
        this.page=page
        this.transactionTitle="//h2"
        this.message="#messageContainer"
    }

    async verifyTransactionPageURL(url)
    {
        await expect.soft(this.page).toHaveURL(url)
    }
    async verifyTranactionPageTitle(tramsactiontitle)
    {
        const title = this.page.locator(this.transactionTitle)
        await expect.soft(title).toHaveText(tramsactiontitle)
        console.log(await title.textContent())
    }
    async verifySuccessMessage(message)
    {
        const successMessage = this.page.locator(this.message)
        await expect.soft(successMessage).toContainText(message)
        console.log(await successMessage.textContent())
    }

}

module.exports=TransactionDetailsPage