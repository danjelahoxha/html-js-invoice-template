// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
 Cypress.Commands.add('addRow', (name, unit, price) => { 
    cy.get('#row-1 .product').type(name)
    cy.get('#row-1 .unit').type(unit)
    cy.get('#row-1 .price').type(price)
  })

  Cypress.Commands.add('addRow2', (name, unit, price) => { 
    cy.get('#row-2 .product').type(name)
    cy.get('#row-2 .unit').type(unit)
    cy.get('#row-2 .price').type(price)
  })

  Cypress.Commands.add('addRow3', (name, unit, price) => { 
    cy.get('#row-3 .product').type(name)
    cy.get('#row-3 .unit').type(unit)
    cy.get('#row-3 .price').type(price)
  })

  Cypress.Commands.add('addRow4', (name, unit, price) => { 
    cy.get('#row-4 .product').type(name)
    cy.get('#row-4 .unit').type(unit)
    cy.get('#row-4 .price').type(price)
  })


  Cypress.Commands.add('fillRow', (id , name, unit, price) => { 
    cy.get('#row-'+ id + ' .product').type(name)
    cy.get('#row-'+ id + ' .unit').type(unit)
    cy.get('#row-'+ id + ' .price').type(price)
  })







//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })