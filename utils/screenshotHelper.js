const fs = require('fs');
const path = require('path');
//const {allure} = require('allure-playwright');

exports.captureOnFailure = async ({page, testInfo}) => {
    try {
        
    
    // Check if the test failed
    // if (testInfo.status !== testInfo.expectedStatus) {
    if (testInfo && testInfo.status === 'failed')
     {
        
        // Create a directory for screenshots if it doesn't exist
        /* const screenshotDir = path.join(__dirname, 'screenshots');
        if (!fs.existsSync(screenshotDir)) {
            fs.mkdirSync(screenshotDir);
        } */
    
        // Generate a unique filename for the screenshot
        const fileName = `${testInfo.title.replace(/\s+/g, '_')}_${Date.now()}.png`;
        const filePath = testInfo.outputPath(fileName); // ✅ use testInfo.outputPath
        //const screenshotPath = path.join(filePath, fileName);
        //const screenshotPath = path.join(screenshotDir, fileName);
    
        // Capture the screenshot
        await page.screenshot({path: filePath});
        console.log(`❌ Screenshot captured: ${filePath}`);
    
        // Attach the screenshot to the test report
        //allure.addAttachment('Screenshot', fs.readFileSync(filePath), 'image/png');

         // Attach to Allure report using testInfo.attach
        await testInfo.attach('Failure Screenshot', {
            contentType: 'image/png',
            path: filePath,
           // body: fs.readFileSync(filePath)
          });
        
    }

    }
    catch (error)
     {
        console.error('Error capturing screenshot:', error);
     }

}