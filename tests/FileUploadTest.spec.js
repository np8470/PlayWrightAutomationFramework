const {test, expect} = require('../utils/fixtures')
const FileUploadPage = require('../pages/FileUploadPage')
const fileUploadData = require('../testdata/fileupload.json')

test.describe('File Upload Tests', () => {  

    test('Upload a file and verify the message', async ({page}) => {
        const fileUploadPage = new FileUploadPage(page)
        await page.goto(fileUploadData.baseUrl)
        await fileUploadPage.uploadFile(fileUploadData.filepath)
        await fileUploadPage.clickSubmit()
        await fileUploadPage.verifyMessage(fileUploadData.message)
        await fileUploadPage.verifyImageName(fileUploadData.filename)
    })
})