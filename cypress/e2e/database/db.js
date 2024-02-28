
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps'
Given("Connect to db",()=>{
    cy.task(
        "queryDb",
        `SELECT * FROM payments`
      ).then(count => {
        // expect(count).to.have.lengthOf(1);
      });


})