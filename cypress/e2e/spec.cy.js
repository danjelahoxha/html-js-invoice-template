describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html')
   
  });

  it(" Automatically add rows to add new products", () => {
    const button = cy.get('#add-row')
    button.click()
  });
});







// "description": "1. Automatically add rows to add new products/services\r 
// 2. Autocalculate total\r 
//3. Auto remove/delete rows\r
//4. Auto calculate price * amount",