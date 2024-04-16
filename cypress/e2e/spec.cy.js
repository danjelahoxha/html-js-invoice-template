describe.skip('Identify invoice elements', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html')
  });

  it(" has date and unique code", () => {
    cy.get('.date').should('exist')
    cy.get('.invoice-number').should('exist')
  });
  it(" has row:product name,quantity,price,total,action,plus button", () => {
    cy.get('#row-1 > :nth-child(1)').should('exist')
    cy.get('.product').should('exist')
    cy.get('#unit').should('exist')
    cy.get('#price').should('exist')
    cy.get('#amount').should('exist')
    cy.get('#delete-row-1').should('exist')
    cy.get('#add-row').should('exist')
  });
  it(" has invoice total, ", () => {
    cy.get('#total').should('exist')
  });
});

describe('Invoice functionality', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html')

  });

  it(" fill default row", () => {
    cy.get('.product').type('water')
    cy.get('#unit').type('5')
    cy.get('#price').type('20')
    cy.get('#amount').should("have.value", "100");
  });
  it(" add and fill a new row", () => {
    cy.get('#add-row').click()
    cy.get('#row-2').should('exist')
    cy.get('#row-2 .product').type('bread')
    cy.get('#row-2 .unit').type('2')
    cy.get('#row-2 .price').type('10')
    cy.get('#row-2 .amount').should("have.value", "20");

    cy.get('#total').should("have.value", "120");
    
  });

  it(" remove row ", () => {
    cy.get('[style="text-align: right"] > .material-icons').click()
  });
});

