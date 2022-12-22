const server = require('./server');

//write tests for each function in server.js

test('Testing the retailer name: Target', () => 
{
    expect(server.retailName('target')).toBe(6);
});

test('Testing retail name: M&M Corner Market', ()=> 
{
    expect(server.retailName('M&M Corner Market')).toBe(14);
});

test('Testing purchaseTime function with 14:30 (2:30)', ()=> 
{
    expect(server.purchaseTime('14:30')).toBe(10);
});

test('Testing purchaseTime function with 12:30', ()=> 
{
    expect(server.purchaseTime('12:30')).toBe(0);
});

test('Testing purchaseTime function with 18:30 (6:30)', ()=> 
{
    expect(server.purchaseTime('18:30')).toBe(0);
});

test('Testing round dollar function with 5.00', ()=> 
{
    expect(server.checkRoundDollar(5.00)).toBe(50);
});

test('Testing round dollar function with 3.50', ()=> 
{
    expect(server.checkRoundDollar(3.50)).toBe(0);
});
test('Item check multiple of 3 with Emil\'s cheese pizza', ()=> 
{
    expect(server.checkDescription(
        {
        "shortDescription": "Emils Cheese Pizza",
        "price": "12.25"
        })).toBe(3);
});

test('Item check multiple of 3 with Mountain Dew 12PK', ()=> 
{
    expect(server.checkDescription(
        {
            "shortDescription": "Mountain Dew 12PK",
            "price": "6.49"
        })).toBe(0);
});

test('Item check with Klarbrunn 12-PK 12 FL OZ', () => 
{
    expect(server.checkDescription(
        {
            "shortDescription": "Klarbrunn 12-PK 12 FL OZ",
            "price": "12"
        })).toBe(3);
})