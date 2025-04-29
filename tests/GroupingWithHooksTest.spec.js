const{test, expect} = require('../utils/fixtures')

test.beforeAll(async() => {
    console.log('This is BeforeAll Hook.....');
})

test.afterAll(async() => {
    console.log('This is AfterAll Hook.....');
})

test.beforeEach(async() => {
    console.log('This is BeforeEach Hook.....');
})

test.afterEach(async() => {
    console.log('This is AfterEach Hook.....');
})

test.describe.only('Group 1', async() => {
    
    test('Test 1', async() => {
        console.log("This is Test 1......");
    })
    
    test('Test 2', async() => {
        console.log("This is Test 2......");
    })

})

test.describe.skip('Group 2', async() => {

    test('Test 3', async() => {
        console.log("This is Test 3......");
    })
    
    test('Test 4', async() => {
        console.log("This is Test 4......");
    })

})