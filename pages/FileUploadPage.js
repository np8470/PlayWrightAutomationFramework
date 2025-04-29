const {expect} = require('@playwright/test')
const SeleniumCoreUtils = require('../utils/SeleniumCoreUtil')

class FileUploadPage {

  constructor(page) {
    this.page = page
    this.fileUploadButton = '#file-upload'
    this.submitButton = '#file-submit'
    this.message = "//h3"
    this.imageName = "//div[@id='uploaded-files']"
  }

  async uploadFile(filePath) {
    await this.page.locator(this.fileUploadButton).setInputFiles(filePath)
  }

  async clickSubmit() {
    await this.page.locator(this.submitButton).click()
  }

  async verifyMessage(msg) {
    const messageText = await this.page.locator( this.message)
    await expect.soft(messageText).toHaveText(msg)
  }

  async verifyImageName(filename) {
    const imageNameText = await this.page.locator(this.imageName)
    await expect.soft(imageNameText).toHaveText(filename)
  }

}

module.exports = FileUploadPage