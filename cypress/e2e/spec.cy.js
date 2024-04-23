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
    name:'ivi',
    unit:4.5,
    price:20,
   },

   {
    name:'sprite',
    unit:4.5,
    price:20,
   },

   {
    name:'fanta',
    unit:4.5,
    price:20,
   },

   {
    name:'cola',
    unit:4.5,
    price:20,
   },

   {
    name:'pencil',
    unit:4.5,
    price:20,
   },

   {
    name:'spageti',
    unit:4.5,
    price:20,
   },

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
   const total4rows = calculateTotal(products.slice(0, 4));
   const total3rows = calculateTotal(products.slice(0, 3));
   const total2rows = calculateTotal(products.slice(0, 2));
   const total10rows = calculateTotal(products.slice(0, 10));
   

  it(" fill default row", () => {
    cy.addRow(products[0].name,products[0].unit,products[0].price)
    cy.get('#amount').should("have.value", products[0].unit*products[0].price);
  });

  it(" add and fill a new row", () => {

    cy.fillRow(1,'bread',20,30)
   
    cy.get('#amount').should("have.value", 600);

    cy.get('#add-row').click()

    cy.get('#row-2').should('exist')

    cy.fillRow(2,'water',20,20)
    cy.get('#row-2 .amount').should("have.value", 400);
    cy.get('#total').should("have.value", 1000);
  });

  it(" remove row ", () => {
    cy.get('[style="text-align: right"] > .material-icons').click()
  });

  it(" invoice with tree rows ", () => {
   
    cy.addRow(products[0].name,products[0].unit,products[0].price)
    cy.get('#amount').should("have.value", products[0].unit*products[0].price);

    cy.get('#add-row').click()
    cy.get('#row-2').should('exist')
    cy.fillRow(2,products[1].name,products[1].unit,products[1].price)
    cy.get('#row-2 .amount').should("have.value", products[1].unit*products[1].price);

    cy.get('#add-row').click()
    cy.get('#row-3').should('exist')
    cy.fillRow(3,products[2].name,products[2].unit,products[2].price)
    cy.get('#row-3 .amount').should("have.value", products[2].unit*products[2].price);
    cy.get('#total').should("have.value", total3rows);
  });

  it(" invoice with four rows ", () => {
    cy.fillRow(1,products[0].name,products[0].unit,products[0].price)
    cy.get('#amount').should("have.value", products[0].unit*products[0].price);

    cy.get('#add-row').click()
    cy.get('#row-2').should('exist')
    cy.fillRow(2,products[1].name,products[1].unit,products[1].price)
    cy.get('#row-2 .amount').should("have.value", products[1].unit*products[1].price);

    cy.get('#add-row').click()
    cy.get('#row-3').should('exist')
    cy.fillRow(3,products[2].name,products[2].unit,products[2].price)
    cy.get('#row-3 .amount').should("have.value", products[2].unit*products[2].price);

    cy.get('#add-row').click()
    cy.get('#row-4').should('exist')
    cy.fillRow(4,products[3].name,products[3].unit,products[3].price)
    cy.get('#row-4 .amount').should("have.value", products[3].unit*products[3].price);
    cy.get('#total').should("have.value", total4rows);

  });

  it(" invoice with ten rows ", () => {
    cy.fillRow(1,products[0].name,products[0].unit,products[0].price)
    cy.get('#amount').should("have.value", products[0].unit*products[0].price);

    cy.get('#add-row').click()
    cy.get('#row-2').should('exist')
    cy.fillRow(2,products[1].name,products[1].unit,products[1].price)
    cy.get('#row-2 .amount').should("have.value", products[1].unit*products[1].price);

    cy.get('#add-row').click()
    cy.get('#row-3').should('exist')
    cy.fillRow(3,products[2].name,products[2].unit,products[2].price)
    cy.get('#row-3 .amount').should("have.value", products[2].unit*products[2].price);
    cy.get('#total').should("have.value", total3rows);

    cy.get('#add-row').click()
    cy.get('#row-4').should('exist')
    cy.fillRow(4,products[3].name,products[3].unit,products[3].price)
    cy.get('#row-4 .amount').should("have.value", products[3].unit*products[3].price);

    cy.get('#add-row').click()
    cy.get('#row-5').should('exist')
    cy.fillRow(5,products[4].name,products[4].unit,products[4].price)
    cy.get('#row-5 .amount').should("have.value", products[4].unit*products[4].price);

    cy.get('#add-row').click()
    cy.get('#row-6').should('exist')
    cy.fillRow(6,products[5].name,products[5].unit,products[5].price)
    cy.get('#row-6 .amount').should("have.value", products[5].unit*products[5].price);

    cy.get('#add-row').click()
    cy.get('#row-7').should('exist')
    cy.fillRow(7,products[6].name,products[6].unit,products[6].price)
    cy.get('#row-7 .amount').should("have.value", products[6].unit*products[6].price);

    cy.get('#add-row').click()
    cy.get('#row-8').should('exist')
    cy.fillRow(8,products[7].name,products[7].unit,products[7].price)
    cy.get('#row-8 .amount').should("have.value", products[7].unit*products[7].price);

    cy.get('#add-row').click()
    cy.get('#row-9').should('exist')
    cy.fillRow(9,products[8].name,products[8].unit,products[8].price)
    cy.get('#row-9 .amount').should("have.value", products[8].unit*products[8].price);
   
    cy.get('#add-row').click()
    cy.get('#row-10').should('exist')
    cy.fillRow(10,products[9].name,products[9].unit,products[9].price)
    cy.get('#row-10 .amount').should("have.value", products[9].unit*products[9].price);
    cy.get('#total').should("have.value", total10rows);

  });
});

// to do:add a test where u add in invoice 10 rows. using command fillrow