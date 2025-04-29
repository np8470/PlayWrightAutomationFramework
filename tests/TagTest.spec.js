const{test, expect} = require('@playwright/test')
    
    test('@smoke Test 1', async() => {
        console.log("This is Test 1......");
    })
    
    test('@Regression Test 2', async() => {
        console.log("This is Test 2......");
    })

    test('@Regression Test 3', async() => {
        console.log("This is Test 3......");
    })
    
    test('@Sanity Test 4', async() => {
        console.log("This is Test 4......");
    })

// to execute with tag: npx playwright test ./tests/Tag.spec.js --grep @Regression --grep-inver @Smoke