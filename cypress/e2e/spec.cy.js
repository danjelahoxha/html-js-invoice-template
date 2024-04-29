import { calculateTotal } from "../support/utils";






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

const products = [
  {
    name:'paper',
    unit:4.5,
    price:20,
   },
   {
    name:'bread',
    unit:5,
    price:10
   },
   {
    name:'rice',
    unit:5,
    price:10
   },
   {
    name:'book',
    unit:98,
    price:75
   }
] 
   const total4rows = calculateTotal(products)
   const total3rows = calculateTotal(products.slice(0, 3));
   const total2rows = calculateTotal(products.slice(0, 2));

  it(" fill default row", () => {
    cy.get('.product').type(products[0].name)
    cy.get('#unit').type(products[0].unit)
    cy.get('#price').type(products[0].price)
    cy.get('#amount').should("have.value", products[0].unit*products[0].price);
  });

  it(" add and fill a new row", () => {
    cy.get('.product').type(products[0].name)
    cy.get('#unit').type(products[0].unit)
    cy.get('#price').type(products[0].price)
    cy.get('#amount').should("have.value", products[0].unit*products[0].price);
    cy.get('#add-row').click()
    cy.get('#row-2').should('exist')
    cy.get('#row-2 .product').type(products[1].name)
    cy.get('#row-2 .unit').type(products[1].unit)
    cy.get('#row-2 .price').type(products[1].price)
    cy.get('#row-2 .amount').should("have.value", products[1].unit*products[1].price);
    cy.get('#total').should("have.value", total2rows);
  });

  it(" remove row ", () => {
    cy.get('[style="text-align: right"] > .material-icons').click()
  });

  it(" invoice with tree rows ", () => {
    cy.get('.product').type(products[0].name)
    cy.get('#unit').type(products[0].unit)
    cy.get('#price').type(products[0].price)
    cy.get('#amount').should("have.value", products[0].unit*products[0].price);

    cy.get('#add-row').click()
    cy.get('#row-2').should('exist')
    cy.get('#row-2 .product').type(products[1].name)
    cy.get('#row-2 .unit').type(products[1].unit)
    cy.get('#row-2 .price').type(products[1].price)
    cy.get('#row-2 .amount').should("have.value", products[1].unit*products[1].price);

    cy.get('#add-row').click()
    cy.get('#row-3').should('exist')
    cy.get('#row-3 .product').type(products[2].name)
    cy.get('#row-3 .unit').type(products[2].unit)
    cy.get('#row-3 .price').type(products[2].price)
    cy.get('#row-3 .amount').should("have.value", products[2].unit*products[2].price);
    cy.get('#total').should("have.value", total3rows);
  });

  it(" invoice with fourrows ", () => {
    cy.get('.product').type(products[0].name)
    cy.get('#unit').type(products[0].unit)
    cy.get('#price').type(products[0].price)
    cy.get('#amount').should("have.value", products[0].unit*products[0].price);

    cy.get('#add-row').click()
    cy.get('#row-2').should('exist')
    cy.get('#row-2 .product').type(products[1].name)
    cy.get('#row-2 .unit').type(products[1].unit)
    cy.get('#row-2 .price').type(products[1].price)
    cy.get('#row-2 .amount').should("have.value", products[1].unit*products[1].price);

    cy.get('#add-row').click()
    cy.get('#row-3').should('exist')
    cy.get('#row-3 .product').type(products[2].name)
    cy.get('#row-3 .unit').type(products[2].unit)
    cy.get('#row-3 .price').type(products[2].price)
    cy.get('#row-3 .amount').should("have.value", products[2].unit*products[2].price);
    cy.get('#total').should("have.value", total3rows);

    cy.get('#add-row').click()
    cy.get('#row-4').should('exist')
    cy.get('#row-4 .product').type(products[3].name)
    cy.get('#row-4 .unit').type(products[3].unit)
    cy.get('#row-4 .price').type(products[3].price)
    cy.get('#row-4 .amount').should("have.value", products[3].unit*products[3].price);
    cy.get('#total').should("have.value", total4rows);

  });
});

